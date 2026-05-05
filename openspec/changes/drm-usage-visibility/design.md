## Context

This change adds tenant-facing DRM Usage visibility in a new primary sidebar Usage area. The page summarizes DRM license request usage for the selected month.

## Goals / Non-Goals

**Goals:**

- Add a primary sidebar `Usage` item.
- Add a TPStreams DRM Usage page in that new Usage area.
- Make the UI clearly about DRM license request usage.
- Show selected-month summary cards and daily counts.
- Include a graph view and table view.
- Include an empty state for months with no DRM usage.

**Non-Goals:**

- Raw DRM license log UI.
- Billing calculations.
- Per-asset/provider/device breakdowns.

## Decisions

### 1. Page location and navigation

For the MVP, add a new primary sidebar `Usage` item and place DRM Usage there at `src/tpstreams/usage/drm_usage.html`.

**Rationale:** DRM Usage is analytics/consumption data. It belongs in a Usage area, not with configuration pages.

### 2. Layout and content

The DRM Usage page should extend the TPStreams sidebar layout and use a compact operational page layout.

Recommended content:

- Sidebar item: `Usage`
- Page heading: `Usage`
- Section heading: `DRM Usage`
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
- Mobile chart labels should be reduced so the x-axis stays readable.

For the design repo, deterministic mock data is acceptable and does not need to cover an exact 12-month range.

**Rationale:** The page can be implemented and reviewed in the design repo now, then connected to real values.

### 4. Visual treatment

Use the TPStreams sidebar. Keep it customer-facing and practical:

- White cards on the TPStreams app background.
- Compact operational headings, not a marketing hero.
- Clear numeric hierarchy in summary cards.
- Stable table layout.
- Responsive controls that fit on mobile.

**Rationale:** This is an operational usage page, so the interface should be dense, readable, and consistent with the current TPStreams UI.

## Risks / Trade-offs

- **The design mock can imply backend behavior.** Keep labels and mock data realistic, but avoid presenting unsupported filters or log views.

## Implementation Notes

The backend will provide real usage counts. This change only creates the design page in this repo.
