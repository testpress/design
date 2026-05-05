## ADDED Requirements

### Requirement: DRM usage is visible from a primary sidebar Usage area
The system SHALL provide tenant-facing DRM license request usage visibility from a primary sidebar Usage area.

#### Scenario: User reviews DRM usage from sidebar Usage
- **WHEN** a user opens the TPStreams sidebar Usage item
- **THEN** the system SHALL display the DRM Usage page
- **AND** the sidebar SHALL highlight Usage for usage pages

### Requirement: Monthly DRM usage summary
The system SHALL summarize DRM license request usage for a selected month.

#### Scenario: Selected month has usage
- **WHEN** a selected month has DRM license request records
- **THEN** the system SHALL show total license requests, average per day, and highest usage day
- **AND** the system SHALL show daily license request counts in graph and table views

#### Scenario: Selected month has no usage
- **WHEN** the selected month has zero DRM license requests
- **THEN** the system SHALL show a clear customer-facing empty state

### Requirement: Month selection and URL sync
The system SHALL allow users to inspect monthly DRM usage periods.

#### Scenario: User changes month
- **WHEN** a user selects another month or uses previous/next month controls
- **THEN** the DRM usage summary and daily values SHALL update
- **AND** the selected month SHALL be reflected in the URL as `?month=YYYY-MM`
