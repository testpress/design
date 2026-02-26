## 1. Shared ledger and payout models

- [ ] 1.1 Create the shared `apps.ledger_payouts` app and add it to `SHARED_APPS` so ledger and payout data are cross-tenant and visible to staff.
- [ ] 1.2 Implement the `LedgerEntry` model to persist all money movements (payments, fees, taxes, institute liability, payouts, adjustments) as an append-only, auditable ledger.
- [ ] 1.3 Implement the `PayoutRun` and `InstitutePayout` models (including `payment_gateway` choice, `idempotency_key`, `gateway_payout_id`, `gateway_status`) so payout batches and institute payouts are explicit executable units, one per institute per run.
- [ ] 1.4 Create and apply migrations for the new shared app, ensuring changes apply only to the shared schema and do not modify existing tenant apps.
- [ ] 1.5 Add basic admin or query tooling for `LedgerEntry`, `PayoutRun`, and `InstitutePayout` so ops can inspect ledger and payout records during rollout.

## 2. Ledger write path

- [ ] 2.1 Wire ledger writes on successful payments so each new completed order creates `LedgerEntry` records for gross amount, platform share, and institute liability, making liability fully derived from the ledger instead of orders.
- [ ] 2.2 Wire ledger writes on payout settlement so paying an institute creates `LedgerEntry` records that reduce institute liability and record cash outflow.
- [ ] 2.3 Add tests for ledger write path to prove institute liability equals (payments − fees/taxes − payouts) for representative scenarios.

## 3. PayoutRun evaluation and holds

- [ ] 3.1 Implement a service to evaluate a `PayoutRun` at a cutoff time, computing cleared balances from `LedgerEntry` and creating one `InstitutePayout` per eligible institute based only on ledger data.
- [ ] 3.2 Implement institute-level payout holds (flag + reason) and enforce them in run evaluation so held institutes are excluded and the run summary clearly explains why.
- [ ] 3.3 Add tests for payout run evaluation and hold behavior to confirm one payout per eligible institute and no payouts created for held institutes or institutes with zero balance.

## 4. Payment gateway integration and payout execution

- [ ] 4.1 Implement a payment gateway payout adapter (e.g. Razorpay) that uses the `InstitutePayout.payment_gateway` and `InstitutePayout.idempotency_key` for all calls so retries never result in duplicate bank transfers.
- [ ] 4.2 Implement an execute-payout service that moves an `InstitutePayout` from CALCULATED → PROCESSING → PAID/FAILED, writes payout settlement `LedgerEntry` records, and records gateway identifiers (`gateway_payout_id`, `gateway_status`) and failure reasons.
- [ ] 4.3 Implement gateway webhooks (and optional polling) to update payout status asynchronously, handling successful, failed, and ambiguous outcomes safely.
- [ ] 4.4 Add tests for idempotent payout execution and gateway error handling to ensure stuck or retried payouts do not create duplicate transfers.

## 5. Staff/admin UI and permissions

- [ ] 5.1 Implement staff views or APIs for listing and viewing `PayoutRun` records (with cutoff, state, totals, and counts) and for triggering new runs, so Accounts Executives can initiate and review payout batches.
- [ ] 5.2 Implement staff views or APIs for listing and viewing `InstitutePayout` records (with ledger-backed breakdown and execution timeline) and for executing eligible payouts and viewing failures.
- [ ] 5.3 Define and assign new Django permissions for Accounts Executive (trigger/evaluate runs, execute payouts) and Approver/Director (approve runs, manage holds) so timing and authorization are clearly separated.
- [ ] 5.4 Add basic permission and smoke tests for the staff/admin endpoints to verify that only users with the correct roles can trigger runs, approve runs, and execute payouts.

