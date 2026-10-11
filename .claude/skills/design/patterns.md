# Patterns

How leading products solve each **problem type** today. This is the starting point for Step 4's research, not the end of it: web-search the problem type before deciding, and add what you learn here (with the products that do it and the date you checked).

Each entry: the current pattern, where it's seen, when it fits, when it doesn't.

## Review / triage queue
Working through many items that each need a decision (reviews, approvals, flagged sessions, doubts, support tickets).
- **Pattern**: split view, list on the left, selected item's detail on the right. Keyboard navigation (`j`/`k`, `Enter`), the decision buttons always visible in the detail pane, auto-advance to the next item after a decision, counts per status as tabs or filter chips, "assigned to me" as the default view.
- **Seen in**: Linear triage, Gmail, Front, GitHub PR review, Intercom inbox.
- **Fits**: high volume, repeated decisions, same user every day.
- **Doesn't fit**: rare, one-off lookups (a plain list → detail page is simpler). On mobile it becomes list → full-screen detail with back.

## Rich text / notes editor
- **Pattern**: clean page with no permanent toolbar. Slash command menu for inserting blocks, a floating toolbar on text selection, markdown shortcuts (`#`, `-`, `**`), drag handles on blocks, autosave with a quiet "Saved" indicator.
- **Seen in**: Notion, Linear docs, Craft, GitHub issue editor (markdown + toolbar).
- **Fits**: writing-focused users, frequent use.
- **Doesn't fit**: a single short text field (use a plain textarea); users who need visible formatting buttons (keep a compact toolbar).

## Configuration with trade-offs
Settings where every choice has a cost (quality vs bandwidth, strictness vs false alarms, price vs features).
- **Pattern**: plain-language summary of the current setting at the top. Presets as selectable cards, each showing its **impact** (size, cost, risk) relative to the current one. Custom values behind "Customize". A before → after preview of the consequence on save. Change history with who, why and "Revert".
- **Seen in**: Vercel and Cloudflare plan/settings pages, Stripe Radar rules, AWS cost estimates.
- **Fits**: anything where users fear breaking something or overspending.
- **Doesn't fit**: simple on/off preferences (a switch list is enough).

## Settings (general)
- **Pattern**: left navigation of categories (or a single scrolling page with an in-page nav), grouped sections with a heading and one sentence each. Toggles apply immediately with a toast; multi-field forms have one save per section. Danger zone at the bottom, separated.
- **Seen in**: GitHub, Vercel, Linear, Stripe settings.

## List of records you manage
- **Pattern**: search first, then filter chips (add filter → field → value) and saved views; rows with a primary line and a secondary line instead of many columns; row click opens detail; row actions in a `⋯` menu; bulk action bar appears on selection.
- **Seen in**: Linear, Notion database views, Stripe customers, Vercel projects.
- **Doesn't fit**: data that users export and pivot (offer export, don't rebuild Excel).

## Detail page of one record
- **Pattern**: header with name, status badge and primary actions; a summary strip of the 3–5 facts that matter; tabs only when sections are large; activity timeline at the side or bottom.
- **Seen in**: Stripe payment/customer detail, GitHub PR, Linear issue.

## Dashboard / analytics
- **Pattern**: lead with what needs attention ("3 videos failed transcoding") and the key metrics with comparison to the previous period; charts after the numbers; every metric links to the items behind it.
- **Seen in**: Stripe home, Vercel analytics, PostHog.
- **Avoid**: vanity charts with no action behind them.

## Global navigation and search
- **Pattern**: command palette on `Cmd/Ctrl+K` for jumping to pages, records and actions; recent items first.
- **Seen in**: Linear, GitHub, Vercel, Notion.

## Destructive and reversible actions
- **Pattern**: act immediately and offer **Undo** in a toast for reversible actions; a confirmation that names the consequence (and, for severe cases, typing the name) only for irreversible ones.
- **Seen in**: Gmail, Linear (undo), GitHub (type-to-confirm delete).

## Creation flows
- **Pattern**: create with the minimum required fields (often a modal or inline), then refine on the detail page. A stepper only when steps truly depend on each other; otherwise one page with a sticky summary.
- **Seen in**: Linear new issue, Stripe product creation.

## Empty first-use states
- **Pattern**: explain the value in one line, one primary action, optionally sample data or a template to start from.
- **Seen in**: Notion templates, Linear onboarding, Stripe test mode data.

## Activity / audit history
- **Pattern**: vertical timeline grouped by day; each entry shows who, what changed (before → after), why (reason or linked request), and a revert action where safe.
- **Seen in**: GitHub timeline, Stripe events, Vercel deployments.

## Inline editing
- **Pattern**: click a value to edit in place, save on Enter or blur, Escape cancels; for bulk edits a spreadsheet-like grid.
- **Seen in**: Notion, Airtable, Linear issue properties.
