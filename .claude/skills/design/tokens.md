# Design tokens

The exact classes behind [principles.md](principles.md). Pick from these; a value not listed here needs a reason. They follow what `src/ui-system/components/` already uses, and every class here works in both Tailwind v3.4 (root `css/tailwind.css`) and v4 (product CSS).

## Spacing

Scale: `1` `1.5` `2` `3` `4` `5` `6` `8` `10` `12` `16` (4px to 64px). Use these steps for padding, margin and gap.

| Use | Class |
| --- | --- |
| Icon ↔ text, inside badges and buttons | `gap-1.5` / `gap-2` |
| Label ↔ field, title ↔ its description | `mb-2` / `mt-1` |
| Between fields in a group, between rows of related items | `space-y-4` / `gap-4` |
| Between groups or cards on a page | `space-y-6` / `gap-6` |
| Between major page regions, between form sections | `space-y-8` / `gap-8` (with a divider or heading) |
| Card padding | `p-5` (dense lists `p-4`, roomy hero/summary `p-6`) |
| Modal body / header / footer | `p-4 sm:p-5`, footer `gap-2` right-aligned |
| Table cell | `px-4 py-3` (first column `ps-5`) |

## Page containers

| Page type | Container |
| --- | --- |
| List, dashboard, analytics | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6` |
| Detail | `max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6` |
| Form, settings | `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8` |
| Auth, single-task | `max-w-sm mx-auto` centered |
| Split view (list + detail) | full height; list `w-full md:w-80 lg:w-96 shrink-0 border-e`, detail `flex-1 min-w-0 overflow-y-auto` |
| Long text | `max-w-prose` |

## Type

| Role | Class |
| --- | --- |
| Page title | `text-xl font-semibold text-gray-800 dark:text-white` |
| Section / card title | `text-base font-semibold text-gray-800 dark:text-white` (top-level card: `text-lg`) |
| Body, table content, values | `text-sm text-gray-800 dark:text-neutral-200` |
| Secondary (descriptions, supporting facts) | `text-sm text-gray-500 dark:text-neutral-400` |
| Muted (metadata, timestamps, help text) | `text-xs text-gray-500 dark:text-neutral-500` |
| Field label | `text-sm font-medium text-gray-800 dark:text-neutral-200` |
| Table header | `text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-500` |
| Big stat number | `text-2xl font-semibold text-gray-800 dark:text-white tabular-nums` |
| Numbers in tables | `tabular-nums text-end` |

Weights: `font-normal`, `font-medium`, `font-semibold`. Nothing bolder outside marketing pages.

## Color

| Role | Light | Dark |
| --- | --- | --- |
| Page background | `bg-gray-50` or `bg-white` (follow the layout) | `dark:bg-neutral-900` |
| Surface (card, panel, modal) | `bg-white` | `dark:bg-neutral-800` |
| Subtle surface (hover row, inset area, selected list item) | `bg-gray-50` / `bg-gray-100` | `dark:bg-neutral-700/50` / `dark:bg-neutral-700` |
| Border | `border-gray-200` | `dark:border-neutral-700` |
| Divider inside a surface | `divide-gray-200` | `dark:divide-neutral-700` |
| Primary action, selection, focus | `bg-primary-600 hover:bg-primary-700`, `text-primary-600`, `ring-primary-500` | `dark:text-primary-500` |

Status (badge component variants use these):

| Meaning | Background + text | Dark |
| --- | --- | --- |
| Success | `bg-green-100 text-green-800` | `dark:bg-green-500/10 dark:text-green-400` |
| Warning | `bg-orange-100 text-orange-800` | `dark:bg-orange-500/10 dark:text-orange-400` |
| Danger | `bg-red-100 text-red-800` | `dark:bg-red-500/10 dark:text-red-400` |
| Info | `bg-blue-100 text-blue-800` | `dark:bg-blue-500/10 dark:text-blue-400` |
| Neutral | `bg-gray-100 text-gray-800` | `dark:bg-neutral-700 dark:text-neutral-200` |

## Shape and depth

| Use | Class |
| --- | --- |
| Controls (buttons, inputs, selects) | `rounded-lg` |
| Cards, panels, modals | `rounded-xl` |
| Badges, avatars, toggles | `rounded-full` |
| Content card on the page | border only, no shadow |
| Raised but in flow (sticky bar, selected card) | `shadow-sm` |
| Dropdowns, popovers, toasts | `shadow-lg` |
| Modals, drawers | `shadow-xl` |

## Icons

Lucide: `<i data-lucide="name" class="size-4 shrink-0"></i>`. `size-3.5` in small controls, `size-4` default, `size-5` in headers, `size-10` with a subtle tinted circle for empty states.

## Breakpoints

Design mobile first: base = phone, `sm` 640, `md` 768 (tablet), `lg` 1024 (desktop layout starts), `xl` 1280.

## Tailwind v3/v4 traps

Pages on the root `css/tailwind.css` (see `CLAUDE.md`) only understand v3.4. Use the left column:

| Write | Not (v4-only) |
| --- | --- |
| `focus:outline-none` + `focus:ring-2` | `focus:outline-hidden` |
| `shadow-sm` | `shadow-2xs`, `shadow-xs` |
| `start-0`, `end-0`, `ps-*`, `pe-*` | `inset-s-*`, `inset-e-*` |
| `bg-gradient-to-r` | `bg-linear-to-r` |
