## Context

The TPStreams design prototype currently mixes two concepts:

- Settings pages live under `src/tpstreams/settings/` and use a shared settings base with desktop and tablet tabs.
- The usages page was originally implemented as `src/tpstreams/settings/bandwidth.html` with usages-specific helper includes under `src/tpstreams/settings/includes/`.

That structure was acceptable while usages appeared as a settings tab, but it becomes misleading once the product navigation treats usages as a sidebar destination alongside Assets, Live Stream, Settings, and Billing.

The existing TPStreams template patterns in this repo are section-oriented:

- Top-level product areas such as `assets`, `billing`, and `live_streams` have their own directories under `src/tpstreams/`.
- Shared shell/navigation lives in `_includes/partials/tpstreams/` and `layouts/tpstreams/sidebar_layout.html`.
- Section-specific helper partials are colocated under each section’s `includes/` directory.

The usages page should follow that same pattern.

## Goals / Non-Goals

**Goals:**

- Align filesystem structure with the visible TPStreams navigation.
- Make usages a standalone section under `src/tpstreams/`.
- Make the usages section extendable with its own tab pattern, starting with `Bandwidth Usage`.
- Keep the relocation low-risk by preserving existing page markup and helper behavior.
- Ensure sidebar active states reflect the new information architecture cleanly.

**Non-Goals:**

- Reworking the table, filters, export interactions, or metrics content.
- Adding another functional usages tab in this change.
- Refactoring unrelated settings templates.

## Decisions

### 1. Create a dedicated `src/tpstreams/usages/` section

- Add a new `src/tpstreams/usages/base.html` that provides the usages heading and local tab layout.
- Keep the page within the usages section instead of inheriting from `src/tpstreams/settings/base.html`, because usages is no longer part of the settings tab hierarchy.
- Have `src/tpstreams/usages/index.html` extend the usages base and render the current content inside a usages-specific block.

**Rationale:** This matches the existing section-based layout used by `assets`, `billing`, and `live_streams`, and removes the mental mismatch between page purpose and directory structure.

### 2. Move usages-only includes next to the usages page

- Relocate `month_filter.html` and `usage_export_dropdown.html` from `src/tpstreams/settings/includes/` to `src/tpstreams/usages/includes/`.
- Preserve the existing Alpine behavior and markup during the move.

**Rationale:** These partials are not shared by settings pages, so colocating them with the usages page makes ownership clearer and reduces accidental coupling.

### 3. Add usages-local tabs with `Bandwidth Usage` as the first tab

- Add `src/tpstreams/usages/includes/desktop_tabs.html` and `src/tpstreams/usages/includes/tablet_tabs.html`.
- Use `Bandwidth Usage` as the label for the current page.
- Keep the tab structure local to the usages section so additional usage views can be added later without another layout move.

**Rationale:** The section should be extendable now, not only after more usage views exist. A local tab structure gives the section a stable shape for future additions such as storage or live-stream-focused reporting.

### 4. Remove usages from the settings tab navigation

- Update `src/tpstreams/settings/includes/desktop_tabs.html` and `src/tpstreams/settings/includes/tablet_tabs.html` to remove the usages entry.

**Rationale:** Once usages is a sidebar destination, leaving it in the settings tabs creates two competing navigation models for the same page.

### 5. Add usages as a first-class sidebar item

- Update `src/_includes/partials/tpstreams/sidebar_desktop.html` and `src/_includes/partials/tpstreams/sidebar_mobile.html` to link to `/tpstreams/usages/`.
- Keep `Settings` highlighting based on `tpstreams/settings/` URLs only.
- Highlight `Usages` only for `/tpstreams/usages/`.

**Rationale:** This preserves a single clear source of navigation truth and mirrors how other TPStreams sections are presented.

## Risks / Trade-offs

- **[Risk] Broken links from the old prototype route**  
  Any references to `/tpstreams/settings/bandwidth/` will stop matching after the move.  
  → **Mitigation:** Update all sidebar and template references in the same change and verify no stale route strings remain in `src/`.

- **[Risk] A plain page move could still leave usages hard to extend**  
  Without local tabs, adding the next usage view would likely trigger another structural refactor.  
  → **Mitigation:** Introduce a usages-local tab pattern now and make the current page the `Bandwidth Usage` tab.

- **[Risk] Subtle behavior regressions in moved partials**  
  Rewriting the includes during the move could accidentally change dropdown behavior.  
  → **Mitigation:** Treat the partial relocation as a copy/move, preserving existing Alpine interactions and markup.

- **[Risk] Confusion if settings still appears active on usages**  
  Broad URL matching in the sidebar can accidentally keep `Settings` selected on the usages route.  
  → **Mitigation:** Use explicit route matching for `/tpstreams/usages/` and keep settings matching scoped to `tpstreams/settings/`.

## Migration Plan

1. Create the new `src/tpstreams/usages/` page and includes directory.
2. Add a usages base and usages-local tabs with `Bandwidth Usage` as the first tab.
3. Move usages-only helper partials into the new section without changing behavior.
4. Remove usages from settings tabs.
5. Update desktop and mobile sidebar links and active-state logic to point to `/tpstreams/usages/`.
6. Delete the old `src/tpstreams/settings/bandwidth.html` and stale settings-only includes after references are updated.
7. Verify there are no remaining `/tpstreams/settings/bandwidth/` references in the repo.
