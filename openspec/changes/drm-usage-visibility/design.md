## Context

This change adds a tenant-facing DRM Usage page to TPStreams settings. The page summarizes DRM license request usage for the selected month.

## Goals / Non-Goals

**Goals:**

- Create a TPStreams settings DRM Usage page.
- Make the UI clearly about DRM license request usage.
- Show selected-month summary cards and daily counts.
- Include a graph view and table view.
- Include an empty state for months with no DRM usage.
- Keep the page ready to receive real backend data later.

**Non-Goals:**

- Raw DRM license log UI.
- Billing calculations.
- Per-asset/provider/device breakdowns.

## Decisions

### 1. Page location and navigation

Add a new TPStreams settings page at `src/tpstreams/settings/drm_usage.html`.

Add `DRM Usage` to the TPStreams settings navigation. The target route should be `/tpstreams/settings/drm_usage/`.

**Rationale:** DRM is a TPStreams service, so users should discover it from the same settings area as current usage and player/branding settings.

### 2. Layout and content

The page should extend the TPStreams settings base layout.

Recommended content:

- Page heading: `DRM Usage`
- Helper copy: `Daily DRM license request usage overview`
- Summary cards:
  - `Total License Requests`
  - `Average per Day`
  - `Highest Usage Day`
- Usage card title: `Daily License Requests`
- Table columns:
  - `Date`
  - `License Requests`
- Empty state title: `No DRM usage found`
- Empty state copy: `DRM license requests for the selected month will appear here.`

**Rationale:** The PRD asks for summarized usage visibility. Raw log inspection belongs outside the tenant-facing page.

### 3. Interaction behavior

The mock should support:

- Defaulting to the current month.
- Reading `?month=YYYY-MM` from the URL.
- Updating the URL when the selected month changes.
- Previous/next month controls.
- Month dropdown.
- Graph/table toggle.
- Daily rows for every day in the selected month, including zero-count days.
- Empty state when the selected month total is zero.

For the design repo, deterministic mock data is acceptable and does not need to cover an exact 12-month range.

**Rationale:** The page can be implemented and reviewed in the design repo now, then connected to real values later.

### 4. Visual treatment

Use the TPStreams settings shell. Keep it customer-facing and practical:

- White cards on the existing settings background.
- Compact settings-page heading, not a marketing hero.
- Clear numeric hierarchy in summary cards.
- Stable table layout.
- Responsive controls that fit on mobile.

**Rationale:** This is an operational settings page, so the interface should be dense, readable, and consistent with TPStreams settings.

## Risks / Trade-offs

- **The design mock can imply backend behavior.** Keep labels and mock data realistic, but avoid presenting unsupported filters or log views.
- **Mobile navigation is limited in the current settings select.** Add DRM Usage there so the page is reachable on small screens.

## Implementation Notes

The backend will provide real usage counts later. This change only creates the design page in this repo.
