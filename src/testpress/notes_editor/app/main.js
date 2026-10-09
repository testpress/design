import { NotesStore } from './store.js'
import { refreshIcons } from './icons.js'
import { createTableUI } from './table-ui.js'
import { CellSelection } from '@tiptap/pm/tables'
import { SaveQueue, serverSim } from './save-queue.js'
import { createNotesEditor, stateForDoc } from './editor.js'
import { BLOCKS, DIVIDER, TABLE, turnInto, insertDivider, insertTable, currentBlockLabel, applyLink, MARKS, indentList, inList } from './blocks.js'
import { TextSelection, Selection } from '@tiptap/pm/state'

const $ = (sel, root = document) => root.querySelector(sel)
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const icon = (name, cls = 'size-4') => `<i data-lucide="${name}" class="${cls}"></i>`
const mq = window.matchMedia('(max-width: 1023px)')
const isMobile = () => mq.matches
const isMac = /Mac|iPhone|iPad/.test(navigator.platform)
const MOD = isMac ? '⌘' : 'Ctrl+'

// ---------------------------------------------------------------------------------------------
const app = $('#notes-app')
const listEl = $('#notes-list')
const searchEl = $('#notes-search')
const statusEl = $('#save-status')
const strip = $('#save-strip')
const bubbleEl = $('#bubble-menu')
const mbar = $('#mobile-bar')

const store = new NotesStore()
let currentId = null
let order = []
let sortStamp = new Map()
let query = ''
let editorFocused = false
const stateCache = new Map()
let savedFlash = null

const queue = new SaveQueue(store, (id, state) => {
  if (id === currentId) renderStatus()
  renderRowStatus(id)
})

// ---- List ------------------------------------------------------------------------------------
function reorder() {
  order = store.all().map((n) => n.id)
  sortStamp = new Map(order.map((id) => [id, store.get(id).updatedAt]))
}

function relTime(ts) {
  const d = Date.now() - ts
  if (d < 60e3) return 'Now'
  const t = new Date(ts)
  const today = new Date()
  const yest = new Date(today.getTime() - 864e5)
  if (t.toDateString() === today.toDateString()) return t.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase()
  if (d < 7 * 864e5) return t.toLocaleDateString([], { weekday: 'short' })
  return t.toLocaleDateString([], { day: 'numeric', month: 'short' })
}

function groupLabel(ts) {
  const t = new Date(ts)
  const today = new Date()
  const yest = new Date(today.getTime() - 864e5)
  if (t.toDateString() === today.toDateString()) return 'Today'
  if (t.toDateString() === yest.toDateString()) return 'Yesterday'
  if (today - t < 8 * 864e5) return 'Previous 7 days'
  return t.toLocaleDateString([], { month: 'long', year: today.getFullYear() === t.getFullYear() ? undefined : 'numeric' })
}

function highlight(text, q) {
  if (!q) return esc(text)
  const i = text.toLowerCase().indexOf(q)
  if (i < 0) return esc(text)
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length))
}

function rowHTML(n) {
  const active = n.id === currentId
  const st = queue.stateOf(n.id)
  const warn = st === 'error' ? `<span class="row-warn" title="Not saved yet">${icon('alert-triangle', 'size-3')}</span>` : ''
  const sub = [n.folder, n.snippet].filter(Boolean).join(' · ')
  return `<button type="button" role="option" aria-selected="${active}" data-id="${n.id}" class="note-row ${active ? 'is-active' : ''}">
    <span class="note-row__top"><span class="note-row__title ${n.derived ? 'is-derived' : ''}">${highlight(n.title, query)}</span>${warn}<span class="note-row__time">${relTime(n.updatedAt)}</span></span>
    <span class="note-row__sub">${highlight(sub, query)}</span></button>`
}

function renderList() {
  const ids = order.filter((id) => store.get(id) && (!query || store.get(id).title.toLowerCase().includes(query) || store.get(id).text.includes(query)))
  $('#notes-count').textContent = store.notes.size
  if (!ids.length) {
    listEl.innerHTML = query
      ? `<div class="list-empty"><p class="font-medium text-gray-800">No notes match “${esc(query)}”</p><p class="text-gray-500">Search covers titles and note text.</p></div>`
      : `<div class="list-empty"><p class="font-medium text-gray-800">No notes yet</p><p class="text-gray-500">Start one with “New note”.</p></div>`
    return
  }
  let html = ''
  let last = ''
  ids.forEach((id) => {
    const n = store.get(id)
    const g = groupLabel(sortStamp.get(id) ?? n.updatedAt)
    if (g !== last) {
      html += `<div class="list-group" role="presentation">${g}</div>`
      last = g
    }
    html += rowHTML(n)
  })
  const scroller = $('#notes-list-scroll')
  const top = scroller.scrollTop
  listEl.innerHTML = html
  scroller.scrollTop = top
  refreshIcons(listEl)
}

let rowRaf = 0
function renderRowStatus() {
  cancelAnimationFrame(rowRaf)
  rowRaf = requestAnimationFrame(renderList)
}

function focusActiveRow() {
  const row = listEl.querySelector('.note-row.is-active') || listEl.querySelector('.note-row')
  if (row) row.focus()
  else searchEl.focus()
}

// List is a keyboard-navigable listbox: arrows/Home/End move, Enter opens (native click),
// Right arrow or Escape go back to the editor, "/" or typing a letter jumps to search.
listEl.addEventListener('keydown', (e) => {
  const rows = [...listEl.querySelectorAll('.note-row')]
  const i = rows.indexOf(document.activeElement)
  if (i < 0) return
  if (e.key === 'ArrowUp' && i === 0) {
    e.preventDefault()
    searchEl.focus()
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    rows[Math.min(rows.length - 1, Math.max(0, i + (e.key === 'ArrowDown' ? 1 : -1)))].focus()
  } else if (e.key === 'Home' || e.key === 'End') {
    e.preventDefault()
    rows[e.key === 'Home' ? 0 : rows.length - 1].focus()
  } else if ((e.key === 'ArrowRight' || e.key === 'Escape') && !isMobile() && currentId) {
    e.preventDefault()
    editor.view.focus()
  } else if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
    e.preventDefault()
    searchEl.focus()
  }
})

searchEl.addEventListener('input', () => {
  query = searchEl.value.trim().toLowerCase()
  $('#search-clear').hidden = !query
  renderList()
})
$('#search-clear').addEventListener('click', () => {
  searchEl.value = ''
  searchEl.dispatchEvent(new Event('input'))
  searchEl.focus()
})
searchEl.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (searchEl.value) {
      searchEl.value = ''
      searchEl.dispatchEvent(new Event('input'))
    } else searchEl.blur()
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    listEl.querySelector('.note-row')?.focus()
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    listEl.querySelector('.note-row')?.click() // open the top result and move into the editor
  }
})

// ---- Save status -----------------------------------------------------------------------------
function renderStatus() {
  const st = currentId ? queue.stateOf(currentId) : 'idle'
  const text = { saving: 'Saving…', still: 'Still saving…', error: 'Not saved', idle: savedFlash === currentId ? 'Saved' : '' }[st]
  statusEl.dataset.state = st
  statusEl.innerHTML = text ? `<span class="status-dot"></span>${text}` : ''
  strip.hidden = st !== 'error'
}

store.onChange((id, kind) => {
  if (id === currentId && kind === 'saved' && !store.isDirty(id)) {
    savedFlash = id
    renderStatus()
  }
})
$('#save-retry').addEventListener('click', () => currentId && queue.retryNow(currentId))

// ---- Editor ----------------------------------------------------------------------------------
let tableUI = null // created right after the editor (callbacks can fire during editor setup)
const editor = createNotesEditor({
  element: $('#editor-mount'),
  bubbleEl,
  isMobile,
  getMeta: () => {
    const n = currentId && store.get(currentId)
    return n ? { id: n.id, folder: n.folder, tags: n.tags || [] } : null
  },
  shouldShowBubble: ({ editor: ed, view, state, from, to, element }) => {
    if (isMobile() || !ed.isEditable || !currentId) return false
    const sel = state.selection
    if (sel instanceof CellSelection) return false // selected cells get the table menus, not text formatting
    if (sel.empty || sel.$from.parent.type.name === 'title' || sel.$to.parent.type.name === 'title') return false
    if (!state.doc.textBetween(from, to, ' ').trim()) return false
    return view.hasFocus() || element.contains(document.activeElement)
  },
  onDocChange: (json) => {
    if (!currentId) return
    savedFlash = null
    store.setDoc(currentId, json)
    queue.schedule(currentId)
    renderStatus()
    renderRowStatus()
  },
  onSelection: () => {
    tableUI?.update()
    renderBubble()
    renderMobileBar()
  },
  onFocusChange: (f) => {
    editorFocused = f
    clearTimeout(focusTimer)
    focusTimer = setTimeout(renderMobileBar, f ? 0 : 140)
  },
  // Mod-Shift-L: link the current selection without touching the mouse.
  onLinkShortcut: () => {
    if (editor.state.selection.empty) return true
    if (isMobile()) {
      mobile.mode = 'link'
      renderMobileBar()
    } else {
      bubble.kbd = true
      setBubbleMode('link')
    }
    return true
  },
  // Escape with nothing to dismiss hands focus to the note list (desktop) so you can move between notes.
  onEscape: () => {
    if (isMobile()) return false
    focusActiveRow()
    return true
  },
})
let focusTimer = 0
tableUI = createTableUI({ editor, host: $('#notes-app'), scroller: $('#editor-scroll'), isMobile })
window.__notesEditor = editor // handy for debugging in the preview
window.__notesStore = store

function openNote(id, { focus = false, fromCreate = false } = {}) {
  if (id === currentId) {
    showEditorView()
    if (focus === 'resume' && !isMobile()) editor.view.focus()
    return
  }
  const leaving = currentId
  if (leaving) leaveCurrent()
  currentId = id
  const note = store.get(id)
  let st = stateCache.get(id)
  if (!st) {
    st = stateForDoc(editor, note.doc)
    // Continue where the student left off: first open puts the caret at the end of the note.
    if (!fromCreate) st = st.apply(st.tr.setSelection(Selection.atEnd(st.doc)))
  }
  editor.view.updateState(st)
  showEditorView()
  // New note: cursor lands in the title line, synchronously so the first keystroke is not lost.
  if (focus === true) {
    // (TipTap's focus() defers to rAF, which would drop a first keystroke typed immediately.)
    const { state, view } = editor
    view.dispatch(state.tr.setSelection(TextSelection.atStart(state.doc)))
    view.focus()
  } else if (focus === 'resume' && !isMobile()) editor.view.focus() // mobile stays in reading mode
  savedFlash = null
  reorderIfNeeded(leaving)
  renderList()
  renderStatus()
  renderBubble()
  renderMobileBar()
  $('#editor-scroll').scrollTop = 0
  history.replaceState(null, '', location.pathname + '#' + id)
}

function reorderIfNeeded() {
  reorder()
}

// Persist everything for the note we are leaving; never lose or cancel an in-flight save.
function leaveCurrent() {
  const id = currentId
  stateCache.set(id, editor.state)
  store.flushLocal(id)
  queue.flush(id)
  if (store.discardIfEmpty(id)) {
    stateCache.delete(id)
  }
}

// Leaving a note whose last save failed asks first. "Try again" retries and stays; only the
// explicit "Leave, keep on this device" proceeds (the unsaved edits stay stored locally).
async function guardedLeave() {
  if (!currentId || queue.stateOf(currentId) !== 'error') return true
  const choice = await askLeave()
  if (choice === 'retry') queue.retryNow(currentId)
  return choice === 'leave'
}

function newNote() {
  guardedLeave().then((ok) => {
    if (!ok) return
    const id = store.create()
    reorder()
    openNote(id, { focus: true, fromCreate: true })
  })
}
$('#new-note').addEventListener('click', newNote)
$('#new-note-m')?.addEventListener('click', newNote)

listEl.addEventListener('click', (e) => {
  const row = e.target.closest('[data-id]')
  if (!row) return
  if (row.dataset.id === currentId) return openNote(currentId, { focus: 'resume' })
  guardedLeave().then((ok) => ok && openNote(row.dataset.id, { focus: 'resume' }))
})

function showEditorView() {
  app.dataset.view = 'editor'
  $('#editor-empty').hidden = true
  $('#editor-body').hidden = false
}

$('#back-to-list').addEventListener('click', async () => {
  if (!(await guardedLeave())) return
  const id = currentId
  if (id) {
    leaveCurrent()
    currentId = null
    editorFocused = false
    reorder()
    app.dataset.view = 'list'
    renderList()
    renderMobileBar()
    renderStatus()
    $('#editor-empty').hidden = false
    $('#editor-body').hidden = true
    history.replaceState(null, '', location.pathname)
    // blank the editor so no stale content lingers
    editor.view.updateState(stateForDoc(editor, { type: 'doc', content: [{ type: 'title' }, { type: 'paragraph' }] }))
  }
})

// ---- Leave sheet (failed save) ---------------------------------------------------------------
const leaveDlg = $('#leave-dialog')
let leaveResolve = null
function askLeave() {
  leaveDlg.hidden = false
  $('[data-choice="retry"]', leaveDlg).focus()
  return new Promise((res) => (leaveResolve = res))
}
leaveDlg.addEventListener('click', (e) => {
  const b = e.target.closest('[data-choice]')
  if (!b || !leaveResolve) return
  leaveDlg.hidden = true
  const c = b.dataset.choice
  leaveResolve(c === 'retry' ? 'retry' : c === 'leave' ? 'leave' : 'stay')
  leaveResolve = null
})
leaveDlg.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') $('[data-choice="stay"]', leaveDlg).click()
})

// ---- Desktop bubble menu ---------------------------------------------------------------------
const bubble = { mode: 'main', kbd: false, focusAct: null, rendering: false }

function btn(act, ic, label, active = false, extra = '') {
  return `<button type="button" data-act="${act}" class="bm-btn ${active ? 'is-on' : ''}" aria-label="${label}" aria-pressed="${active}" ${extra}>${icon(ic)}</button>`
}

function renderBubble(force = false) {
  if (isMobile() || editor.state.selection.empty) {
    if (bubble.mode !== 'main') bubble.mode = 'main'
    return
  }
  if (bubble.mode === 'link' && !force) return
  const ed = editor
  // The toolbar row is always rendered; "Turn into", "More" and the link field open as a panel
  // *below* it, so Bold/Italic/Highlight/Link stay visible while a menu is open.
  const open = bubble.mode
  const bar = `<div class="bm-bar">
      <button type="button" data-act="turn" class="bm-btn bm-btn--text ${open === 'turn' ? 'is-open' : ''}" aria-haspopup="menu" aria-expanded="${open === 'turn'}">${esc(currentBlockLabel(ed))}${icon('chevron-down', 'size-3.5')}</button>
      <span class="bm-sep"></span>
      ${btn('bold', 'bold', 'Bold', MARKS.bold.active(ed))}
      ${btn('italic', 'italic', 'Italic', MARKS.italic.active(ed))}
      ${btn('highlight', 'highlighter', 'Highlight', MARKS.highlight.active(ed))}
      ${btn('link', 'link', 'Link', ed.isActive('link') || open === 'link')}
      ${btn('more', 'ellipsis', 'More', open === 'more')}
    </div>`
  let pop = ''
  if (open === 'turn') {
    pop = `<div class="bm-pop bm-menu" role="menu">${BLOCKS.map((b) => `<button type="button" role="menuitem" data-turn="${b.id}" class="bm-item ${b.active(ed) ? 'is-on' : ''}">${icon(b.icon)}<span>${b.label}</span>${b.active(ed) ? icon('check', 'size-3.5 ms-auto') : ''}</button>`).join('')}</div>`
  } else if (open === 'more') {
    pop = `<div class="bm-pop bm-menu" role="menu">
      <button type="button" role="menuitem" data-act="strike" class="bm-item ${MARKS.strike.active(ed) ? 'is-on' : ''}">${icon('strikethrough')}<span>Strikethrough</span></button>
      <button type="button" role="menuitem" data-act="code" class="bm-item ${MARKS.code.active(ed) ? 'is-on' : ''}">${icon('code')}<span>Inline code</span></button></div>`
  } else if (open === 'link') {
    const href = ed.getAttributes('link').href || ''
    pop = `<form class="bm-pop bm-link" data-link-form>${icon('link', 'size-4 text-gray-400')}
      <input type="text" inputmode="url" autocomplete="off" aria-label="Link address" placeholder="Paste or type a link" value="${esc(href)}" class="bm-input">
      <button type="submit" class="bm-apply">Apply</button>
      ${href ? `<button type="button" data-act="unlink" class="bm-btn" aria-label="Remove link">${icon('unlink')}</button>` : ''}</form>`
  }
  const html = bar + pop
  if (bubbleEl.dataset.html !== html) {
    bubble.rendering = true // replacing the focused button fires focusout; that is not the user leaving
    bubbleEl.innerHTML = html
    bubble.rendering = false
    bubbleEl.dataset.html = html
    refreshIcons(bubbleEl)
    // Buttons are reached with arrow keys (roving), never with Tab.
    bubbleEl.querySelectorAll('button').forEach((b) => (b.tabIndex = -1))
    if (bubble.mode === 'link') bubbleEl.querySelector('input')?.focus()
    else if (bubble.kbd) {
      const target =
        bubble.mode === 'main'
          ? (bubble.focusAct && bubbleEl.querySelector(`.bm-bar [data-act="${bubble.focusAct}"]`)) || bubbleEl.querySelector('.bm-bar .bm-btn')
          : bubbleEl.querySelector('.bm-pop .bm-item.is-on') || bubbleEl.querySelector('.bm-pop .bm-item')
      target?.focus()
    }
    // size changed -> reposition
    editor.view.dispatch(editor.state.tr.setMeta('bubbleMenu$', 'updatePosition'))
    placePanel()
  }
}

// The panel opens below the toolbar; flip it above when the window has no room underneath,
// otherwise a selection near the bottom of the screen would push the menu out of reach.
function placePanel() {
  const apply = () => {
    const pop = bubbleEl.querySelector('.bm-pop')
    if (!pop) return
    pop.classList.remove('bm-pop--up')
    const vv = window.visualViewport
    const bottom = (vv ? vv.offsetTop + vv.height : innerHeight) - 8
    const bar = bubbleEl.querySelector('.bm-bar').getBoundingClientRect()
    const need = pop.offsetHeight + 6
    if (bar.bottom + need > bottom && bar.top - need > 8) pop.classList.add('bm-pop--up')
  }
  apply()
  requestAnimationFrame(() => requestAnimationFrame(apply)) // again once BubbleMenu has repositioned
}

function setBubbleMode(mode) {
  bubble.mode = mode
  bubbleEl.dataset.html = ''
  renderBubble(true)
}

bubbleEl.addEventListener('mousedown', (e) => {
  if (!e.target.closest('input')) e.preventDefault() // keep the selection and focus in the editor
})
bubbleEl.addEventListener('click', (e) => {
  const t = e.target.closest('[data-act],[data-turn]')
  if (!t) return
  bubble.kbd = e.detail === 0 // detail 0 = activated from the keyboard (Enter/Space)
  if (t.dataset.turn) {
    bubble.kbd = false // action done: focus returns to the text
    turnInto(editor, t.dataset.turn)
    return setBubbleMode('main')
  }
  const act = t.dataset.act
  if (act === 'turn' || act === 'more') {
    bubble.focusAct = act
    return setBubbleMode(bubble.mode === act ? 'main' : act)
  }
  if (act === 'link') return setBubbleMode('link')
  if (act === 'unlink') {
    bubble.kbd = false
    applyLink(editor, '')
    return setBubbleMode('main')
  }
  bubble.kbd = false
  MARKS[act]?.run(editor)
  if (bubble.mode !== 'main') setBubbleMode('main')
  else renderBubble()
})
bubbleEl.addEventListener('focusout', (e) => {
  // focus left the bubble for somewhere else (not into the editor) -> drop keyboard mode
  if (!bubble.rendering && !bubbleEl.contains(e.relatedTarget)) bubble.kbd = false
})
bubbleEl.addEventListener('submit', (e) => {
  e.preventDefault()
  applyLink(editor, bubbleEl.querySelector('input').value)
  setBubbleMode('main')
})
bubbleEl.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    bubble.kbd = false
    setBubbleMode('main')
    editor.commands.focus()
    return
  }
  if (document.activeElement?.tagName === 'INPUT') return // the address field uses normal text editing keys
  const inPop = !!document.activeElement?.closest('.bm-pop')
  const items = [...bubbleEl.querySelectorAll(inPop ? '.bm-pop .bm-item' : '.bm-bar .bm-btn')]
  const i = items.indexOf(document.activeElement)
  if (i < 0) return
  const horizontal = !inPop
  const go = (n) => {
    e.preventDefault()
    items[(n + items.length) % items.length].focus()
  }
  if (e.key === (horizontal ? 'ArrowRight' : 'ArrowDown')) go(i + 1)
  else if (e.key === (horizontal ? 'ArrowLeft' : 'ArrowUp')) go(i - 1)
  else if (e.key === 'Home') go(0)
  else if (e.key === 'End') go(items.length - 1)
  else if (!horizontal && e.key === 'ArrowLeft') {
    // leave the panel, landing back on the button that opened it
    e.preventDefault()
    bubble.kbd = true
    setBubbleMode('main')
  } else if (horizontal && e.key === 'ArrowDown' && (document.activeElement.dataset.act === 'turn' || document.activeElement.dataset.act === 'more')) {
    // open the menu under the focused button
    e.preventDefault()
    bubble.kbd = true
    bubble.focusAct = document.activeElement.dataset.act
    setBubbleMode(document.activeElement.dataset.act)
  } else if (e.key === 'Tab') {
    e.preventDefault()
    bubble.kbd = false
    setBubbleMode('main')
    editor.commands.focus()
  }
})

// ---- Mobile bar + tray -----------------------------------------------------------------------
const mobile = { mode: 'bar', tray: false }

function mb(act, ic, label, on = false, text = '') {
  return `<button type="button" tabindex="-1" data-m="${act}" class="mb-btn ${on ? 'is-on' : ''} ${text ? 'mb-btn--text' : ''}" aria-label="${label}" aria-pressed="${on}">${text ? esc(text) : icon(ic, 'size-5')}${text ? icon('chevron-down', 'size-3.5') : ''}</button>`
}

function mobileVisible() {
  if (!isMobile() || !currentId || app.dataset.view !== 'editor') return false
  return editorFocused || mobile.mode !== 'bar' || mbar.contains(document.activeElement)
}

function renderMobileBar() {
  const show = mobileVisible()
  mbar.hidden = !show
  app.classList.toggle('kb-open', show)
  if (!show) return
  const ed = editor
  const sel = !ed.state.selection.empty && ed.state.selection.$from.parent.type.name !== 'title' && !!ed.state.doc.textBetween(ed.state.selection.from, ed.state.selection.to, ' ').trim()
  const width = mbar.clientWidth || innerWidth
  let main = ''
  if (mobile.mode === 'link') {
    const href = ed.getAttributes('link').href || ''
    $('#mobile-row').innerHTML = `<form class="mb-link" data-m-link>${icon('link', 'size-4 text-gray-400')}<input type="text" inputmode="url" autocomplete="off" aria-label="Link address" placeholder="Paste or type a link" value="${esc(href)}" class="bm-input"><button type="submit" class="bm-apply">Apply</button>${href ? `<button type="button" data-m="unlink" class="mb-btn" aria-label="Remove link">${icon('unlink', 'size-5')}</button>` : ''}<button type="button" data-m="cancel-link" class="mb-btn" aria-label="Cancel">${icon('x', 'size-5')}</button></form>`
    refreshIcons($('#mobile-row'))
    $('#mobile-row input')?.focus({ preventScroll: true })
    $('#mobile-tray').hidden = true
    mobile.mode = 'link-open'
    return
  }
  if (mobile.mode === 'link-open') return
  if (sel) {
    const foldLink = width < 340
    const foldItalic = width < 300
    const items = [mb('turn', '', 'Turn into', false, currentBlockLabel(ed)), mb('bold', 'bold', 'Bold', MARKS.bold.active(ed))]
    if (!foldItalic) items.push(mb('italic', 'italic', 'Italic', MARKS.italic.active(ed)))
    items.push(mb('highlight', 'highlighter', 'Highlight', MARKS.highlight.active(ed)))
    if (!foldLink) items.push(mb('link', 'link', 'Link', ed.isActive('link')))
    items.push(mb('more', 'ellipsis', 'More'))
    main = items.join('')
    mobile.tray = false
    mobile.foldedLink = foldLink
    mobile.foldedItalic = foldItalic
  } else {
    main =
      mb('aa', '', 'Formatting', mobile.tray, 'Aa') +
      mb('task', 'list-checks', 'Checklist', ed.isActive('taskList')) +
      mb('bullet', 'list', 'Bulleted list', ed.isActive('bulletList')) +
      (inList(ed) ? mb('outdent', 'indent-decrease', 'Outdent') + mb('indent', 'indent-increase', 'Indent') : '') +
      (ed.isActive('table') ? mb('addrow', 'between-horizontal-end', 'Add row') + mb('addcol', 'between-vertical-end', 'Add column') + mb('deltable', 'trash-2', 'Delete table') : '') +
      mb('undo', 'undo-2', 'Undo') +
      mb('hide', 'keyboard-off', 'Hide keyboard')
    // "Aa" is a text label chip rather than a dropdown arrow
    main = main.replace(/(<button[^>]*data-m="aa"[^>]*>)Aa<i[^>]*><\/i>/, '$1Aa')
  }
  $('#mobile-row').innerHTML = main
  refreshIcons($('#mobile-row'))
  const undoBtn = $('[data-m="undo"]', mbar)
  if (undoBtn) undoBtn.disabled = !ed.can().undo()
  // tray
  const tray = $('#mobile-tray')
  tray.hidden = !(mobile.tray && !sel)
  if (!tray.hidden) {
    tray.innerHTML = `<div class="tray-label">Turn this line into</div><div class="tray-row">${BLOCKS.map((b) => `<button type="button" tabindex="-1" data-tray="${b.id}" class="tray-chip ${b.active(ed) ? 'is-on' : ''}" aria-pressed="${b.active(ed)}">${icon(b.icon)}<span>${b.label}</span></button>`).join('')}</div>
      <div class="tray-label">Insert</div><div class="tray-row">${[DIVIDER, TABLE].map((x) => `<button type="button" tabindex="-1" data-tray="${x.id}" class="tray-chip">${icon(x.icon)}<span>${x.label}</span></button>`).join('')}</div>`
    refreshIcons(tray)
  }
}

function mobilePopup(kind) {
  const pop = $('#mobile-pop')
  const ed = editor
  let items = []
  if (kind === 'turn') items = BLOCKS.map((b) => ({ turn: b.id, ic: b.icon, label: b.label, on: b.active(ed) }))
  else {
    if (mobile.foldedItalic) items.push({ act: 'italic', ic: 'italic', label: 'Italic', on: MARKS.italic.active(ed) })
    if (mobile.foldedLink) items.push({ act: 'link', ic: 'link', label: 'Link', on: ed.isActive('link') })
    items.push({ act: 'strike', ic: 'strikethrough', label: 'Strikethrough', on: MARKS.strike.active(ed) }, { act: 'code', ic: 'code', label: 'Inline code', on: MARKS.code.active(ed) })
  }
  if (!pop.hidden && pop.dataset.kind === kind) {
    pop.hidden = true
    return
  }
  pop.dataset.kind = kind
  pop.innerHTML = items.map((i) => `<button type="button" tabindex="-1" role="menuitem" ${i.turn ? `data-turn="${i.turn}"` : `data-act="${i.act}"`} class="bm-item ${i.on ? 'is-on' : ''}">${icon(i.ic)}<span>${i.label}</span>${i.on ? icon('check', 'size-3.5 ms-auto') : ''}</button>`).join('')
  pop.hidden = false
  refreshIcons(pop)
}

mbar.addEventListener('mousedown', (e) => {
  if (!e.target.closest('input')) e.preventDefault() // never blur the editor from the bar
})
mbar.addEventListener('pointerdown', (e) => {
  if (!e.target.closest('input')) e.preventDefault()
})
mbar.addEventListener('click', (e) => {
  const popItem = e.target.closest('#mobile-pop [data-turn], #mobile-pop [data-act]')
  if (popItem) {
    if (popItem.dataset.turn) turnInto(editor, popItem.dataset.turn)
    else if (popItem.dataset.act === 'link') {
      $('#mobile-pop').hidden = true
      mobile.mode = 'link'
      return renderMobileBar()
    } else MARKS[popItem.dataset.act]?.run(editor)
    $('#mobile-pop').hidden = true
    return renderMobileBar()
  }
  const chip = e.target.closest('[data-tray]')
  if (chip) {
    if (chip.dataset.tray === 'divider') insertDivider(editor)
    else if (chip.dataset.tray === 'table') insertTable(editor)
    else turnInto(editor, chip.dataset.tray)
    return renderMobileBar()
  }
  const b = e.target.closest('[data-m]')
  if (!b) return
  const m = b.dataset.m
  $('#mobile-pop').hidden = true
  if (m === 'aa') {
    mobile.tray = !mobile.tray
    editor.commands.focus(null, { scrollIntoView: false })
  } else if (m === 'task') editor.chain().focus().toggleTaskList().run()
  else if (m === 'bullet') editor.chain().focus().toggleBulletList().run()
  else if (m === 'indent') indentList(editor, 1)
  else if (m === 'outdent') indentList(editor, -1)
  else if (m === 'addrow') editor.chain().focus().addRowAfter().run()
  else if (m === 'addcol') editor.chain().focus().addColumnAfter().run()
  else if (m === 'deltable') editor.chain().focus().deleteTable().run()
  else if (m === 'undo') editor.chain().focus().undo().run()
  else if (m === 'hide') {
    mobile.tray = false
    editor.commands.blur()
    document.activeElement?.blur?.()
  } else if (m === 'turn') return mobilePopup('turn')
  else if (m === 'more') return mobilePopup('more')
  else if (m === 'link') {
    mobile.mode = 'link'
  } else if (m === 'unlink') {
    applyLink(editor, '')
    mobile.mode = 'bar'
  } else if (m === 'cancel-link') {
    mobile.mode = 'bar'
    editor.commands.focus()
  } else MARKS[m]?.run(editor)
  renderMobileBar()
})
mbar.addEventListener('submit', (e) => {
  e.preventDefault()
  applyLink(editor, mbar.querySelector('input').value)
  mobile.mode = 'bar'
  editor.commands.focus()
  renderMobileBar()
})
mbar.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobile.mode === 'link-open') {
    mobile.mode = 'bar'
    editor.commands.focus()
    renderMobileBar()
  }
})

// Follow the visual viewport so the bar always sits on top of the on-screen keyboard.
function syncViewport() {
  const vv = window.visualViewport
  if (!vv) return
  app.style.setProperty('--vvh', vv.height + 'px')
  app.style.setProperty('--vvtop', vv.offsetTop + 'px')
  if (editorFocused && isMobile()) {
    requestAnimationFrame(() => editor.view.dispatch(editor.state.tr.scrollIntoView()))
  }
}
window.visualViewport?.addEventListener('resize', syncViewport)
window.visualViewport?.addEventListener('scroll', syncViewport)
mq.addEventListener('change', () => {
  syncViewport()
  renderMobileBar()
  bubble.mode = 'main'
  if (!currentId) app.dataset.view = 'list'
})
syncViewport()

// ---- Global keyboard + page lifecycle --------------------------------------------------------
document.addEventListener('keydown', (e) => {
  const mod = e.metaKey || e.ctrlKey
  const inCells = editor.state.selection instanceof CellSelection
  if (e.key === 'F10' && !isMobile() && !inCells && !editor.state.selection.empty && editor.view.hasFocus()) {
    // Move keyboard focus into the selection toolbar (ARIA toolbar convention).
    e.preventDefault()
    bubble.kbd = true
    bubble.focusAct = null
    setBubbleMode('main')
  } else if (e.key === 'F10' && !isMobile() && (inCells || editor.state.selection.empty) && editor.view.hasFocus() && tableUI?.inTable()) {
    e.preventDefault()
    tableUI.focusControls()
  } else if (mod && e.key === '/') {
    e.preventDefault()
    toggleHelp()
  } else if (mod && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (isMobile() && app.dataset.view === 'editor') return
    searchEl.focus()
    searchEl.select()
  } else if (mod && e.altKey && e.code === 'KeyN') {
    e.preventDefault()
    newNote()
  }
})

function flushAll() {
  if (currentId) stateCache.set(currentId, editor.state)
  store.flushLocal()
}
window.addEventListener('pagehide', flushAll)
document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && flushAll())
window.addEventListener('beforeunload', (e) => {
  flushAll()
  const dirty = [...store.notes.keys()].some((id) => store.isDirty(id))
  if (dirty && serverSim.settings().fail) {
    e.preventDefault() // only warn when we know the unsaved edits are stuck on this device
    e.returnValue = ''
  }
})

// ---- Keyboard shortcuts dialog ---------------------------------------------------------------
const helpDlg = $('#help-dialog')
let helpReturn = null
const A = isMac ? '⌥' : 'Alt+'
const S = isMac ? '⇧' : 'Shift+'
const SHORTCUTS = [
  ['Notes', [
    ['New note', `${MOD}${A}N`],
    ['Search notes', `${MOD}K`],
    ['Open top search result', 'Enter in search'],
    ['Move through the list', '↑ ↓  Home  End'],
    ['Open the selected note', 'Enter'],
    ['Back to the list from the editor', 'Esc'],
    ['Back to the editor from the list', '→  or  Esc'],
  ]],
  ['Writing', [
    ['Leave the title for the body', 'Enter'],
    ['Undo / redo', `${MOD}Z  ${MOD}${S}Z`],
    ['Indent / outdent list item', `Tab  ${S}Tab`],
    ['Tick a checklist item', `${MOD}Enter`],
  ]],
  ['Blocks', [
    ['Open the block menu', '/'],
    ['Choose in the block menu', '↑ ↓  Enter  Esc'],
    ['Heading 1 / 2 / 3', `${MOD}${A}1  2  3`],
    ['Plain text', `${MOD}${A}0`],
    ['Bulleted / numbered / checklist', `${MOD}${S}8  7  9`],
    ['Quote', `${MOD}${S}B`],
    ['Move between table cells (adds a row at the end)', `Tab  ${S}Tab`],
    ['Table column / row menus (caret in a table)', 'F10  then  Enter'],
    ['Select several table cells', `Drag  or  ${S}← → ↑ ↓`],
    ['Code block', `${MOD}${A}C`],
    ['Divider', `${MOD}${A}D`],
  ]],
  ['Formatting', [
    ['Bold / italic', `${MOD}B  ${MOD}I`],
    ['Highlight', `${MOD}${S}H`],
    ['Strikethrough / inline code', `${MOD}${S}S  ${MOD}E`],
    ['Link the selection', `${MOD}${S}L`],
    ['Move into the selection toolbar', 'F10'],
    ['Toolbar: move / activate / close', '← →  Enter  Esc'],
  ]],
]
$('#help-body').innerHTML = SHORTCUTS.map(
  ([h, rows]) => `<section><h3>${h}</h3><dl>${rows.map(([l, k]) => `<div><dt>${l}</dt><dd>${k.split('  ').map((x) => `<kbd>${x}</kbd>`).join('')}</dd></div>`).join('')}</dl></section>`
).join('')
function toggleHelp(force) {
  const open = force ?? helpDlg.hidden
  if (open) {
    helpReturn = document.activeElement
    helpDlg.hidden = false
    $('#help-close').focus()
  } else {
    helpDlg.hidden = true
    ;(helpReturn && document.contains(helpReturn) ? helpReturn : editor.view.dom).focus?.()
  }
}
$('#help-open').addEventListener('click', () => toggleHelp(true))
$('#help-close').addEventListener('click', () => toggleHelp(false))
helpDlg.addEventListener('click', (e) => e.target === helpDlg && toggleHelp(false))
helpDlg.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    toggleHelp(false)
  } else if (e.key === 'Tab') {
    // trap focus inside the dialog
    const f = [...helpDlg.querySelectorAll('button')]
    if (!f.length) return
    e.preventDefault()
    f[0].focus()
  }
})

// ---- Prototype tools (not part of the product UI) --------------------------------------------
const tools = $('#proto-tools')
const toolsBtn = $('#proto-tools-btn')
toolsBtn.addEventListener('click', () => {
  tools.hidden = !tools.hidden
  toolsBtn.setAttribute('aria-expanded', String(!tools.hidden))
})
const failBox = $('#sim-fail')
const latBox = $('#sim-latency')
failBox.checked = serverSim.settings().fail
latBox.value = serverSim.settings().latency
failBox.addEventListener('change', () => serverSim.update({ fail: failBox.checked }))
latBox.addEventListener('input', () => {
  $('#sim-latency-val').textContent = latBox.value + ' ms'
  serverSim.update({ latency: +latBox.value })
})
$('#sim-latency-val').textContent = latBox.value + ' ms'
$('#sim-reset').addEventListener('click', () => {
  if (confirm('Reset all demo notes and settings on this device?')) store.reset()
})
$('#sim-shortcuts').textContent = `${MOD}/ shows all keyboard shortcuts`

// ---- Boot ------------------------------------------------------------------------------------
reorder()
renderList()
renderStatus()
if (store.restored.length) {
  queue.resume(store.restored)
  const toast = $('#restore-toast')
  toast.textContent = `Restored ${store.restored.length === 1 ? '1 note' : store.restored.length + ' notes'} with changes that hadn't reached the server. Saving now.`
  toast.hidden = false
  setTimeout(() => (toast.hidden = true), 6000)
}
const hash = location.hash.slice(1)
if (!isMobile()) openNote(store.get(hash) ? hash : order[0])
else if (store.get(hash)) openNote(hash)
else app.dataset.view = 'list'
