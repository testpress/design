# Proposal: Separate usages from settings navigation

## Why

The current TPStreams design prototype places the usages experience under `src/tpstreams/settings/` and exposes it through the settings tab set. That makes the information architecture misleading: usages is a standalone product area in the sidebar, not a sub-page of settings. Keeping the page and helper includes under `settings` makes future changes harder because navigation and filesystem structure disagree.

## What Changes

- Move the TPStreams usages page template out of `src/tpstreams/settings/` into a dedicated `src/tpstreams/usages/` section.
- Move usages-only helper partials into `src/tpstreams/usages/includes/`.
- Add usages-local tab navigation so the current page becomes the `Resource Usage` tab and future usage views can be added within the section.
- Remove the `Usages` entry from the settings desktop and tablet tabs.
- Add `Usages` as a first-class sidebar destination in both desktop and mobile TPStreams sidebars.
- Update sidebar active-state logic so settings pages highlight `Settings` and the usages page highlights `Usages`.
- Change the design route from `/tpstreams/settings/bandwidth/` to `/tpstreams/usages/`.

## Capabilities

### New Capabilities

- `tpstreams-usages-section`: A dedicated TPStreams usages page section with its own template path and include directory.
- `tpstreams-usages-tabs`: A usages section tab model with `Resource Usage` as the initial tab.

### Modified Capabilities

- (None; no existing specs in `openspec/specs/`.)

## Impact

- **Scope (SHARED_APPS vs TENANT_APPS):** Neither. This change affects static design templates only and does not modify tenant data, shared data, or Django app models.
- **Templates:** Updates TPStreams sidebar partials and relocates usages page templates out of settings.
- **Navigation:** Changes the prototype route and active navigation behavior for usages, and introduces usages-local tabs.
- **Data/API:** No backend or schema impact.

## Non-goals

- Changing the visual design or content of the usages page beyond what is needed for relocation.
- Adding additional usage tabs beyond the initial `Resource Usage` tab.
- Adding new usage metrics, filters, or exports.
- Updating Django backend routes or production view logic outside this design prototype repo.
