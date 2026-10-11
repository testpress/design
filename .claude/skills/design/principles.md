# Design principles

What good interface design is, in rules you can check. Each rule names the decision, not the taste. The exact classes for every rule are in [tokens.md](tokens.md).

## Start from the job

- Every screen answers one main question ("What quality is this org getting?", "Which review needs me next?"). Put the answer to it first, where the eye lands.
- Design around the **decision** the user makes on the screen, not around the data model. Show what the data *means* for that decision (size per hour, cost change, days overdue) before the raw fields.
- Show the default path first. Presets, recommended options and common cases up front; rare and expert controls behind "Advanced" or a secondary view.
- Fewer things, done well. Every element on the page should help the main job; if it doesn't, it goes to a secondary place or away.

## Hierarchy

- Express importance with **weight and color first, size second**. A large light number reads as less important than a smaller dark one.
- Use three text levels and stick to them: primary (dark, the content), secondary (gray, supporting context), muted (lighter gray, metadata and timestamps).
- **De-emphasize the competition** instead of shouting the important thing. If a primary item doesn't stand out, make its neighbours quieter.
- Labels are a last resort. When the format makes the meaning obvious (an email, a date, "12 students"), drop the label. When a label is needed, the label is secondary and the value is primary.
- One focal point per section. If two things compete, decide which one wins.

## Spacing and layout

- Start with too much whitespace and remove it, not the other way round.
- Use only the spacing scale. Every gap is a scale value; no in-between numbers.
- **Space shows grouping.** Space between groups is clearly larger than space inside a group (a label sits closer to its own field than to the field above).
- Don't fill the screen because it's there. Forms and settings get a narrow column; content gets a readable width; only data-dense views go full width.
- Align to a few strong edges. Ragged left edges and mixed alignments make a page feel unfinished.
- A grid is a tool, not a rule: fixed widths for sidebars and side panels, flexible for the main area.

## Typography

- Use the type scale only. A page usually needs 3–4 sizes.
- Body text at a readable measure (roughly 45–75 characters per line). Long prose never spans a wide layout.
- Numbers that get compared (tables, stats) use tabular figures and right-align in columns.
- Line height: tighter for large headings, comfortable for body text.
- Sentence case for headings, buttons and labels.

## Color

- Grays carry the interface. The primary color is for actions, selection and focus, and it stays rare enough to mean something.
- Semantic colors mean one thing each: green success, amber/orange warning, red danger or destructive, blue information. Never use them as decoration.
- Color is never the only signal. Pair it with an icon, text or position (a red badge also says "Failed").
- Text on colored backgrounds uses a shade of that hue, not gray or pure white on a pale tint.
- Contrast: body text and controls meet WCAG AA in both themes.

## Depth and separation

- Separate with **space first, then a background change, then a border**. Borders everywhere make a page look like a spreadsheet.
- Shadows mean "floating above the page": menus, popovers, modals, toasts. Content cards on the page don't need them.
- Fewer containers. A card inside a card inside a card is a smell; flatten.

## Data display

- A table is for **comparing many items of the same kind** across the same attributes. It is not the default way to show data.
- Use a list with rich rows when each item has a title plus a few facts; cards when items are visual or few; a description list for one record's details; a timeline for history.
- Combine related columns (name + email in one cell, primary and secondary line) instead of one column per field.
- Every number has context: compared to what, over which period, good or bad.
- Long content truncates with the full value available (tooltip or detail view), never breaks the layout.

## Forms

- One column. Group related fields under a short section heading with a sentence of help when needed.
- Label above the field, help text below, error replaces help text and says how to fix it.
- Sensible defaults pre-filled; mark optional fields rather than every required one when most are required.
- Field width hints the expected input (a pincode field isn't full width).
- The primary action sits at the end of the form, aligned with the content, with the secondary action beside it.

## Actions

- One primary action per section. Secondary actions are lower emphasis; tertiary ones are links or live in a menu.
- Button labels are verbs that say what happens ("Save profile", "Publish 12 videos"), not "OK" or "Submit".
- Destructive actions are separated from the safe ones and styled as such. Prefer **undo** after the fact over "Are you sure?" before it, except where undo is impossible.
- Show the consequence before an irreversible or costly action ("New videos will be ~40% larger. Existing videos are unchanged.").
- Bulk actions appear only when items are selected, near the selection.

## States and feedback

Design every state, not only the happy path:
- **Empty, first use**: explain what this place is for and offer the first action.
- **Empty, no results**: say what was searched or filtered and offer to clear it.
- **Loading**: skeletons shaped like the content for page loads; inline spinners for actions.
- **Error**: say what happened, whether data is safe, and what to do next.
- **Restricted**: say why it's unavailable and who can grant access.
- **Success**: confirm briefly (toast), and make the result visible in place.

## Copy

- Write like a helpful colleague: short, specific, plain. Name things the way users do.
- Lead with the outcome ("3 reviews need your decision") rather than the system ("Pending items: 3").
- Dates and times relative when recent ("2 hours ago"), absolute when it matters (deadlines, audits).

## Responsive

- Design the mobile version deliberately: decide what the user does on a phone and make that easy. Hiding everything except the core job is a valid choice.
- Tables become stacked rows or cards on mobile; split views become list → detail navigation; side panels become full-screen sheets.
- Touch targets at least 40px tall on mobile; primary actions reachable without hunting.

## Dark mode

- Dark mode is a redesign of the same hierarchy, not an inversion: surfaces get lighter as they rise, text levels keep their relative contrast, borders get subtler.
- Every color class has its `dark:` counterpart from [tokens.md](tokens.md).

## Accessibility

- Every input has a visible label (or `sr-only` with an obvious visual cue like a search icon).
- Every interactive element works with the keyboard and shows a visible focus ring.
- Icon-only buttons have an `aria-label` and a tooltip.
- Motion is short and purposeful.
