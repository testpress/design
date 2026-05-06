# Proposal: TPStreams DRM usage page

## Why

Organizations using TPStreams DRM need a simple way to view DRM consumption. DRM usage is usage/analytics data, so it should be available from a primary Usage area.

## What Changes

- Add a DRM Usage tab in the existing `Usages` area alongside Resource Usage.
- Show selected-month DRM license request usage.
- Display total usage, daily usage, and an empty state when there is no usage.
- Keep the page summarized and customer-facing.

## Capabilities

### New Capabilities

- `tpstreams-drm-usage-page`: Customer-facing TPStreams sidebar Usage page for summarized DRM usage.

## Impact

- **Scope:** Design repo UI only.
- **UI:** New TPStreams Usage page for DRM usage.
- **Navigation:** DRM Usage is accessible as a tab within the `Usages` section.

## Non-goals

- Tenant-facing raw DRM license log view.
- Billing rules, invoices, or rate calculation.
