## ADDED Requirements

### Requirement: Create payout run with immutable cutoff time
The system SHALL allow an Accounts Executive to create a payout run that evaluates ledger balances as of a specific cutoff time, and the cutoff time MUST be immutable once evaluation begins.

#### Scenario: Create payout run
- **WHEN** an Accounts Executive triggers a payout run and provides a cutoff time
- **THEN** the system SHALL create a new payout run record with that cutoff time
- **AND** the system SHALL record who triggered the run and when

#### Scenario: Cutoff time cannot be changed after evaluation
- **WHEN** a payout run has entered the evaluating or evaluated state
- **THEN** the system SHALL NOT allow the cutoff time for that run to be modified

### Requirement: Generate one payout per eligible institute
The system SHALL evaluate the shared ledger at the payout run cutoff time and generate exactly one payout per eligible institute based on cleared balances, excluding institutes on hold.

#### Scenario: Generate payouts for eligible institutes
- **WHEN** a payout run is evaluated
- **AND** institutes have positive cleared ledger balances as of the cutoff time
- **AND** institutes are not on payout hold
- **THEN** the system SHALL generate exactly one payout per such institute in the calculated state

#### Scenario: No payouts when no cleared balances
- **WHEN** a payout run is evaluated
- AND no institute has a positive cleared ledger balance as of the cutoff time
- **THEN** the system SHALL complete evaluation and record that the run has zero payouts

### Requirement: Respect institute-level payout holds
The system MUST treat institute-level payout holds as a blocking condition when generating or executing payouts for a run.

#### Scenario: Exclude institutes on hold
- **WHEN** a payout run is evaluated
- **AND** an institute has an active payout hold
- **THEN** the system SHALL NOT generate a payout for that institute
- **AND** the run summary SHALL indicate that the institute was excluded due to a hold

### Requirement: Payout run lifecycle and approval
The system SHALL maintain a deterministic lifecycle for payout runs and require explicit approval before any payout in the run can be executed.

#### Scenario: Payout run state transitions
- **WHEN** a payout run is created
- **THEN** it SHALL start in a draft or evaluating state
- **AND** after evaluation it SHALL transition to evaluated
- **AND** if approval is required it SHALL enter an awaiting_approval state until an Approver/Director approves or rejects it
- **AND** once approved and execution starts it SHALL enter an executing state
- **AND** when all payouts in the run reach terminal states (paid, failed, or permanently blocked) it SHALL transition to completed

#### Scenario: Approval required before execution
- **WHEN** a payout run requires approval
- **AND** the run has not yet been approved
- **THEN** the system SHALL prevent execution of any payouts belonging to that run

### Requirement: New payout run creation constraints
The system SHALL allow creation of new payout runs without blocking on older runs, as long as older runs have progressed beyond the initial evaluation states.

#### Scenario: New payout run allowed when older runs are past evaluation
- **WHEN** an Accounts Executive attempts to create a new payout run
- **AND** all existing payout runs (if any) are in one of the following states: evaluated, awaiting_approval, approved, executing, completed, rejected, or failed
- **THEN** the system SHALL allow the new payout run to be created

#### Scenario: New payout run blocked while an existing run is in draft or evaluating
- **WHEN** an Accounts Executive attempts to create a new payout run
- **AND** at least one existing payout run is in draft or evaluating state
- **THEN** the system SHALL prevent the new payout run from being created
- **AND** the system SHALL surface a clear error indicating that draft/evaluating runs must be resolved before a new run can be started

