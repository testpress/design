# Review checklist

Run this against the screenshots (desktop, mobile, dark) before showing a screen to the user. Every item is pass or fail; fix every fail and re-screenshot. Report anything you deliberately left failing, with the reason.

## Job
- [ ] The answer to the screen's main question is the first thing the eye lands on in the desktop screenshot.
- [ ] The primary action is obvious, and there is only one per section.
- [ ] The screen shows what the data *means* for the user's decision, not only raw fields.
- [ ] Every state from the design take exists and is reachable (default, empty, no results, loading, error, restricted, as relevant).

## Hierarchy and type
- [ ] Squint test: blur your attention on the screenshot; the main content, not borders or chrome, still stands out.
- [ ] Only the three text levels from tokens.md; no gray-on-gray that's hard to read.
- [ ] No unnecessary labels; where labels exist they are quieter than the values.
- [ ] 3–4 font sizes on the page at most.

## Spacing and layout
- [ ] Every spacing value is on the scale in tokens.md.
- [ ] Space between groups is visibly larger than space within a group.
- [ ] The page uses the container for its type (form pages are not full width).
- [ ] Left edges align; nothing is ragged or off by a few pixels.
- [ ] No card-in-card-in-card nesting; separation uses space or background before borders.

## Color
- [ ] Primary color only on actions, selection and focus.
- [ ] Status colors only for status, each paired with text or an icon.
- [ ] Dark screenshot: every surface, border and text has a dark variant; nothing is white-on-white or invisible.

## Components and code
- [ ] Existing `ui-system` components used wherever one fits; no hand-rolled duplicate of a component.
- [ ] Classes come from tokens.md and exist in the page's Tailwind version (see `CLAUDE.md`).
- [ ] Lucide icons via `data-lucide`; icon-only buttons have `aria-label`.
- [ ] Mock data in `src/_data/`, realistic (real-looking names, long values, large and small numbers).
- [ ] Internal links use the `url` filter.
- [ ] No console errors; `<div>`s balanced (page renders fully).

## Content
- [ ] Button labels are specific verbs; headings in sentence case.
- [ ] Empty and error states say what happened and what to do next.
- [ ] Long names and large numbers don't break the layout (truncate with full value available).

## Responsive
- [ ] Mobile screenshot: no horizontal scroll, the core job is doable, actions reachable.
- [ ] Tables and split views collapse the way principles.md describes.
