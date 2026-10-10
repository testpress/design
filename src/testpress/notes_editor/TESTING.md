---
layout: layouts/testpress_doc.html
title: Notes editor - integration test checklist
slug: notes-editor-testing
tags: testpress
date: 2000-10-02
new_student_page: true
student_view: Notes editor (TipTap)
permalink: /testpress/notes_editor/testing/
---

# Notes editor: integration test checklist

The [notes editor prototype](../) is frontend-only. It keeps notes in `localStorage` and fakes saving and sharing. Use this list when it is wired to the Testpress Python backend. Section A is what the backend must supply. The other sections are things to re-verify in the real UI.

## A. Backend and data requirements (faked in the prototype)

**Notes**

- [ ] Create, read, update and delete (move to trash) a note, per user.
- [ ] Autosave is debounced, runs in the background, and never loses text typed while a save is in flight.
- [ ] Saves survive offline or a failed request. Show "Saving...", "Saved" and "Couldn't save" states and retry.
- [ ] Concurrent edits in two tabs: define conflict behaviour. The prototype has none.
- [ ] Note content is stored as TipTap JSON or HTML. Decide which, and sanitise it server-side.
- [ ] Round-trip fidelity: headings, lists, tasks, quote, code, divider, callout, toggle, table, bold, italic, highlight, strike, inline code and links all reload exactly as saved.
- [ ] The title is the first line of the note. The list shows the title plus a preview.
- [ ] Recency ordering and the date groups (Today, Yesterday, Previous 7 days, months) use server time and the user's timezone, not the browser clock.
- [ ] Trash and undo: deleted notes can be restored. Decide retention and permanent deletion. Bulk delete must be one call.

**Folders and tags**

- [ ] A note has at most one folder and any number of tags.
- [ ] Create, rename and delete a folder. Deleting a folder keeps its notes and leaves them unfiled.
- [ ] Rename and delete a tag (removes it from all notes).
- [ ] Folder and tag names: uniqueness, case rules, length, trimming and character cleaning (the prototype strips `#` and extra spaces).
- [ ] Pinned folders are stored per user, with a maximum (`MAX_PINNED_FOLDERS`), enforced on the server too.
- [ ] Note counts per folder and per tag are correct and update after every change.
- [ ] Recent-folders ordering is stable and per user.

**Shared with me (read-only)**

- [ ] A list of notes shared with the user, with sharer name, role and date.
- [ ] Shared notes are read-only, and the server rejects writes.
- [ ] Sharing permissions and revocation: what happens if access is removed while the note is open.
- [ ] Folder and tag filters behave sensibly in the Shared space.

**Search**

- [ ] Server-side search covers title and body, ranks results, handles large libraries, and respects the folder and tag filters.
- [ ] The tag filter's any-of / all-of mode is stored per user, or is session-only by design.

**General**

- [ ] Auth, CSRF and permissions: users only ever see their own notes.
- [ ] Rate limits and size limits (note size, table size, number of notes).
- [ ] Per-user preferences, if you want them kept: layout stage (1/2/3), nav collapsed, sort order.
- [ ] Analytics and audit events, if required.

## B. Integration with the real Testpress page

- [ ] The real layout loads Tailwind 3.4 and the primary colour CSS variables. The editor uses `primary-*` colours, so check they resolve in every institute theme.
- [ ] `js/notes-editor.js` is a committed build artifact. Rebuild it in your pipeline and check cache-busting.
- [ ] The Tailwind `content` globs include every file that holds class strings (`src/**/*.{html,js}`). The editor's JS builds classes dynamically, so a missing glob means missing styles.
- [ ] Class names are written to also work on Tailwind 4. If Testpress upgrades, check stacked variants and the `!` important prefix (used in two places).
- [ ] Z-index stacking against Testpress's header, sidebar, modals and toasts. Popovers use z-45 to z-98.
- [ ] Page height: the editor assumes a 3.75rem header (`h-[calc(100dvh-3.75rem)]`). Check the real header height.
- [ ] The "prototype panel" (simulated shortcuts and the help beaker button) must be removed in production.
- [ ] The Lucide icons load, including after dynamic re-renders.
- [ ] The Content Security Policy allows the bundle, with no inline-script reliance.
- [ ] Localisation: all strings are English-only and need an i18n pass. Check RTL (logical `ps-`/`pe-` classes help but are untested).
- [ ] Browser support list: confirm `:has()`, `dvh` and similar features work on your minimum browsers.

## C. Editor behaviour to re-test

**Title and focus**

- [ ] Tab or Enter from the title moves the cursor into the body.
- [ ] The title can't be turned into another block type, and the document always keeps a title and a trailing paragraph.
- [ ] Placeholders show in the empty title and empty lines.
- [ ] Focus is never lost after menus, popovers, undo or list changes.

**Slash menu**

- [ ] `/` opens the menu. Filtering by typing works, including keywords.
- [ ] Up/down moves the highlight and scrolls it into view, Enter inserts, Esc closes.
- [ ] Page scroll is locked while the menu is open.
- [ ] The menu stays in the viewport and flips or clamps near the bottom of the screen.
- [ ] The preview card shows the right sample for every block, in light and dark mode.
- [ ] Every block inserts correctly: text, H1-H3, bullet, numbered, checklist, quote, code, divider, callout, toggle, table, and the advanced blocks.
- [ ] There are no "undefined" labels or empty groups.
- [ ] No matching blocks shows the empty state and the "Close menu" footer.

**Bubble menu (desktop)**

- [ ] It appears on text selection with Bold, Italic, Highlight, Link and More all visible, not only after a change.
- [ ] "Turn into" opens a panel, and flips above the toolbar when there's no room below.
- [ ] It does not appear for table cell or row/column selections.
- [ ] The link field accepts a URL with or without a scheme, and Apply and Remove link both work.
- [ ] Arrow-key navigation works inside the bar and its menus.

**Formatting and shortcuts**

- [ ] Bold, italic, strike, code, highlight and link work by keyboard and by button.
- [ ] Markdown shortcuts work: `#`, `-`, `1.`, `[]`, `>`, three backticks, `---`.
- [ ] Task checkboxes toggle with click and keyboard and show the strike-through style.
- [ ] Nested lists and tasks indent and outdent correctly.
- [ ] Undo and redo work across every block type and across table operations.
- [ ] Paste: plain text, rich text from the web, links, tables from Sheets or Excel, and images (decide whether images are supported).

**Tables**

- [ ] Insert a table. The default is 3x3 with a header row.
- [ ] The row and column grips appear on hover only, with the thin strips as designed.
- [ ] Add row and add column strips appear near the edge and add at the correct position.
- [ ] Click a grip for the menu: insert before/after, delete, move, header toggle. Delete is clearly marked as dangerous.
- [ ] Multi-select rows or columns and delete, using drag selection, Shift+arrows or Shift-click.
- [ ] Drag a grip to reorder. A ghost and a drop line show, and the order changes on drop.
- [ ] Keyboard-only: delete row, delete column, insert row below, plus the F10 menu route. Shortcut hints are visible in the menu and the help text.
- [ ] The last remaining row or column can't be deleted by accident.
- [ ] A wide table scrolls horizontally with a visible scrollbar, and the cursor over the scrollbar is a pointer rather than a text cursor.
- [ ] The strips don't grow outside the scroll area.
- [ ] The active-cell outline and selected-cell tint show correctly.
- [ ] Tables are not editable in the shared read-only view.

**Callout and toggle**

- [ ] The callout wraps and nests content, and works in dark mode.
- [ ] The toggle opens and closes, remembers its state, and nested content works.

**Read-only mode**

- [ ] The caret is hidden. Text can still be selected and copied. Links open.
- [ ] No bubble menu, slash menu, table controls or format bar appear.

**Keyboard help**

- [ ] The shortcut sheet is readable and its shortcuts are correct on Mac and on Windows/Linux.
- [ ] Mac and Windows modifiers display correctly (Cmd or Ctrl).

## D. Library, nav and list

**Layouts**

- [ ] Stage 1 (nav + list + editor), stage 2 (list + editor) and stage 3 (full-width editor) all work.
- [ ] Collapsing the nav keeps the "New note" button on one line.
- [ ] The layout choice persists, and the correct default applies on first visit.
- [ ] The page lands in the correct view when opened from a deep link or a reload.
- [ ] Resizing across the 1024px phone/desktop breakpoint doesn't break state.

**Nav pane**

- [ ] "My Notes" and "Shared with Me" switch spaces. The switcher also works when the nav is collapsed.
- [ ] Folders show pinned plus recent entries, a limited count, and an "All folders" entry.
- [ ] The folder list doesn't jump or reorder when you click a folder, rename, pin or delete (this bug was fixed three times).
- [ ] The pane doesn't scroll to the top after renaming a folder from inside it.
- [ ] The hover state doesn't cause a jerk, and hover icons appear on hover.
- [ ] Tags show in two columns, with a "..." menu for all tags.
- [ ] The all/any switch shows only when two or more tags are selected, and aligns on one row.
- [ ] You can search folders while the nav is expanded.

**Folder and tag popovers**

- [ ] The "All folders" and "Tags" dropdowns open from the filter bar, and from the nav "..." and the "+".
- [ ] Type-ahead filters and highlights. The first tag is not highlighted unless it is selected.
- [ ] The tags popover shows checkboxes and counts. "Create" appears for a new name.
- [ ] Rename with F2 or the pencil, pin with Alt+P or the pin icon, and delete with Del or the trash icon.
- [ ] Delete shows the inline confirmation card with a correct message and note count, and Cancel and Delete both work.
- [ ] Pin limit message: "You can pin up to N folders".
- [ ] The popover stays anchored after a re-render and doesn't jump.
- [ ] Clicking outside closes it. Esc closes only the popover and not the whole editor.

**Note list**

- [ ] Grouping by date and the Modified / Created sort both work.
- [ ] Select mode: multi-select, select all and bulk delete, with an Undo toast.
- [ ] A note row's delete button and the delete warning show correctly.
- [ ] Empty states: no notes, no results, empty trash, and no folders or tags yet.
- [ ] The status dot shows saved, saving or error.
- [ ] The count text is correct and pluralised.
- [ ] Search highlights, debounces, clears with Esc, and focuses with Cmd+K.
- [ ] Filter by folder and by tag at the same time (folder AND tags). Tag mode any or all gives the right results.

**Meta line (under the title)**

- [ ] Empty notes show a faint "Add folder or tags" that appears on hover or focus.
- [ ] A folder chip and tag chips are shown. The tag "x" removes a tag and appears on hover.
- [ ] Adding a folder or tag from the popover updates the list row and nav counts straight away.
- [ ] Shared notes show "Shared by ... - role - date" and a Read-only pill, with no editing controls.

## E. Mobile and touch (needs real iOS and Android devices)

The prototype was only tested with browser emulation.

- [ ] iOS Safari and Android Chrome: the soft keyboard doesn't cover the format bar. The bar tracks `visualViewport`.
- [ ] The format bar and block tray ("Aa") work. Active-state buttons show correctly.
- [ ] Tapping places the caret without scrolling the page unexpectedly.
- [ ] Tap targets are at least 44px.
- [ ] Selecting text shows the mobile selection bar (Turn into, Link and others), not the desktop bubble.
- [ ] The link row accepts input, and the 16px input font prevents iOS zoom.
- [ ] The Notes back button, the list/editor transition and the browser Back gesture work. A swipe-back doesn't lose edits.
- [ ] Long-press, text selection handles and the native context menu don't clash with the app's controls.
- [ ] Table controls are intentionally hidden on phones. Confirm tables can still be read, scrolled and edited by typing.
- [ ] Drag and drop and hover-only features have a touch alternative, or are consciously dropped.
- [ ] The slash menu on mobile: width, scroll and no preview card (the preview is hidden under 1024px).
- [ ] The virtual-keyboard shortcut toggle works. Hardware keyboard shortcuts work on iPad.
- [ ] Safe areas and notch handling, landscape orientation and 100dvh behaviour.
- [ ] IME and composition input (Hindi, Tamil, Japanese and others): the slash menu, markdown shortcuts and title Tab/Enter must not break while composing. The prototype couldn't test this.
- [ ] Autocorrect, autocapitalisation and spellcheck behave sensibly. Spellcheck is on in the editor.

## F. Accessibility

- [ ] Everything works with keyboard only: nav, list, editor, popovers, tables and bulk select.
- [ ] Visible focus rings everywhere, and logical tab order (title to body).
- [ ] Screen reader roles and labels: listbox/option for the slash menu and popovers, `aria-activedescendant`, `aria-expanded`, `aria-pressed`, a labelled editor ("Note editor"), and the dialogs.
- [ ] Live-region announcements for save state, undo toasts and menu results.
- [ ] Colour contrast in light and dark mode for muted text such as placeholders, the meta line, hints and disabled buttons. Several greys are quite light.
- [ ] `prefers-reduced-motion` is respected.
- [ ] Zoom to 200% and large text don't break the layout.
- [ ] Focus is restored to the right place after a popover, a dialog or a delete.

## G. Visual and theming

- [ ] Light and dark mode for every surface: editor, nav, list, popovers, tables, callout, code block, highlight, chips, the preview card, and the mobile bar and tray.
- [ ] Dark mode with the real Testpress theme switch (the prototype toggles the `dark` class on `<html>`).
- [ ] Each institute colour theme: primary-50 to primary-900 are used for accents, selection and active states.
- [ ] Long text: very long titles, folder names, tag names, words without spaces and long links wrap or truncate cleanly.
- [ ] Large content: hundreds of notes, a 50x20 table, long documents. Check scroll performance and render time.
- [ ] Empty and first-run experience, with a seed or onboarding note decided.
- [ ] Print layout, if needed.

## H. Security and robustness

- [ ] Paste and HTML import sanitisation (XSS) on both client and server.
- [ ] Link handling: only allowed protocols, and `rel="noopener"` where links open.
- [ ] Authorisation on every note, folder and tag endpoint.
- [ ] Errors from the server (401, 403, 404, 413, 429, 5xx) show clear messages rather than silent loss.
- [ ] Session expiry mid-edit keeps the unsaved text and prompts for sign-in.
- [ ] Data preservation: refresh, close tab, crash and offline must not lose typed text. Test the "leave page" warnings and the leave dialog.

## I. Known gaps and decisions to settle before integration

- Images and attachments in notes are not built.
- Real sharing, comments and collaboration aren't built. Shared notes in the prototype are fixed seed data.
- No real conflict resolution or multi-device sync.
- The simulated panels (`sim-shortcuts` and the prototype panel) must be removed.
- Search is a client-side substring match over local data.
- The pin limit, trash retention and tag and folder naming rules need product decisions.
- iOS and Android behaviour and IME input are untested on real hardware.
- Not checked after the Tailwind conversion: dark mode on the mobile "Turn into" menu and the slash-menu sample blocks (checklist, callout, toggle, table), plus small leftover mobile screenshot shifts.
