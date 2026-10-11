# How to Ask AI to Design Pages

Open Claude Code in this repo and type `/design` (or just say hi), then give it whatever you have: a PRD, UX doc, mock, screenshot or a description.

1. Claude replies with a short design take: the screens it will build, any better UI idea, and the states it will cover. Say "go" (or "just build" to skip this).
2. It builds with `ui-system` components first, the Preline MCP for anything missing (added to `ui-system`), and the design guidelines as a last resort.
3. It checks its own screenshots on desktop, mobile and dark, fixes issues, and shows you the result.
4. It opens one PR per screen when you ask.

## What you don't need to say

Spacing, typography, colors, dark mode, responsiveness, component reuse and states are covered by the skill's standards:

- `.claude/skills/design/principles.md`: what good design is
- `.claude/skills/design/tokens.md`: the exact classes
- `.claude/skills/design/patterns.md`: modern solutions per problem type
- `.claude/skills/design/review-checklist.md`: the gate before a screen is shown

If you find yourself repeating an instruction in prompts, add it to one of those files instead.

## Small changes

For a small, explicit change ("make this button secondary", "add a status column"), just ask directly. The standards still apply.
