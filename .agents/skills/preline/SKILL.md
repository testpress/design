---
name: preline
description: Use when the user requests UI design, layout, or components, or explicitly mentions Preline or Preline blocks.
---

# Preline UI Agent Skill

You are implementing UI designs using the **Preline** component library.

## Progressive Disclosure Reference
Do not invent or hallucinate Tailwind implementations from scratch. A comprehensive library of official Preline HTML templates exists locally on this machine at:
`.agents/preline-reference/templates/`

This library contains complete HTML files organized by category (e.g., `dashboards/`, `ecommerce/`, `websites/`, `ai/`).

### How to use the reference library:
1. **Identify the Pattern:** Determine what UI pattern the user needs (e.g., "login page", "admin sidebar", "pricing table").
2. **Search the Library:** Before writing *any* code, use `find .agents/preline-reference/templates/` or `grep_search` to locate the HTML file that most closely matches the requested pattern.
3. **Inspect the HTML:** Read the located HTML file using your file viewing tools. Find the specific component node you need within the file.
4. **Extract and Reuse:** Copy the exact HTML structure, Tailwind classes, and logic from the reference file rather than inventing it from scratch.

## Implementation Guidelines

### Adaptation
Adapt the extracted HTML to the project's specific requirements. Change the text, imagery, links, and data to match the user's domain, but **keep the structural Tailwind classes intact**.

### Preserving Attributes
Preline relies on specific JavaScript data attributes (e.g., `data-hs-overlay`, `data-hs-tab`, `aria-controls`). You **must** preserve these attributes exactly as they appear in the reference HTML, or the interactive components will break.

### Assets and Dependencies
If the reference HTML includes placeholder images or SVGs, update the image paths to valid assets in the current project or replace them with appropriate SVGs. Ensure that any required Preline JS plugins are properly imported or initialized in the project if you are adding new interactive components.

### Fallback Behavior
1. **Primary Rule:** Never invent a custom UI component if an appropriate Preline implementation exists in the reference library.
2. **Fallback Rule:** If, after thorough searching, no suitable Preline pattern exists for a very specific requested feature, you may fall back to building a custom implementation using standard Tailwind CSS classes.

## Completion Criteria
You are done when:
1. The requested UI has been built in the project.
2. The implementation leverages actual Preline reference HTML where applicable.
3. All required Preline `data-*` and `aria-*` attributes have been preserved.
