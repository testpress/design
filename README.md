# Testpress Design Prototypes

This repo is an [Eleventy](https://www.11ty.dev/) site (Nunjucks templates, Tailwind, Preline, Alpine) that hosts static HTML prototypes for the Testpress products. Prototypes are reviewed through a PR preview URL, and merging to `main` publishes them.

## 1. Set up

```bash
git clone git@github.com:testpress/design.git
cd design
npm run setup        # installs root + per-product dependencies (required, or product CSS is skipped)
npm start            # eleventy dev server + Tailwind watchers
```

Per-product servers are also available: `npm run start:testpress`, `start:simba`, `start:odinhire`, `start:limeread`.

## 2. Pick the right place

| Product | Folder | Layout |
| --- | --- | --- |
| Testpress (admin / student) | `src/testpress/` | `layouts/admin_base.html`, `staff_base.html`, `student_base.html` |
| TPStreams | `src/tpstreams/` | `layouts/tpstreams/*` |
| TPSentinel | `src/tpsentinel/` | see existing pages |
| Simba, Odinhire, Limeread, Flimix | `src/<product>/` | see existing pages |

Create a **new folder per feature** inside the product, named in `snake_case` (e.g. `src/testpress/scaled_score_configuration/`). Check the product folder for an existing feature first; extend it rather than creating a near-duplicate.

Typical contents:

```
src/testpress/my_feature/
  index.html          # main page
  empty.html          # empty state, if relevant
  add_thing.html      # other screens / flows
  includes/           # partials (modals, drawers, tables) pulled in by the pages
```

Keep each page readable. If a file grows past a few hundred lines or has a large Alpine `x-data` block, split it into partials under `includes/`.

## 3. Build the page

Start the file with front matter, then extend a layout:

```njk
---
title: Scaled Score Configuration
slug: scaled-score-configuration
---

{% extends "layouts/admin_base.html" %}

{% from "../../ui-system/components/breadcrumbs.html" import breadcrumb %}
{% from "../../ui-system/components/page-header.html" import page_header %}
{% from "../../ui-system/components/button.html" import button %}

{% block content %}
  <div class="max-w-7xl mx-auto py-10 lg:px-8 px-4 sm:px-6 space-y-5">
    {{ page_header(title="Scaled scoring", description="…") }}
    …
  </div>
{% endblock %}
```

Rules:

- **Reuse before creating.** Use the macros in `src/ui-system/components/` (button, input, select, table, modal, drawer, empty-state, badge, stepper, etc.) and follow `src/ui-system/docs/` (`page-pattern-standards.md`, `component-registry-usage-standards.md`, `ai-rules-constraints.md`). If something is missing, add or extend a component there rather than hand-rolling markup in the page.
- **Follow the page patterns**: header, then filters/actions, then main content, then pagination or footer actions. Empty states replace empty tables.
- **Links**: write internal links with the `url` filter, e.g. `href=('/testpress/my_feature/add/' | url)`, so they work under the PR preview path prefix.
- **Styling**: Preline and Tailwind utilities only, with `dark:` variants. Interactivity via Alpine/Preline; no new JS frameworks.
- **Mock data** goes in `src/_data/<name>.json` and is looped over in the template. Don't inline large datasets in pages. Use realistic but fake data.
- **Responsive and dark mode**: check both before opening a PR.
- A new Tailwind class that doesn't render usually means the product CSS watcher isn't running (see step 1).

## 4. Preview and check

- Open the dev server URL (printed by `npm start`) and visit `/<product>/<feature>/`.
- Walk through every state: default, empty, loading or error if relevant, modal and drawer open, mobile width, dark mode.
- Make sure `<div>`s are balanced and the page renders without console errors.
- Run `npx prettier --check` on the files you touched if the folder is formatted with Prettier.

## 5. Open a PR

- Branch from `main`; one feature or screen group per PR.
- Title like the existing history: `feat(ui): add …`, `Update …`, `fix: …`.
- Describe what the screens are for and link the ticket or PRD.
- CI builds the site and posts a **PR preview** at `/pr-preview/pr-<number>/`. Put the direct URL of your pages in the PR description and add screenshots.
- On merge to `main`, the site is built and published to GitHub Pages.

## 6. Optional: plan first

For larger features, copy `docs/ui_plan/ui_plan_template.md` to `docs/ui_plan/<feature>_plan.md` and fill in purpose, audience, states and components before building.

## Don'ts

- Don't commit one-off scripts that rewrite templates (the `fix_*.py` / `update_*.py` style) to the repo root. Do those locally.
- Don't edit generated output (`public/`, built files in `css/`).
- Don't duplicate an existing component or page pattern; extend it.
