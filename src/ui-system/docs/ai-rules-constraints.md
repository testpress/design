## Purpose

This document defines the non-negotiable rules for AI-assisted UI generation. Its purpose is to ensure frontend interfaces remain consistent, reusable, responsive, and maintainable across pages and projects.

AI must behave as a **frontend assembler**, not a creative designer.


---

## Core Principles

### Reuse Before Creation

AI must always reuse approved components and page patterns before introducing new UI structures.

Approved UI will be in ui system/components and ui system/patterns

### Consistency Over Creativity

AI must prioritize consistency across pages over visual experimentation or redesign.

### Composition Over Reinvention

AI must compose pages using approved building blocks rather than generating custom UI from scratch.

### Predictability Over Complexity

Generated UI must remain easy to understand, maintain, debug, and extend.


---

## Allowed Technologies

AI-generated UI must only use approved technologies.

### Styling

* Preline CSS utilities
* Approved Tailwind utility classes

### Interactions

* Alpine.js only

### Icons

* Lucide icons only

### Templates

* Reusable Django template includes


---

## Non-Negotiable Rules


 1. AI must only use approved reusable components.
 2. AI must not generate raw UI if an approved reusable component exists.
 3. AI must not introduce custom CSS unless explicitly approved.
 4. AI must not introduce unapproved layout structures.
 5. AI must not redesign approved components.
 6. AI must support responsive behavior by default.
 7. AI must support dark mode compatibility by default.
 8. AI must follow approved page patterns where applicable.
 9. AI must maintain consistency across similar page types.
10. AI must prioritize maintainability over visual complexity.


---

## Component Usage Rules

### Reuse Hierarchy

AI must follow the below priority order:


1. Existing page pattern
2. Existing reusable component
3. Approved UI variation
4. New component request

AI must not skip hierarchy.

### Parameter vs New Component Rule

AI must use parameters when:

* text changes
* icon changes
* button state changes
* content changes
* small visual variations exist

AI must request a new component when:

* layout changes
* structure changes
* interaction behavior changes
* repeated UI pattern emerges

### Missing Component Rule

If no approved component exists:

AI must return:

> New component required

AI must not invent new reusable UI patterns.


---

## Page Composition Rules

### Standardized Layouts

AI must use approved page structures for:

* List pages
* Detail pages
* Analytics pages
* Settings pages
* Form pages
* Dashboard pages
* Authentication pages

### Consistency Rule

Pages with similar intent must follow similar structure and interaction patterns.

Example:

* Similar tables must use same table pattern
* Similar forms must use same spacing and layout
* Similar filters must follow same interaction flow

### CTA Rule

Only one primary action should exist per major section.

Secondary actions must use lower emphasis.


---

## Interaction Rules

### Allowed Interaction Method

AI must use Alpine.js for UI interactions.

### Approved Interaction Types

AI may implement:

* Dropdowns
* Tabs
* Accordions
* Modals
* Password visibility toggle
* Sidebar expand/collapse
* Inline state toggles

### Prohibited Interaction Behavior

AI must not:

* introduce complex custom JavaScript
* introduce unapproved libraries
* duplicate interaction logic
* create inconsistent interaction behavior


---

## Responsive Rules

AI-generated UI must support:

* Desktop
* Tablet
* Mobile

### Responsive Expectations

* Tables must degrade gracefully on smaller screens.
* Forms must remain usable on mobile devices.
* Cards and grids must stack appropriately.
* Actions must remain discoverable across breakpoints.

AI must not generate desktop-only layouts.


---

## Accessibility Rules

AI-generated UI must:

* maintain readable spacing and hierarchy
* preserve clear interaction states
* ensure form inputs have labels
* maintain keyboard-friendly interaction patterns
* preserve visual clarity across themes


---

## AI Output Standards

Generated output must:

* be reusable
* be readable
* be maintainable
* minimize manual redesign effort
* follow approved frontend conventions

Generated UI should feel production-ready with minimal refinement.


---

## Prohibited Behaviors

AI must not:

* invent random UI layouts
* introduce inconsistent spacing
* mix multiple visual styles
* use inline SVG icons
* introduce unapproved libraries
* generate duplicate reusable components
* prioritize aesthetics over consistency
* redesign existing approved UI patterns


---

## Review Checklist

Before approval, generated UI must pass:

* Approved reusable components used
* Responsive behavior verified
* Dark mode verified
* Approved interaction patterns followed
* No unapproved custom CSS
* Consistent spacing and layout
* Reusable structure maintained
* Similar pages follow similar patterns


---

## Good vs Bad Examples

### Good

* Reuses approved components
* Follows existing page patterns
* Maintains spacing consistency
* Requires minimal manual correction
* Supports responsiveness by default

### Bad

* Introduces new UI unnecessarily
* Uses inconsistent layouts
* Mixes multiple design approaches
* Requires redesign after generation
* Ignores approved frontend standards

