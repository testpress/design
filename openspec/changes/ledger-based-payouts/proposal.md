# Proposal: Ledger-based automated payouts

## Why

The current payout process is manual and order-based: staff pick date ranges, the system sums selected orders per institute, and amounts are recalculated when orders are added or removed. There is no immutable record of why an amount is correct, no approval step, and no integration with banking—payouts are executed outside the system. This creates tribal knowledge, risk of error, and no provable correctness. This change introduces a ledger-first, automated payout system so that institute liabilities are derived only from an immutable ledger, payout runs are approved before execution, and payouts are executed once and idempotently via a payment gateway (e.g. Razorpay, PayU) with full auditability.

## What Changes

- **New shared app (ledger):** Append-only, immutable ledger models. Entries record payments, fees, taxes, and institute liability. No edits or deletes.
- **Write path:** On order/payment completion, ledger entries are created (gross, platform share, institute share). Payout amounts are calculated only from **cleared** ledger balances: successful payment ledger entries that exist in the ledger and have no active holds or disputes, with refunds/reversals recorded as separate ledger entries that reduce institute liability in later runs.
- **Payout Run (shared):** Platform-level entity. Accounts Executive triggers a run at a cutoff time; system evaluates the ledger for institutes that use the Testpress payment gateway and generates one InstitutePayout per eligible institute. Run lifecycle: draft → evaluating → evaluated → awaiting_approval → approved → executing → completed (or rejected/failed).
- **InstitutePayout (shared):** One per payout-eligible institute (using the Testpress payment gateway) per run; amount from ledger only; lifecycle: calculated → processing → paid/failed. Payment gateway choice field and idempotency key for gateway; async execution (submit → processing → poll/webhook → paid/failed).
- **Approval:** Every payout run requires explicit approval before any payout in that run can be executed (v1: always, no thresholds).
- **Holds (v1):** Institute-level payout hold flag only; blocks all payouts for that institute. Per-ledger-entry holds later.
- **Roles:** Accounts Executive (trigger run, view, execute approved payouts, retry, investigate) and Approver/Director (approve/reject runs, manage holds, approve manual adjustments) mapped to Django permissions; no new role model.
- **Bank:** Payment gateway payouts (e.g. Razorpay Payouts, PayU) with real transactions. Institute bank details from current `Institute` fields; no versioning per payout in v1.
- **Reconciliation:** Ledger, payout states, and bank references are structured so reconciliation can be added later; no reconciliation jobs or UI in v1.
- **Trigger:** Manual only in v1; run-creation path is designed so a scheduler can call it later.
- **Old payout flow:** Not removed in code; new system is the only supported flow. Old staff payout screens (date range, add/remove orders, Excel, email) are deprecated in behavior; legacy code remains until explicitly retired.

**BREAKING (product):** The correct way to create and execute payouts becomes the new ledger + run + payout flow only.

## Capabilities

### New Capabilities

- `ledger`: Immutable ledger as source of truth; write path from payments; cleared balance definition (T+N, no holds).
- `payout-run`: Time-based evaluation at cutoff; one run per trigger; states and transitions; approval required before execution.
- `institute-payout`: One payout per institute per run; amount from ledger; states (calculated, processing, paid, failed); institute-level hold; ledger traceability view.
- `payout-execution`: Idempotent execution via payment gateway (provider chosen by gateway id); async flow; shared idempotency key; bank confirmation to mark paid.

### Modified Capabilities

- (None; no existing specs in `openspec/specs/`.)

## Impact

- **Scope (SHARED_APPS vs TENANT_APPS):** This change adds **shared** data only: ledger and payout run/InstitutePayout models live in a new shared app. Institutes (tenants) see only their own payouts (filtered by institute); staff operate at platform level. No new tenant-scoped payout models; existing `apps.payouts` remains in TENANT_APPS but is deprecated for use.
- **Data:** New shared app for ledger and payout run/InstitutePayout. Affects `apps.payouts` only indirectly (existing model/views remain; new flow lives alongside until legacy removal). `apps.orders` / `apps.payments`: signals or post-save path to write ledger entries on completion.
- **APIs/UI:** New staff/admin UI for payout runs (list, create, detail, approve/reject) and institute payouts (list per run, detail, execute, retry). Payment gateway payout integration (new client/adapter per provider, e.g. Razorpay).
- **Permissions:** New Django permissions for run trigger, run approve, payout execute, hold management, etc., assigned to staff groups.
- **Dependencies:** Payment gateway for payouts (e.g. Razorpay, PayU); existing stack unchanged otherwise.

## Non-goals (v1)

- Automated/scheduled payout runs (manual trigger only).
- Per-ledger-entry holds or disputes (institute-level hold only).
- Reconciliation jobs or reconciliation UI.
- Changing or removing existing payout code (add new only).
- Manual adjustment workflows beyond Approver-approved with justification (can be minimal in v1).
