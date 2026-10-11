# Testpress design prototypes

Static HTML prototypes (Eleventy + Nunjucks, Tailwind, Preline, Alpine, Lucide) for several products. Pages are reviewed on a PR preview and published on merge to `main`. Setup, commands and PR conventions: [README.md](README.md).

## Every UI task goes through the `design` skill

Run the `design` skill when the user:
- asks to design, redesign, improve or build any page, screen, flow or component
- brings a problem statement, interview notes, PRD or UX doc
- opens the session with a greeting or no concrete task, or types `/design`

The skill owns the workflow (problem → brief → screen map → UX doc → build → review → PR, one screen per PR) and the design standards. Small, explicit edits ("change this label", "fix this padding") can be done directly, but still meet the skill's [principles](.claude/skills/design/principles.md) and [tokens](.claude/skills/design/tokens.md).

## Products

Pick the product, folder and layout from this table. When the input does not make the product and area obvious, ask.

| Product | Folder | Layout to extend | CSS the page gets |
| --- | --- | --- | --- |
| Testpress admin | `src/testpress/<feature>/` | `layouts/admin_base.html` | `css/tailwind.css` (root, **Tailwind v3.4**) |
| Testpress staff | `src/testpress/<feature>/` | `layouts/staff_base.html` | `css/tailwind.css` (root, v3.4) |
| Testpress student | `src/testpress/<feature>/` | `src/testpress/layout/student_layout.html` | `css/testpress-v2.css` (Tailwind v4, Preline themes) |
| TPStreams | `src/tpstreams/<feature>/` | `layouts/tpstreams/sidebar_layout.html` or `top_searchbar_layout.html` | `css/tailwind.css` (root, v3.4) |
| TPSentinel | `src/tpsentinel/<feature>/` | `src/tpsentinel/layout/index.html` (app), `auth_base.html` (auth) | `css/tailwind.css` (+ `sentinel-backend.css` on auth) |
| Limeread | `src/limeread/<feature>/` | `src/limeread/layouts/admin_base.html` / `member_base.html` / `auth_base.html` | `css/limeread.css` (v4) |
| Simba | `src/simba/<feature>/` | `src/simba/base.html` | `css/simba.css` (v4) + root `css/tailwind.css` |
| Odinhire | `src/odinhire/<feature>/` | `src/odinhire/base.html` | `css/odinhire.css` (v4) |
| Flimix | `src/flimix/<feature>/` | `src/flimix/layouts/sidebar_layout.html` | `css/tailwind.css` (root, v3.4) |

Gotchas no config file tells you:
- Pages on the root `css/tailwind.css` only get Tailwind **v3.4** classes. v4-only names (`shadow-2xs`, `outline-hidden`, `inset-s-*`, `bg-linear-*`) silently do nothing there. Use the classes in [tokens.md](.claude/skills/design/tokens.md), which work in both.
- `primary-*` colors are CSS variables set at runtime in `src/_includes/layouts/base.html`; use `primary-*`, never a hard-coded brand hue.
- `css/*.css` and `js/notes-editor.js` are build output. A Tailwind class that doesn't render means the watcher for that product's CSS isn't running (`npm start`).
- `src/_includes/layouts/admin_base.html` and `src/testpress/layouts/admin_base.html` are different files; `layouts/admin_base.html` resolves to the first.

## Building blocks

- Components: `src/ui-system/components/*.html` (Nunjucks macros). Read a macro's signature before calling it. Gallery: `/ui-system/preview/components/`.
- Missing component: get it from the Preline MCP (`preline-mcp` skill in `.agents/skills/`), restyle it to the tokens, and add it as a macro in `src/ui-system/components/` with a preview include. If the `preline` MCP tools are unavailable, tell the user to set `PRELINE_TOKEN` (see README) instead of hand-writing the component.
- Mock data: `src/_data/<name>.json`. Internal links: `href=('/path/' | url)`.
- Icons: Lucide via `<i data-lucide="name" class="size-4">`.

## Design work lives in `docs/design/<product>/<feature>/`

`problem.md`, `brief.md`, `screens.md`, `ux/<screen>.md`. `screens.md` records each screen's status and PR, so any session can resume a feature from there.
