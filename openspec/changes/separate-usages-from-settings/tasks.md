## 1. Move the usages page into its own TPStreams section

- [x] 1.1 Create a dedicated `src/tpstreams/usages/` page so the filesystem matches the sidebar information architecture instead of implying usages is a settings subpage.
- [x] 1.2 Move usages-only helper partials into `src/tpstreams/usages/includes/` and preserve their current interactions so the relocation does not change page behavior.

## 2. Make the usages section extendable

- [x] 2.1 Add a usages-specific base and tab navigation so the current screen becomes the `Bandwidth Usage` tab and future usage views can be added without another layout refactor.

## 3. Remove usages from settings-specific navigation

- [x] 3.1 Update the settings desktop and tablet tabs so they describe settings pages only, with `Usages` removed from the settings navigation model.

## 4. Promote usages to a first-class sidebar destination

- [x] 4.1 Update TPStreams desktop and mobile sidebars to link to `/tpstreams/usages/` so users reach usages from the product-level navigation where it now belongs.
- [x] 4.2 Verify active-state behavior and stale route cleanup so `Settings` remains selected only on settings pages and no template references remain to `/tpstreams/settings/bandwidth/`.
