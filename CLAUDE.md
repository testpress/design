# Testpress design prototypes

Static HTML prototypes (Eleventy + Nunjucks, Tailwind, Preline, Alpine) for several products. Setup, folder conventions and PR steps: [README.md](README.md).

## What you'll be given

A PRD, UX doc, mock, screenshot or a description of a screen. Build the UI it describes.

- Ask only when the product or area (admin, staff, student) isn't clear from the input.
- If the input implies a weak UI (for example a plain table where a split view or inline editing would serve the user better), suggest the better option in a few lines before building, and let the user choose.
- If a mock is given, follow its layout and content.
- Design every page to [docs/ui-principles.md](docs/ui-principles.md): hierarchy, spacing, type, color, depth and empty states.

## Where the page goes

| Product | Folder | Layout to extend | CSS the page gets |
| --- | --- | --- | --- |
| Testpress admin | `src/testpress/<feature>/` | `layouts/admin_base.html` | root `css/tailwind.css` (Tailwind v3.4) |
| Testpress staff | `src/testpress/<feature>/` | `layouts/staff_base.html` | root `css/tailwind.css` (v3.4) |
| Testpress student | `src/testpress/<feature>/` | `layouts/student_base.html` or `src/testpress/layout/student_layout.html` | root `css/tailwind.css` (v3.4) |
| TPStreams | `src/tpstreams/<feature>/` | `layouts/tpstreams/sidebar_layout.html` or `top_searchbar_layout.html` | root `css/tailwind.css` (v3.4) |
| TPSentinel | `src/tpsentinel/<feature>/` | `src/tpsentinel/layout/index.html` | `css/sentinel-backend.css` (v4 + Preline default theme tokens), built from `src/tpsentinel/backend.css` |
| Limeread | `src/limeread/<feature>/` | `src/limeread/layouts/admin_base.html` or `member_base.html` | `css/limeread.css` (v4) |
| Simba | `src/simba/<feature>/` | `src/simba/base.html` | `css/simba.css` (v4) + root `css/tailwind.css` |
| Odinhire | `src/odinhire/<feature>/` | `src/odinhire/base.html` | `css/odinhire.css` (v4) |
| Flimix | `src/flimix/<feature>/` | `src/flimix/layouts/sidebar_layout.html` | root `css/tailwind.css` (v3.4) |

Only full pages get a URL: a file must extend a layout, be a whole HTML document or start with front matter. Partials (put them in the feature's `includes/` folder) and layouts are not published, so link only to pages. A partial that a page loads by URL at runtime (`fetch`, `hx-get`, `iframe`) needs front matter (`publish: true`) to stay published. Details: [README.md](README.md#which-files-get-a-url).

Pages on the root `css/tailwind.css` only get Tailwind v3.4 classes; v4-only classes such as `shadow-2xs` and `outline-hidden` do nothing there.

Products with their own CSS build (v4) only get classes from the files listed with `@source` in their entry CSS (for TPSentinel, `src/tpsentinel/backend.css`). Add every new page folder there, rebuild (`npm run build:css --prefix src/<product>`) and commit the rebuilt `css/<product>*.css`: the site build copies `css/` before it rebuilds, so PR previews use the committed file.

TPSentinel's layout caps page content at `max-w-7xl` and centres it, so pages don't set their own width. Lists, tables, dashboards and detail pages fill that width; forms and settings narrow further inside it (`max-w-3xl`).

On products that use the Preline theme (TPSentinel), use theme tokens (`bg-layer`, `border-layer-line`, `text-foreground`, `text-muted-foreground-1`, `bg-card`, `text-primary` …) for neutral and primary colours. Accent colours with no token (status icons, soft badges) use Tailwind palette classes with a `dark:` variant, as Preline's own components do. Don't invent custom tokens.

## Components

Take each piece of UI from the first source that has it:

1. **The product's own `components/` folder** (for example `src/tpsentinel/components/`), if the product has one. These are the product's versions of ui-system macros, styled for its CSS (TPSentinel's use Preline theme tokens). Read the macro's parameters and use it. When the product has this folder and the component isn't in it, port the `ui-system` macro (or the Preline component from step 3) into the product's `components/` folder in the product's styling, add the folder's file to the product's `@source` list if needed, and use it from there. Never import a `ui-system` macro directly into such a product's pages.
2. **`src/ui-system/components/`** — for products without their own `components/` folder: read the macro's parameters and use it. If it's here, don't look further.
3. **Preline MCP** — only when `ui-system` doesn't have the component. Take the closest Preline component, match it to the `ui-system` styling, add it to `src/ui-system/components/` as a macro (with a preview include in `src/ui-system/preview/includes/`), then use it.
   If the `preline` MCP tools aren't available, tell the user once: "The Preline MCP isn't configured. Add `export PRELINE_TOKEN=<your token>` to your shell profile and restart Claude Code." Then continue as they decide.
4. **Neither has it** — build it by hand, matching the `ui-system` styling.
