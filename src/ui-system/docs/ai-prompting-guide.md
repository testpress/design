# How to Ask AI to Design Pages

Open Claude Code in this repo and type `/design` (or just say hi). The `design` skill in `.claude/skills/design/` runs the whole flow and asks you for what it needs:

1. **Problem** (required): interview notes, a ticket, a complaint. Rough is fine.
2. **Drafts** (optional): a PRD or UX doc. Claude reviews them against the problem instead of accepting them as-is.
3. Claude locks the problem, researches how leading products solve this kind of problem, proposes approaches, maps the screens, then designs **one screen per PR**, each with its own UX doc.

You approve ("lock") each stage before the next one starts. Progress is saved in `docs/design/<product>/<feature>/`, so any session can continue a feature where it left off.

## What you don't need to say

Spacing, typography, colors, dark mode, responsiveness, component reuse and states are covered by the skill's standards:

- `.claude/skills/design/principles.md`: what good design is
- `.claude/skills/design/tokens.md`: the exact classes
- `.claude/skills/design/patterns.md`: modern solutions per problem type
- `.claude/skills/design/review-checklist.md`: the gate before a screen is shown

If you find yourself repeating an instruction in prompts, add it to one of those files instead.

## Small changes

For a small, explicit change ("make this button secondary", "add a status column"), just ask directly. The standards still apply.
