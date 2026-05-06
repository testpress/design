## ADDED Requirements

### Requirement: TPStreams usages lives in its own section
The TPStreams usages experience SHALL be implemented as a standalone section under `src/tpstreams/usages/` rather than under the settings section.

#### Scenario: Define usages page ownership
- **WHEN** developers inspect the TPStreams template structure
- **THEN** the usages page SHALL live under `src/tpstreams/usages/`
- **AND** it SHALL NOT be defined under `src/tpstreams/settings/`

### Requirement: TPStreams usages supports section-local tabs
The TPStreams usages section SHALL provide its own tab navigation so future usage views can be added without restructuring the section.

#### Scenario: Render the initial usages tab
- **WHEN** the usages section is rendered
- **THEN** it SHALL show `Bandwidth Usage` as the initial tab
- **AND** the current usages content SHALL be rendered within that tab

#### Scenario: Add future usages views inside the section
- **WHEN** developers add another usages view in the future
- **THEN** they SHALL be able to add it as another tab within `src/tpstreams/usages/`
- **AND** they SHALL NOT need to move the usages section back under settings

### Requirement: Usages-only partials are colocated with the usages section
The system SHALL keep usages-specific helper partials with the usages section so ownership and maintenance remain clear.

#### Scenario: Locate usages helper partials
- **WHEN** developers inspect the helper partials used by the usages page
- **THEN** usages-only partials such as the month filter and export dropdown SHALL live under `src/tpstreams/usages/includes/`
- **AND** they SHALL NOT remain under `src/tpstreams/settings/includes/`

### Requirement: Relocating usages preserves page behavior
Moving the usages page into its own section MUST preserve the existing page interactions and content structure.

#### Scenario: Render moved usages page
- **WHEN** the usages page is loaded from `/tpstreams/usages/`
- **THEN** the page SHALL continue to render the existing usage summary metrics, usage table, month filter, and export dropdown
- **AND** the page SHALL present that content under the `Bandwidth Usage` tab
- **AND** the relocation SHALL NOT require users to navigate through settings first

#### Scenario: Preserve moved partial interactions
- **WHEN** a user interacts with moved usages controls such as the month filter or export dropdown
- **THEN** those controls SHALL behave the same as before the relocation
