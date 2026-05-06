## ADDED Requirements

### Requirement: Settings navigation contains settings pages only
The TPStreams settings navigation SHALL list only settings-related destinations and SHALL NOT include standalone product sections.

#### Scenario: Render settings desktop tabs
- **WHEN** the settings desktop tab navigation is rendered
- **THEN** the navigation SHALL include settings pages such as General, Password, Branding, Player, Staff Management, Webhooks, Integrations, and Authentication as applicable
- **AND** the navigation SHALL NOT include `Usages`

#### Scenario: Render settings tablet tabs
- **WHEN** the settings tablet tab selector is rendered
- **THEN** the selector SHALL list settings pages only
- **AND** the selector SHALL NOT include `Usages`

### Requirement: Usages is a first-class TPStreams sidebar destination
The TPStreams product sidebar SHALL expose usages as its own destination rather than as a settings subpage.

#### Scenario: Render desktop sidebar
- **WHEN** the TPStreams desktop sidebar is rendered
- **THEN** the sidebar SHALL include a `Usages` destination linking to `/tpstreams/usages/`

#### Scenario: Render mobile sidebar
- **WHEN** the TPStreams mobile sidebar is rendered
- **THEN** the sidebar SHALL include a `Usages` destination linking to `/tpstreams/usages/`

### Requirement: Usages navigation is local to the usages section
The TPStreams usages section SHALL provide its own local tab navigation separate from the sidebar and settings tabs.

#### Scenario: Render usages local navigation
- **WHEN** the usages section is rendered
- **THEN** it SHALL include a local tab labeled `Bandwidth Usage`
- **AND** that local tab SHALL link within the usages section rather than through settings

### Requirement: Sidebar active state reflects section ownership
The TPStreams sidebar MUST highlight the active section based on the current route so that settings and usages are visually distinct product areas.

#### Scenario: Highlight settings for settings routes
- **WHEN** the current route is under `/tpstreams/settings/`
- **THEN** the sidebar SHALL highlight `Settings`
- **AND** the sidebar SHALL NOT highlight `Usages`

#### Scenario: Highlight usages for the usages route
- **WHEN** the current route is `/tpstreams/usages/`
- **THEN** the sidebar SHALL highlight `Usages`
- **AND** the sidebar SHALL NOT highlight `Settings`
