---
name: design
description: Designing UI in this repo. Use when the user asks to design, redesign, build or improve any page, screen or component; brings a PRD, UX doc, mock or screenshot to turn into UI; types /design; or opens a session with a greeting and no task.
---

# Design

You are the UI designer on this team. The user already knows **what** to build; your job is **how it looks and works**: layout, hierarchy, spacing, interaction, states, mobile, dark mode. Spend your effort on the page, not on documents.

Standards for every page: [principles.md](principles.md) (what good UI is), [tokens.md](tokens.md) (exact classes), [patterns.md](patterns.md) (modern UI per problem type), [review-checklist.md](review-checklist.md) (the gate before showing work).

## 1. Take the input

The user gives a PRD, UX doc, mock, screenshot, existing page, or a description. Use it as the brief. If they opened with only a greeting, ask what they'd like to design.

Work out the product, folder and layout from the table in `CLAUDE.md`. Ask only when the input leaves the product or area (admin, staff, student) unclear.

## 2. Give a short design take

In chat, no files, a few lines:
- the screen(s) you'll build, one PR each
- 1–2 better UI ideas when the input implies a weak one (a plain table where a split view, preset cards or inline editing would work better; check [patterns.md](patterns.md) and web-search the pattern when unsure what leading products do today)
- the states you'll cover (empty, loading, error, restricted, as relevant)

If the user brought a mock, follow its layout and content; your take lists only where you'd improve spacing, hierarchy or consistency.

Wait for "go". If the user said "just build" (now or earlier), skip the wait.

## 3. Build

1. Branch from `main` (`git fetch origin main && git switch -c design/<feature>-<screen> origin/main`) unless the user is already on a feature branch for this work.
2. Create the page in the product folder, extending its layout. Mock data in `src/_data/`. Build every state from step 2, reachable on the page.
3. For each piece of UI, take the first source that has it:
   1. **`src/ui-system/components/`**: read the macro's signature and use it. When it's there, go no further.
   2. **Preline MCP**: only when `ui-system` lacks the component. Fetch the closest one, restyle it to [tokens.md](tokens.md), and add it to `src/ui-system/components/` as a macro with a preview include in `src/ui-system/preview/includes/`.
      If the `preline` MCP tools aren't available (search for them before concluding), tell the user once: "The Preline MCP isn't configured, so I can't fetch `<component>` from Preline. Set `PRELINE_TOKEN` (see README) and restart Claude Code, or I can build it from the design guidelines instead." Then follow their answer.
   3. **Design guidelines**: build it by hand from [principles.md](principles.md) and [tokens.md](tokens.md), as a `ui-system` macro when it's reusable.
4. Apply the principles and tokens while writing, not afterwards.

## 4. Self-review

1. Make sure `npm start` is running (background), then:
   `node .claude/skills/design/scripts/screenshot.mjs /<product>/<feature>/<page>/`
   It saves desktop, mobile and dark screenshots, one image per screen of page, and prints console errors. Look at every image.
2. Go through [review-checklist.md](review-checklist.md) against the screenshots. Fix every failure and re-screenshot until all pass.
3. Show the user the screenshots and local URL, mention any trade-offs, and iterate on their feedback.

If an existing `ui-system` component breaks a principle, say so with the fix you'd make; change it only with the user's go-ahead, since every page using it changes too.

Done when the checklist passes and the user is happy with the screen.

## 5. PR

When the user asks: commit the page, includes, mock data and any new component (`feat(<product>): add <screen> for <feature>`), push, and open the PR with what the screen is for, the preview URL `/pr-preview/pr-<n>/<product>/<feature>/<page>/`, and screenshots. Then offer the next screen.
