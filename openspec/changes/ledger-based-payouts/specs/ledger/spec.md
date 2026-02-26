## ADDED Requirements

### Requirement: Ledger records all monetary obligations and movements
The system SHALL record all monetary obligations and movements relevant to institute payouts as immutable ledger entries in a shared ledger app.

#### Scenario: Record successful payment
- **WHEN** a customer payment for an order is successfully completed
- **THEN** the system SHALL create ledger entries representing gross amount, platform fees/taxes, and institute liability for that order

#### Scenario: Record payout settlement
- **WHEN** an institute payout is marked as paid
- **THEN** the system SHALL create ledger entries that reduce the institute’s liability by the payout amount and record the corresponding cash outflow

### Requirement: Ledger is append-only and immutable
The system MUST treat ledger entries as append-only: entries SHALL NOT be edited or deleted once written. Corrections MUST be modeled as compensating entries.

#### Scenario: Correction via compensating entry
- **WHEN** an error is discovered in a previously written ledger entry
- **THEN** the system SHALL NOT modify the original entry
- **AND** the system SHALL create a compensating ledger entry that reverses the incorrect amount and, if needed, a new entry with the corrected amount

### Requirement: Cleared ledger balance definition
The system SHALL define a cleared ledger balance for each institute as the sum of all eligible credit and debit ledger entries that have been written to the ledger and are not blocked by active holds or disputes. There is no separate time-based settlement delay in v1; a payment becomes part of the cleared balance once its ledger entry exists, and refunds or reversals are represented as additional ledger entries that adjust the balance. Conceptually, this is equivalent to running with a settlement delay parameter N = 0, and future versions MAY introduce N > 0 without changing the ledger model.

#### Scenario: Payment entry is immediately part of cleared balance
- **WHEN** a successful payment ledger entry is written for an institute
- **AND** there is no active hold or dispute affecting that institute
- **THEN** the system SHALL treat that entry as part of the cleared balance for payout calculation

#### Scenario: Hold prevents inclusion in cleared balance
- **WHEN** a hold is placed on an institute
- **THEN** the system SHALL NOT include ledger entries affected by the hold in the cleared balance while the hold is active

### Requirement: Institute liability is derived solely from ledger
The system MUST derive institute payout eligibility and amounts exclusively from the ledger, not from Orders or other derived views.

#### Scenario: Compute institute liability from ledger
- **WHEN** the system needs to compute an institute’s payout amount for a payout run
- **THEN** the system SHALL sum the institute’s cleared ledger entries (credits and debits) as of the payout run cutoff time
- **AND** the system SHALL NOT use order-level calculations or manual adjustments outside the ledger

### Requirement: Ledger traceability for payouts
The system SHALL provide ledger traceability for each institute payout, showing the set of ledger entries that justify the payout amount.

#### Scenario: View payout ledger breakdown
- **WHEN** a user views an institute payout detail page
- **THEN** the system SHALL display a breakdown of the ledger entries that contributed to the payout amount, grouped by type (e.g., gross payments, fees, taxes, adjustments)

### Requirement: Ledger entries are consumed at most once for payouts
The system SHALL ensure that each ledger entry may contribute to at most one payout. Once a ledger entry has been consumed by a payout, it MUST NOT be included again in any future payout run.

#### Scenario: Exclude previously consumed ledger entries from new payout runs
- **WHEN** a payout run is evaluated to compute payouts
- **THEN** the system SHALL consider only cleared ledger entries that have not previously been consumed by any payout
- **AND** the system SHALL exclude all ledger entries that are already linked to an existing payout

#### Scenario: Mark ledger entries as consumed when a payout is executed
- **WHEN** an institute payout is successfully executed (i.e., marked as paid)
- **THEN** the system SHALL persist an association between the payout and the underlying ledger entries it consumed
- **AND** the system SHALL ensure those entries are treated as ineligible for any future payout runs

### Requirement: Currency-aware ledger (single-currency payouts in v1)
Ledger entries SHALL record currency explicitly. Cross-currency aggregation or payouts are out of scope for v1; all payout calculations for an institute SHALL operate within a single currency.

### Requirement: Ledger start and scope
The ledger SHALL be authoritative only for financial events occurring after the payout-ledger feature cutover. Historical orders and payments before cutover are not represented as individual ledger entries. Optionally, an opening-balance LedgerEntry per institute MAY be created at cutover to reflect pre-existing balances.

