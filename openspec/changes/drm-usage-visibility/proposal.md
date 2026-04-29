# Proposal: TPStreams DRM usage page

## Why

Organizations using TPStreams DRM need a simple way to view DRM consumption from settings. This page will help users understand how many DRM license requests their organization has made during a selected month.

## What Changes

- Add a DRM Usage page under TPStreams settings.
- Show selected-month DRM license request usage.
- Display total usage, daily usage, and an empty state when there is no usage.
- Keep the page summarized and customer-facing.

## Capabilities

### New Capabilities

- `tpstreams-drm-usage-page`: Customer-facing TPStreams settings page for summarized DRM usage.

### Modified Capabilities

- `tpstreams-settings-navigation`: Add DRM Usage as a settings navigation item.

## Impact

- **Scope:** Design repo UI only.
- **UI:** New TPStreams settings page for DRM usage.
- **Navigation:** Desktop and mobile/tablet TPStreams settings navigation include DRM Usage.

## Non-goals

- Tenant-facing raw DRM license log view.
- Billing rules, invoices, or rate calculation.
