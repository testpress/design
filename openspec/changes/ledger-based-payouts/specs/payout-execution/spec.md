## ADDED Requirements

### Requirement: Execute payouts via payment gateway
The system SHALL execute institute payouts via the payment gateway identified by the InstitutePayout `payment_gateway` field, using the institute’s configured bank account details.

#### Scenario: Submit payout to gateway
- **WHEN** an eligible, approved institute payout is executed
- **THEN** the system SHALL call the chosen gateway's payout API with the payout amount, institute bank details, and the `idempotency_key` stored on the InstitutePayout

### Requirement: Idempotent payout execution
The system MUST ensure that payout execution is idempotent so that retries do not result in duplicate transfers.

#### Scenario: Retry payout with the same idempotency key
- **WHEN** a payout execution is retried due to a timeout or indeterminate response
- **THEN** the system SHALL reuse the same `idempotency_key` stored on the InstitutePayout when calling the gateway
- **AND** the gateway SHALL process the payout at most once
- **AND** the system SHALL maintain a single institute payout record regardless of retries

### Requirement: Asynchronous payout status handling
The system SHALL treat gateway payout execution as asynchronous, tracking payout status through processing to a terminal state.

#### Scenario: Mark payout as processing after submission
- **WHEN** a payout is successfully submitted to the gateway
- **THEN** the system SHALL transition the institute payout to the processing state
- **AND** SHALL record the gateway payout identifier (`gateway_payout_id`) or reference

#### Scenario: Mark payout as paid after provider confirmation
- **WHEN** the gateway indicates that the payout has been successfully completed (via webhook or polling)
- **THEN** the system SHALL transition the payout to the paid state
- **AND** SHALL record any relevant bank reference or confirmation identifiers

#### Scenario: Mark payout as failed after provider failure
- **WHEN** the gateway indicates that the payout has failed or cannot be completed
- **THEN** the system SHALL transition the payout to the failed state
- **AND** SHALL record the failure reason returned by the gateway

### Requirement: Prevent duplicate or unsafe execution
The system MUST prevent re-execution of payouts that are already in a terminal state and MUST handle ambiguous states safely.

#### Scenario: Block execution of already paid payout
- **WHEN** a user attempts to execute a payout that is already in the paid state
- **THEN** the system SHALL prevent another execution attempt

#### Scenario: Require explicit resolution for stuck processing payouts
- **WHEN** a payout remains in the processing state for longer than a configured threshold
- **THEN** the system SHALL surface the payout as requiring attention
- **AND** the system SHALL require an explicit decision (for example, retry, mark failed after investigation) before attempting another execution

