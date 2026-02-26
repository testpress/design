## Context

Current payouts are implemented as a tenant app (`apps.payouts`) with a single `Payout` model and staff flows under `apps.staff`:

- Staff pick a date range and call `AsyncCreatePayout` (Celery) which:
  - Filters completed `Order`s for an institute and period
  - Computes totals from order-level helpers (`total_without_processing_fees`, `testpress_share`)
  - Creates a `Payout` with `total_sales_amount`, `testpress_share`, `paidout_amount`
  - Attaches orders via `Order.payouts` M2M
- Staff can manually add/remove orders from a payout and export Excel / send payout emails.

This has several problems:

- No immutable, append-only ledger; payout amounts cannot be traced back to a stable source of truth.
- Payouts are order-selection driven and rely on ops judgement (which orders to include/exclude).
- There is no explicit approval workflow; payouts are effectively “approved” by whoever runs the Excel/email flow.
- There is no integration with bank/payout APIs; money movement happens outside the system.
- There is no explicit payout run concept or lifecycle; re-runs and partial updates are ad-hoc.

The new design introduces:

- A shared ledger app recording financial events, including institute liability and payout settlement.
- A shared `PayoutRun` model spanning institutes that use the Testpress payment gateway and a shared `InstitutePayout` model that is one per such institute per run.
- A payment gateway payout integration to execute payouts asynchronously and idempotently (provider identified by a choice field; e.g. Razorpay, PayU).
- Clear lifecycles for payout runs and payouts, with an explicit approval step and institute-level holds.

## Goals / Non-Goals

**Goals:**

- Introduce an append-only shared ledger as the single source of truth for institute liability and payouts.
- Move from order-selection payouts to ledger-derived payouts (amounts come only from cleared ledger balances).
- Model payout runs and payouts explicitly with deterministic lifecycles and mandatory approval.
- Execute payouts via a payment gateway (e.g. Razorpay, PayU) in an async, idempotent, and auditable way.
- Preserve the existing `apps.payouts` code as legacy but make the new flow the only supported path for payouts.

**Non-Goals (v1):**

- Implementing scheduled/automatic payout runs (manual trigger only).
- Implementing per-ledger-entry holds or disputes (only institute-level hold).
- Implementing reconciliation jobs or UI (only data structures to support it later).
- Migrating or deleting existing `apps.payouts` data and views (a later cleanup change may remove the app entirely once migration is complete).
- Designing complex manual-adjustment flows beyond minimal Approver-approved adjustments.
- Cross-currency aggregation or payouts (single-currency per institute in v1).

## Decisions

### 1. New shared app for ledger and payouts

- Create a new shared app (e.g. `apps.ledger_payouts`) added to `SHARED_APPS`.
- Define the following core models in the shared app:
  - `LedgerEntry` – append-only records of financial events (payment, fee, tax, institute liability, payout settlement, adjustments).
  - `PayoutRun` – platform-level payout evaluation event with cutoff time and lifecycle fields.
  - `InstitutePayout` – one per institute per run; references `PayoutRun` and `institutes.Institute`; stores amount, state, payment gateway id, gateway payout references, and audit data.
 - The new flow SHALL NOT depend on or re-use the existing tenant `apps.payouts.Payout` model. That app is treated as legacy and may be removed in a later cleanup once all payout-eligible institutes (using the Testpress payment gateway) have migrated fully to the new flow.

**Rationale:** Shared ledger and payout models are cross-tenant by design; they need to be visible to staff and not tied to individual tenant schemas. Introducing a new `InstitutePayout` model in a shared app avoids coupling with the legacy `apps.payouts` implementation and makes it safe to delete the old app entirely once migration is complete.

**Alternatives considered:**

- Extending the existing tenant `apps.payouts` app with new fields and behaviors. Rejected because payouts must be evaluated across institutes and need a shared, system-wide ledger; combining both responsibilities in the old app would increase coupling and migration risk.

### 2. LedgerEntry model design and write path

- `LedgerEntry` shape (high level):
  - `id`
  - `institute` (FK to `institutes.Institute`, nullable for platform-only events)
  - `entry_type` (enum, e.g. GROSS_PAYMENT (credit), PLATFORM_FEE (debit), TAX (debit), ADJUSTMENT ("Adjustment (+/-), PAYOUT_SETTLEMENT (debit), etc.)
  - `amount` (signed `Decimal`; sign convention documented per type)
  - `currency`
  - `occurred_at` (when event happened)
  - `recorded_at` (when entry was written)
  - `order_id` (nullable integer or string; identifier of the originating order in tenant schemas, without a cross-schema FK)
  - `institute_payout` (nullable FK to `InstitutePayout` when the entry represents payout settlement)
  - `external_reference` (string; e.g. gateway payout id, bank reference number, or gateway transaction id)
  - `metadata` (JSON for gateway-specific fields, bank refs, etc.)
- Ledger writes:
  - On successful order/payment completion:
    - Write entries covering gross amount, platform share (fees/taxes), and institute liability.
    - Ensure this is idempotent (e.g. keyed by payment ID).
  - On payout settlement:
    - Write entries reducing institute liability and recording cash outflow, keyed by `InstitutePayout` and gateway payout id.
  - On refunds/chargebacks:
    - Write compensating entries reversing affected liabilities and platform share where appropriate.

**Rationale:** Centralizes money movement in one place, supports append-only corrections, and gives a stable basis for cleared-balance computation.

**Alternatives considered:**

- Keeping institute liability as derived data from `Order` at query time. Rejected because this prevents a stable historical view, makes corrections hard to reason about, and is at odds with the append-only ledger requirement.

### 3. Cleared balance definition 

- Cleared balance for an institute at time T is computed as:
  - Sum of relevant `LedgerEntry` amounts with:
    - Entries that exist in the ledger (i.e. have been written on successful payment, payout settlement, or adjustment)
    - No active institute-level payout hold at T
    - Not explicitly excluded by future per-entry holds (only institute-level in v1).
- There is no separate time-based settlement window in v1; a successful payment becomes part of the cleared balance as soon as its ledger entry is written. Refunds, chargebacks, and other corrections are modeled as additional ledger entries that adjust the balance in subsequent runs.

**Rationale:** Keeps the first version simple and easier to reason about: payouts always operate on “what the ledger currently says”, and later reversals are handled via compensating entries. In other words, v1 behaves as if a settlement delay parameter N is set to 0. If we discover operational need for a delay (N > 0), we can extend this design by adding a configurable settlement window without changing core data structures.

**Alternatives considered:**

- Adding a configurable `LEDGER_SETTLEMENT_DELAY_DAYS` (N) from the start. Postponed for now to reduce complexity and avoid premature policy decisions; the ledger structure remains compatible with adding such a delay later.

### 4. PayoutRun model and lifecycle

- `PayoutRun` fields (high level):
  - `id`
  - `cutoff_at` (datetime)
  - `state` (enum: DRAFT, EVALUATING, EVALUATED, AWAITING_APPROVAL, APPROVED, EXECUTING, COMPLETED, REJECTED, FAILED)
  - `triggered_by` (FK to staff `User`)
  - `triggered_at`
  - `approved_by`, `approved_at`, `rejected_by`, `rejected_at`, `rejection_reason`
  - Summary fields (e.g. total payable amount, counts of payouts by status)
  - Audit metadata (e.g. run label, notes)
- Lifecycle:
  - Creation by Accounts Executive → DRAFT (or EVALUATING if evaluation starts immediately).
  - Evaluation job computes payouts and transitions to EVALUATED.
  - If approval required (v1: always), transition to AWAITING_APPROVAL, then APPROVED/REJECTED via Approver actions.
  - On first payout execution, transition to EXECUTING.
  - When all associated payouts are in terminal states, transition to COMPLETED.
  - FAILED is used for system-level errors before payouts are generated.
- Run creation constraints:
  - A new payout run MAY be created when all existing runs have progressed beyond DRAFT and EVALUATING (i.e. they are in one of: EVALUATED, AWAITING_APPROVAL, APPROVED, EXECUTING, COMPLETED, REJECTED, FAILED).
  - A new payout run MUST NOT be created while any existing run is in DRAFT or EVALUATING; only these two states block new run creation.
- Run creation lives in shared context (not per-tenant); run evaluation code iterates institutes and uses `LedgerEntry` to compute payouts.

**Rationale:** Encapsulates each evaluation event, clearly separates “what is due” from “what has been executed”, and provides a stable artifact for approvals and audits.

**Alternatives considered:**

- Only storing per-institute payouts without a run-level entity. Rejected because it makes approvals, reporting, and archiving of “a payout batch” much harder.

### 5. Payout model and lifecycle

- New shared `InstitutePayout` model in the ledger/payouts app, distinct from `apps.payouts.Payout`:
  - `id`
  - `payout_run` (FK to `PayoutRun`)
  - `institute` (FK to `institutes.Institute`)
  - `amount` (Decimal)
  - `currency`
  - `payment_gateway` (positive integer choice field; e.g. 1=Razorpay, 2=PayU, 3=Stripe; identifies which payout provider is used for this payout)
  - `idempotency_key` (string; unique per InstitutePayout; used for gateway idempotent execution)
  - `state` (enum: CALCULATED, PROCESSING, PAID, FAILED)
  - `gateway_payout_id` (string; provider’s payout identifier), `gateway_status` (string; provider’s status), `bank_reference` (string; bank reference number when paid)
  - `time_window_start`, `time_window_end` (optional, derived from ledger range)
  - `failure_reason`
  - `created_at`, `updated_at`
- Business rules:
  - One payout per institute per run; enforced by a unique constraint on `(payout_run, institute)`.
  - Payout amounts come exclusively from cleared ledger balances.
  - Institute-level holds are checked both at run evaluation and before execution.
  - Each ledger entry may contribute to at most one payout; once consumed by an `InstitutePayout` in a given run, it MUST NOT be included again in any future payout run.

**Rationale:** Separating run and per-institute payout entities matches the specs and keeps responsibilities clear: PayoutRun = evaluation event; InstitutePayout = executable unit of money movement.

### 6. Payment gateway payout integration and idempotency

- Use a **payment gateway** choice (e.g. positive integer: 1=Razorpay, 2=PayU, 3=Stripe) on `InstitutePayout`; do not hardcode a single provider in the model. Store provider-specific identifiers in `gateway_payout_id` and `gateway_status`.
- Introduce gateway-specific clients/adapters in a shared module (e.g. `apps.ledger_payouts.integrations`), one per supported provider (e.g. Razorpay, PayU), not in views.
- For each `InstitutePayout` execution:
  - Resolve the adapter from `InstitutePayout.payment_gateway`.
  - Use the stored `idempotency_key` on the InstitutePayout for gateway idempotent execution (reuse for all retries).
  - Call the gateway’s payout API with amount, currency, beneficiary bank details from `Institute`, and internal references.
  - Store `gateway_payout_id` and `gateway_status` and mark state as PROCESSING.
- Status updates:
  - Prefer webhooks from the gateway when available; provide a webhook endpoint per gateway that:
    - Verifies signature
    - Looks up `InstitutePayout` by gateway id or metadata
    - Transitions state to PAID or FAILED and records `gateway_status`, `bank_reference`, and failure reason
    - Writes corresponding ledger settlement entries when moving to PAID.
  - For fallback or reconciliation, add polling for outstanding PROCESSING payouts and update states from the gateway.

**Rationale:** Keeps provider-agnostic models; gateway-specific logic is isolated in adapters; supports idempotent retries and multiple providers (e.g. Razorpay in v1, PayU later).

**Alternatives considered:**

- Hardcoding a single provider (e.g. Razorpay) in the model. Rejected so the design supports multiple payout gateways without schema changes.
- Embedding gateway calls directly in views. Rejected due to testability and coupling.
- Synchronous-only model (no PROCESSING state). Rejected because payouts are inherently async at provider level; we need to handle delays and retries.

### 7. Staff/admin UI and permissions

- New staff views (likely in a shared/admin app or `apps.staff`) for:
  - Listing payout runs, viewing summaries, triggering new runs, viewing approval status.
  - Viewing institute payouts per run, with detail screens including ledger breakdown and execution history.
  - Approving/rejecting runs (Approver/Director only).
  - Executing eligible payouts and viewing failures.
- Use existing `permission_required` pattern with new Django permissions, for example:
  - `ledger_payouts.view_payoutrun`, `ledger_payouts.add_payoutrun`, `ledger_payouts.approve_payoutrun`
  - `ledger_payouts.view_payout`, `ledger_payouts.execute_payout`
- Map:
  - Accounts Executive group → trigger runs, view runs/payouts, execute payouts, investigate failures.
  - Approver/Director group → approve/reject runs and manage holds.

**Rationale:** Reuses familiar patterns and keeps role enforcement consistent with the rest of the admin tooling.

### 8. Backward compatibility with existing payouts

- Leave `apps.payouts` and related staff views intact but mark them as deprecated in documentation and internal usage.
- Do not run `AsyncCreatePayout` for institutes once the new system is rolled out; instead route ops to the new Payout Run flow.
- If needed, provide read-only access to old payouts for historical reference.

**Rationale:** Avoids data migrations and breakage while we roll out the new system. Gives ops time to switch over without losing access to historical payouts.

## Risks / Trade-offs

- **[Risk] Increased complexity vs current simple flow**  
  The new system introduces multiple models (ledger entries, runs, payouts) and async gateway handling.  
  → **Mitigation:** Keep models small and focused; centralize gateway logic in adapters; write thorough tests around state transitions.

- **[Risk] Gateway or network failures**  
  Payouts may get stuck in PROCESSING or fail intermittently.  
  → **Mitigation:** Implement robust retry logic with idempotency keys; use webhooks and polling; surface stuck payouts in a “needs attention” view.

- **[Risk] Double-execution of payouts**  
  Bugs in state checks or retries could attempt to execute an already paid payout.  
  → **Mitigation:** Enforce state checks at the model/service layer; rely on gateway idempotency keys; add unique constraints and defensive checks to block re-execution of PAID payouts.

- **[Risk] Partial rollout confusion**  
  Ops might accidentally use old and new flows in parallel.  
  → **Mitigation:** Clearly mark old payouts UI as deprecated; adjust staff training; restrict permissions to discourage use of old flow once new flow is live.

## Migration Plan

1. **Introduce shared app and models:**
   - Add the ledger/payouts shared app to `SHARED_APPS`.
   - Create migrations for `LedgerEntry`, `PayoutRun`, `InstitutePayout`.
2. **Wire ledger writes (forward-only):**
   - From cutover onward, add signals or explicit calls from order/payment completion paths to write ledger entries for new successful payments.
   - Do not backfill per-order ledger entries for historical payments prior to cutover.
   - Optionally, create a single opening-balance LedgerEntry per institute at cutover if operationally needed.
   - Add ledger writes on payout settlement once gateway integration is ready.
3. **Implement payment gateway adapter(s) and payout execution services:**
   - Implement adapter(s) per supported provider (e.g. Razorpay), webhook endpoint(s), and polling path.
   - Implement services that transition payout states and write settlement entries.
4. **Build staff/admin UI:**
   - Add views and templates for payout runs and payouts.
   - Add permissions and group mappings for Accounts Executive and Approver.
5. **Roll out new flow behind permissions:**
   - Enable new payout run UI for pilot staff group.
   - Keep old `apps.payouts` UI available but mark it as deprecated internally.
6. **Enable ledger-derived payouts:**
   - Start generating payout runs and payouts via the new flow for selected institutes.
   - Validate amounts against current manual process during trial period.
7. **Deprecate old flow operationally:**
   - Update internal runbooks to use only the new system for new payouts.
   - Optionally remove or hide old payout creation endpoints in staff UI (in a later change).

