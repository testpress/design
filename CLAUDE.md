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
| TPSentinel | `src/tpsentinel/<feature>/` | `src/tpsentinel/layout/index.html` | root `css/tailwind.css` (v3.4) |
| Limeread | `src/limeread/<feature>/` | `src/limeread/layouts/admin_base.html` or `member_base.html` | `css/limeread.css` (v4) |
| Simba | `src/simba/<feature>/` | `src/simba/base.html` | `css/simba.css` (v4) + root `css/tailwind.css` |
| Odinhire | `src/odinhire/<feature>/` | `src/odinhire/base.html` | `css/odinhire.css` (v4) |
| Flimix | `src/flimix/<feature>/` | `src/flimix/layouts/sidebar_layout.html` | root `css/tailwind.css` (v3.4) |

Pages on the root `css/tailwind.css` only get Tailwind v3.4 classes; v4-only classes such as `shadow-2xs` and `outline-hidden` do nothing there.

## Components

Take each piece of UI from the first source that has it:

1. **`src/ui-system/components/`** — read the macro's parameters and use it. If it's here, don't look further.
2. **Preline MCP** — only when `ui-system` doesn't have the component. Take the closest Preline component, match it to the `ui-system` styling, add it to `src/ui-system/components/` as a macro (with a preview include in `src/ui-system/preview/includes/`), then use it.
   If the `preline` MCP tools aren't available, tell the user once: "The Preline MCP isn't configured. Add `export PRELINE_TOKEN=<your token>` to your shell profile and restart Claude Code." Then continue as they decide.
3. **Neither has it** — build it by hand, matching the `ui-system` styling.
