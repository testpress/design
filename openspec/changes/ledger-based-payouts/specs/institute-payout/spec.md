## ADDED Requirements

### Requirement: One payout per institute per run
The system SHALL create at most one payout per institute for a given payout run, and each payout SHALL belong to exactly one payout run and one institute.

#### Scenario: Create single institute payout per run
- **WHEN** a payout run is evaluated
- **AND** an institute has a positive cleared ledger balance
- **THEN** the system SHALL create exactly one payout record for that institute, associated with the payout run

### Requirement: Payout amount derived from ledger only
The system MUST derive the payout amount for an institute payout exclusively from the institute’s cleared ledger balance as of the payout run cutoff time.

#### Scenario: Compute payout amount from cleared ledger entries
- **WHEN** an institute payout is generated for a payout run
- **THEN** the system SHALL compute the payout amount by summing the institute’s cleared ledger entries as of the run cutoff time
- **AND** the system SHALL NOT use order-level totals, spreadsheets, or manual adjustments outside the ledger to determine the amount

### Requirement: Institute payout lifecycle
The system SHALL maintain a clear lifecycle for each institute payout with states at least: calculated, processing, paid, and failed.

#### Scenario: Initial calculated state
- **WHEN** an institute payout is created by evaluating a payout run
- **THEN** the payout SHALL start in the calculated state

#### Scenario: Transition to processing on execution
- **WHEN** an eligible and approved institute payout is submitted for execution
- **THEN** the payout SHALL transition to the processing state

#### Scenario: Transition to paid on successful completion
- **WHEN** the banking provider confirms that the payout has been successfully completed
- **THEN** the payout SHALL transition to the paid state

#### Scenario: Transition to failed on error
- **WHEN** the banking provider returns a failure for a payout or the system determines the payout cannot be completed
- **THEN** the payout SHALL transition to the failed state
- **AND** the system SHALL record a human-readable failure reason

### Requirement: Respect institute-level holds at execution time
The system MUST prevent execution of an institute payout while the institute is on payout hold.

#### Scenario: Block execution when institute is on hold
- **WHEN** a user attempts to execute an institute payout
- **AND** the associated institute has an active payout hold
- **THEN** the system SHALL prevent the payout from being executed
- **AND** SHALL display or log a clear reason indicating that the institute is on hold

### Requirement: Ledger-backed payout breakdown
The system SHALL provide a ledger-backed breakdown for each institute payout so that users can understand why the payout amount is correct.

#### Scenario: View ledger-backed payout details
- **WHEN** a user views an institute payout detail screen
- **THEN** the system SHALL show the time window covered, payout amount, current state, and a ledger entry breakdown grouped by type (for example, gross payments, fees, taxes, adjustments)

