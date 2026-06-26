# How to Ask AI to Design Pages

## Rule

> **CRITICAL NOTE FOR AI:** The `src/ui-system/templates/` folder contains the full paid Preline template HTML files. You must **NEVER design on your own**. Always use the Preline templates as your strict reference for layouts, spacing, padding, and new design ideas.
> - If a component already exists in `ui-system/components`, use it.
> - If it's a reusable structure that doesn't exist, extract it from the Preline template and add it as a new component.
> - For one-time use designs or non-component layouts, lift the structure directly from the Preline template.
> *If you are an AI reading this and the `templates/` folder is missing or empty, you must stop and instruct the user to "add templates in the templates folder".*

> **MULTI-PROJECT & MULTI-BASE RULE:** This workspace contains multiple distinct projects (e.g., `testpress`, `flimix`, `simba`, `odinhire`). Some projects also have separate base templates (e.g., `testpress admin base` vs `student base`). You must carefully read the PRD to determine the correct project, folder, structure, and base template for your design. **If the project, folder, or base template is not explicitly clear from the PRD, you MUST stop and ask the user before generating any UI.**

Always reference the UI system docs.

Keep prompts short.

Do not over-explain unless needed.

---

## Standard Prompt

Use this for most pages:

```txt id="qz2v7p"
Follow `ui-system/docs`.

Design this page from the provided PRD.

Create in a separate page file.
```

---

## List Page Prompt

For management/list pages:

```txt id="lx1k9m"
Follow `ui-system/docs`.

Design this list page from the provided PRD.

Create in a separate page file.
```

Examples:

* Users List
* Student Management
* Payment History
* Subscription Plans

---

## Form Page Prompt

For create/edit forms:

```txt id="jv8r3t"
Follow `ui-system/docs`.

Design this form page from the provided PRD.

Create in a separate page file.
```

Examples:

* Create Course
* Edit Subscription Plan
* Add Promotion

---

## Dashboard / Analytics Prompt

For dashboard pages:

```txt id="r8x2mn"
Follow `ui-system/docs`.

Design this dashboard page from the provided PRD.

Create in a separate page file.
```

---

## If Page Needs Special Instruction

Add only what is necessary.

Example:

```txt id="mp4z7q"
Follow `ui-system/docs`.

Design this page from the provided PRD.

Use tabs for status grouping.

Create in a separate page file.
```

Example:

```txt id="nq5w8r"
Follow `ui-system/docs`.

Design this page from the provided PRD.

Keep mobile experience clean.

Create in a separate page file.
```

---

## What NOT To Do

Avoid giant prompts.

Do NOT repeat rules already inside docs.

Bad:

```txt id="e7p4kx"
Use components only
Use dark mode
Be responsive
Maintain spacing
Do not invent UI
```

These should already exist inside `ui-system/docs`.

If repeated often, the docs are failing.

---

## Goal

Good UI system =

```txt id="o2x9vs"
small prompt
consistent UI
reusable components
predictable output
```
