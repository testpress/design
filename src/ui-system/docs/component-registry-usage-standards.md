## Purpose

This document acts as the single source of truth for approved reusable UI components.

AI and developers must only use components listed in this registry when generating or building UI.

If a required component does not exist, it must be added through the approved component creation process.


---

## Component Usage Rules

### Reuse Before Creation

AI and developers must reuse approved components before creating new UI structures.

Priority order:


1. Existing page pattern
2. Existing reusable component
3. Approved component variation
4. New component request


---

### Parameter vs New Component Rule

Use parameters when:

* text changes
* icon changes
* size changes
* state changes
* small visual variations exist

Create a new component when:

* structure changes
* layout changes
* interaction behavior changes
* repeated UI pattern emerges


---

### Missing Component Rule

If no approved component exists:

Return:

> New component required

Do not invent new reusable UI structures.


---

# Buttons

## button

### Purpose

Used for primary and secondary user actions.

### Allowed Variants

* primary
* secondary
* outline
* ghost
* danger
* link

### Supported Parameters

* text
* icon
* icon_position
* size
* loading
* disabled
* full_width

### Usage Rules

* Only one primary button per major section.
* Danger variant must only be used for destructive actions.
* Similar actions must use consistent variants.

### Examples

Save → Primary Cancel → Secondary Delete → Danger Learn More → Link


---

# Forms

## input

### Purpose

Used for standard text-based input.

### Supported Parameters

* label
* placeholder
* value
* required
* disabled
* error_message
* help_text

### Usage Rules

* Must include label unless explicitly hidden.
* Use consistent spacing across forms.


---

## password_input

### Purpose

Used for password entry with visibility toggle.

### Supported Parameters

* label
* placeholder
* required
* disabled
* error_message
* help_text

### Usage Rules

* Must support show/hide password interaction.
* Must maintain consistent behavior across forms.


---

## textarea

### Purpose

Used for long-form text input.

### Supported Parameters

* label
* placeholder
* rows
* required
* disabled
* error_message

### Usage Rules

* Use only when multiline input is required.


---

## select

### Purpose

Used for predefined option selection.

### Supported Parameters

* label
* placeholder
* options
* selected_value
* required
* disabled

### Usage Rules

* Avoid using for very small binary selections.


---

## checkbox

### Purpose

Used for multi-selection or boolean confirmation.

### Supported Parameters

* label
* checked
* disabled
* help_text


---

## radio

### Purpose

Used for mutually exclusive choices.

### Supported Parameters

* label
* options
* selected_value
* disabled


---

# Data Display

## card

### Purpose

Used to group related content.

### Allowed Variants

* default
* bordered
* interactive

### Supported Parameters

* title
* description
* actions
* content

### Usage Rules

* Use for logical content grouping.
* Avoid unnecessary nesting.


---

## metric_card

### Purpose

Used for displaying important metrics or KPIs.

### Supported Parameters

* title
* value
* trend
* icon

### Usage Rules

* Metrics must remain visually scannable.


---

## table

### Purpose

Used for structured data display.

### Allowed Variants

* standard
* compact
* analytics

### Supported Parameters

* columns
* rows
* pagination
* sorting
* filters
* empty_state

### Usage Rules

* Must remain responsive.
* Similar datasets must use same table style.


---

## badge

### Purpose

Used for lightweight status indication.

### Allowed Variants

* success
* warning
* danger
* neutral
* info

### Usage Rules

* Must be used for short status communication only.


---

## empty_state

### Purpose

Used when content or data is unavailable.

### Supported Parameters

* title
* description
* action_text
* illustration
* icon

### Usage Rules

* Must clearly explain next possible action.


---

# Navigation

## breadcrumbs

### Purpose

Used to show navigation hierarchy.

### Supported Parameters

* items

### Usage Rules

* Use only when hierarchy benefits navigation.


---

## pagination

### Purpose

Used for navigating large datasets.

### Supported Parameters

* current_page
* total_pages

### Usage Rules

* Must remain accessible on smaller screens.


---

## tabs

### Purpose

Used to organize related content sections.

### Supported Parameters

* tabs
* active_tab

### Usage Rules

* Avoid excessive tab count.


---

## dropdown

### Purpose

Used for secondary actions or option lists.

### Supported Parameters

* items
* trigger_label
* icon

### Usage Rules

* Avoid hiding primary actions inside dropdowns.


---

# Feedback Components

## alert

### Purpose

Used for system feedback and important notices.

### Allowed Variants

* success
* warning
* danger
* info

### Supported Parameters

* title
* description
* dismissible

### Usage Rules

* Keep messages concise and actionable.


---

## modal

### Purpose

Used for confirmations or focused interactions.

### Supported Parameters

* title
* content
* primary_action
* secondary_action

### Usage Rules

* Avoid excessive modal stacking.
* Use only for important interruption flows.


---

# Layout Components

## page_header

### Purpose

Used for page title, context, and actions.

### Supported Parameters

* title
* description
* actions
* breadcrumbs

### Usage Rules

* Must appear consistently across pages.


---

## filter_section

### Purpose

Used for filters and search controls.

### Supported Parameters

* filters
* search_enabled
* actions

### Usage Rules

* Must remain visually grouped and predictable.


---

## section_container

### Purpose

Used for grouping page sections.

### Supported Parameters

* title
* description
* content

### Usage Rules

* Maintain consistent section spacing.


---

# Utility / Scheduling

## date_picker

### Purpose

Used for selecting single dates, times, or date ranges with twin-calendar grids.

### Supported Parameters

* label
* name
* id
* placeholder
* required
* disabled
* readonly
* single
* datetime
* range
* range_datetime
* inline
* min_date
* max_date
* show_time
* show_clear
* show_today
* selected_value
* error_message

### Usage Rules

* Use `single` for publishing, birth dates, or target deadlines.
* Use `datetime` when precise scheduling hour/minute coordinates are required.
* Use `range` or `range_datetime` for course access periods or exam window definitions.
* Set `show_clear` to allow resetting values in optional fields.


