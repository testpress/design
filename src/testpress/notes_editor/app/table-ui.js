import { TableMap, addRow, addColumn, CellSelection } from '@tiptap/pm/tables'
import { TextSelection } from '@tiptap/pm/state'
import { refreshIcons } from './icons.js'

// Notion-style table editing. No floating toolbar: while the caret is in a table we show
//  - a "+" strip under the table (add row) and one at its right edge (add column)
//  - a grip on the active column's top edge and the active row's left edge; clicking one opens
//    a small menu (insert before/after, clear contents, delete)
// The active cell gets an outline (see editor.js). Everything keeps the caret where it was.

const DOTS_H = '<svg width="14" height="6" viewBox="0 0 14 6" fill="currentColor" aria-hidden="true"><circle cx="2" cy="3" r="1.2"/><circle cx="7" cy="3" r="1.2"/><circle cx="12" cy="3" r="1.2"/></svg>'
const DOTS_V = '<svg width="6" height="14" viewBox="0 0 6 14" fill="currentColor" aria-hidden="true"><circle cx="3" cy="2" r="1.2"/><circle cx="3" cy="7" r="1.2"/><circle cx="3" cy="12" r="1.2"/></svg>'
const PLUS = '<svg width="10" height="10" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 1.5v9M1.5 6h9"/></svg>'

const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform)
const SC_DELETE_ROW = IS_MAC ? '⌘⌥⌫' : 'Ctrl+Alt+⌫'
const SC_DELETE_COL = IS_MAC ? '⌘⌥−' : 'Ctrl+Alt+−'

export function createTableUI({ editor, host, scroller, isMobile }) {
  const mk = (cls, html, label, extra = {}) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = cls
    b.innerHTML = html
    b.setAttribute('aria-label', label)
    b.tabIndex = -1
    Object.entries(extra).forEach(([k, v]) => b.setAttribute(k, v))
    b.hidden = true
    host.appendChild(b)
    return b
  }
  const colGrip = mk('tbl-grip tbl-grip--col', DOTS_H, 'Column options', { 'aria-haspopup': 'menu', 'aria-expanded': 'false' })
  const rowGrip = mk('tbl-grip tbl-grip--row', DOTS_V, 'Row options', { 'aria-haspopup': 'menu', 'aria-expanded': 'false' })
  const addRowBtn = mk('tbl-add tbl-add--row', PLUS, 'Add row')
  const addColBtn = mk('tbl-add tbl-add--col', PLUS, 'Add column')
  const menu = document.createElement('div')
  menu.className = 'tbl-menu'
  menu.setAttribute('role', 'menu')
  menu.hidden = true
  host.appendChild(menu)
  const buttons = [colGrip, rowGrip, addRowBtn, addColBtn]

  let tableDom = null
  let info = null // { tablePos, tableNode, tableStart, cellPos, row, col }
  let openKind = null
  let gripSelected = false // the cell selection came from clicking a grip, not from the user dragging
  let raf = 0

  // ---- where is the caret in the table? ------------------------------------------------------
  function locate() {
    const { state } = editor
    const sel = state.selection
    let tableDepth = -1
    let $ref
    if (sel instanceof CellSelection) {
      // several cells selected (drag, Shift+arrows, or a grip): controls act on the whole range
      $ref = sel.$anchorCell
      for (let d = $ref.depth; d > 0; d--) if ($ref.node(d).type.name === 'table') { tableDepth = d; break }
      if (tableDepth < 0) return null
      const tableNode = $ref.node(tableDepth)
      const tableStart = $ref.start(tableDepth)
      const map = TableMap.get(tableNode)
      const a = map.findCell(sel.$anchorCell.pos - tableStart)
      const h = map.findCell(sel.$headCell.pos - tableStart)
      const range = { left: Math.min(a.left, h.left), right: Math.max(a.right, h.right), top: Math.min(a.top, h.top), bottom: Math.max(a.bottom, h.bottom) }
      return { tablePos: $ref.before(tableDepth), tableNode, tableStart, map, range, multi: true, cellPos: sel.$anchorCell.pos }
    }
    $ref = sel.$from
    let cellDepth = -1
    for (let d = $ref.depth; d > 0; d--) {
      const n = $ref.node(d).type.name
      if (cellDepth < 0 && (n === 'tableCell' || n === 'tableHeader')) cellDepth = d
      if (n === 'table') {
        tableDepth = d
        break
      }
    }
    if (tableDepth < 0 || cellDepth < 0) return null
    const tableNode = $ref.node(tableDepth)
    const tableStart = $ref.start(tableDepth)
    const cellPos = $ref.before(cellDepth)
    const map = TableMap.get(tableNode)
    const r = map.findCell(cellPos - tableStart)
    return { tablePos: $ref.before(tableDepth), tableNode, tableStart, map, cellPos, multi: false, range: { left: r.left, right: r.right, top: r.top, bottom: r.bottom } }
  }

  const place = (el, x, y, w, h) => {
    el.style.left = Math.round(x) + 'px'
    el.style.top = Math.round(y) + 'px'
    if (w != null) el.style.width = Math.round(w) + 'px'
    if (h != null) el.style.height = Math.round(h) + 'px'
  }

  function hideAll() {
    buttons.forEach((b) => (b.hidden = true))
    tableDom = null
    setNear(false, false)
    closeMenu()
    info = null
  }

  function update() {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(render)
  }

  function render() {
    if (isMobile() || !editor.isEditable) return hideAll()
    const active = document.activeElement
    const inOverlay = buttons.includes(active) || menu.contains(active)
    if (!editor.view.hasFocus() && !inOverlay && !openKind) return hideAll()
    info = locate()
    if (!info) return hideAll()
    const dom = editor.view.nodeDOM(info.tablePos)
    const table = dom && (dom.tagName === 'TABLE' ? dom : dom.querySelector('table'))
    const { map, range } = info
    const w = map.width
    const cellAt = (r, c) => editor.view.nodeDOM(info.tableStart + map.map[r * w + c])
    const first = cellAt(range.top, range.left)
    const last = cellAt(range.bottom - 1, range.right - 1)
    if (!table || !first || !last) return hideAll()
    // Anchor everything to the *visible* box (the scrolling wrapper), not the full table width:
    // a wide table is wider than the editor and scrolls sideways inside its wrapper.
    const wrap = table.closest('.tableWrapper') || table
    tableDom = wrap
    const t = wrap.getBoundingClientRect()
    const f = first.getBoundingClientRect()
    const l = last.getBoundingClientRect()
    const sel = { left: f.left, right: l.right, top: f.top, bottom: l.bottom }
    const s = scroller.getBoundingClientRect()
    if (t.bottom < s.top + 4 || t.top > s.bottom - 4) return hideAll() // scrolled out of view
    buttons.forEach((b) => (b.hidden = false))
    const topVisible = t.top - 18 >= s.top
    // column grip: centred over the selection, kept inside the visible part; hidden if scrolled out
    const cx = (Math.max(sel.left, t.left) + Math.min(sel.right, t.right)) / 2
    colGrip.hidden = !topVisible || sel.right < t.left + 8 || sel.left > t.right - 8
    place(colGrip, Math.min(Math.max(cx - 14, t.left), t.right - 28), t.top - 17, 28, 14)
    const cy = (Math.max(sel.top, t.top) + Math.min(sel.bottom, t.bottom)) / 2
    place(rowGrip, t.left - 19, Math.min(Math.max(cy - 14, t.top), t.bottom - 28), 14, 28)
    place(addRowBtn, t.left, t.bottom + 3, t.width, 14)
    // keep the column strip inside the editor area even when the table fills the whole width
    place(addColBtn, Math.min(t.right + 3, s.right - 17), t.top, 14, t.height)
    addRowBtn.hidden = t.bottom + 18 > s.bottom
    if (openKind) positionMenu()
  }

  // ---- actions ---------------------------------------------------------------------------------
  const rectFor = () => ({ map: info.map, tableStart: info.tableStart, table: info.tableNode })

  function clearCells(cellOffsets) {
    const { state, view } = editor
    const tr = state.tr
    const p = state.schema.nodes.paragraph
    ;[...cellOffsets].sort((a, b) => b - a).forEach((off) => {
      const abs = info.tableStart + off
      const node = tr.doc.nodeAt(abs)
      if (node) tr.replaceWith(abs + 1, abs + node.nodeSize - 1, p.create())
    })
    view.dispatch(tr)
  }

  // Offsets (relative to the table) of every cell in the current range, optionally one axis only.
  const rangeCells = () => {
    const { map, range } = info
    const out = []
    for (let r = range.top; r < range.bottom; r++) for (let c = range.left; c < range.right; c++) out.push(map.map[r * map.width + c])
    return out
  }

  function addAtEnd(kind) {
    if (!info) return
    const { state, view } = editor
    const tr = kind === 'row' ? addRow(state.tr, rectFor(), info.map.height) : addColumn(state.tr, rectFor(), info.map.width)
    view.dispatch(tr)
    editor.view.focus()
  }

  // Menu contents depend on how much is selected: "Delete column" vs "Delete 3 columns".
  function actionsFor(kind) {
    const { range } = info
    const nCols = range.right - range.left
    const nRows = range.bottom - range.top
    const plural = (n, w) => (n === 1 ? `Delete ${w}` : `Delete ${n} ${w}s`)
    const userRange = info.multi && !gripSelected
    const clear = { label: userRange ? 'Clear selected cells' : 'Clear contents', icon: 'circle-x', run: () => clearCells(userRange ? rangeCells() : kindCells(kind)) }
    const delTable = { label: 'Delete table', icon: 'trash-2', danger: true, run: () => editor.chain().focus().deleteTable().run() }
    if (kind === 'col')
      return [
        { label: 'Insert left', icon: 'arrow-left', run: () => editor.chain().focus().addColumnBefore().run() },
        { label: 'Insert right', icon: 'arrow-right', run: () => editor.chain().focus().addColumnAfter().run() },
        clear,
        { label: plural(nCols, 'column'), icon: 'trash-2', danger: true, hint: SC_DELETE_COL, run: () => editor.chain().focus().deleteColumn().run() },
        delTable,
      ]
    return [
      { label: 'Insert above', icon: 'arrow-up', run: () => editor.chain().focus().addRowBefore().run() },
      { label: 'Insert below', icon: 'arrow-down', run: () => editor.chain().focus().addRowAfter().run() },
      clear,
      { label: plural(nRows, 'row'), icon: 'trash-2', danger: true, hint: SC_DELETE_ROW, run: () => editor.chain().focus().deleteRow().run() },
      delTable,
    ]
  }

  // single-cell caret: "Clear contents" means the whole column / row the grip belongs to
  const kindCells = (kind) => {
    const { map, range } = info
    const out = []
    if (kind === 'col') for (let r = 0; r < map.height; r++) out.push(map.map[r * map.width + range.left])
    else for (let c = 0; c < map.width; c++) out.push(map.map[range.top * map.width + c])
    return out
  }

  // Clicking a grip selects the whole column / row (like Notion) so the action is unambiguous.
  function selectWhole(kind) {
    if (info.multi) return // keep the user's own selection
    const { state, view } = editor
    const $cell = state.doc.resolve(info.cellPos)
    const sel = kind === 'col' ? CellSelection.colSelection($cell) : CellSelection.rowSelection($cell)
    view.dispatch(state.tr.setSelection(sel))
    info = locate()
  }

  function openMenu(kind, fromKeyboard) {
    if (!info) return
    openKind = kind
    const wasMulti = info.multi
    selectWhole(kind)
    gripSelected = !wasMulti
    const items = actionsFor(kind)
    menu.innerHTML = items
      .map((a, i) => `<button type="button" role="menuitem" tabindex="-1" data-i="${i}" class="tbl-item ${a.danger ? 'is-danger' : ''}"><i data-lucide="${a.icon}" class="size-4"></i><span>${a.label}</span>${a.hint ? `<kbd class="tbl-item__hint">${a.hint}</kbd>` : ''}</button>`)
      .join('')
    menu._items = items
    refreshIcons(menu)
    menu.hidden = false
    ;(kind === 'col' ? colGrip : rowGrip).setAttribute('aria-expanded', 'true')
    positionMenu()
    if (fromKeyboard) menu.querySelector('.tbl-item')?.focus()
  }

  function positionMenu() {
    const g = (openKind === 'col' ? colGrip : rowGrip).getBoundingClientRect()
    const vv = window.visualViewport
    const vw = vv ? vv.width : innerWidth
    const vh = vv ? vv.height : innerHeight
    const w = menu.offsetWidth
    const h = menu.offsetHeight
    let left = openKind === 'col' ? g.left + g.width / 2 - w / 2 : g.right + 8
    let top = openKind === 'col' ? g.bottom + 6 : g.top - 4
    left = Math.min(Math.max(8, left), vw - w - 8)
    if (top + h > vh - 8) top = Math.max(8, vh - h - 8)
    place(menu, left, top)
  }

  // After an action, drop any leftover multi-cell selection so the next grip click starts clean.
  function collapseToCaret() {
    const { state, view } = editor
    if (!(state.selection instanceof CellSelection)) return
    const pos = Math.min(state.selection.from, state.doc.content.size)
    view.dispatch(state.tr.setSelection(TextSelection.near(state.doc.resolve(pos))))
  }

  function closeMenu(refocus) {
    if (menu.hidden) return
    menu.hidden = true
    openKind = null
    gripSelected = false
    colGrip.setAttribute('aria-expanded', 'false')
    rowGrip.setAttribute('aria-expanded', 'false')
    if (refocus) editor.view.focus()
  }

  // ---- events ----------------------------------------------------------------------------------
  host.addEventListener('mousedown', (e) => {
    if (e.target.closest('.tbl-grip, .tbl-add, .tbl-menu')) e.preventDefault() // keep the caret in its cell
  })
  addRowBtn.addEventListener('click', () => addAtEnd('row'))
  addColBtn.addEventListener('click', () => addAtEnd('col'))
  ;[colGrip, rowGrip].forEach((g) =>
    g.addEventListener('click', (e) => {
      const kind = g === colGrip ? 'col' : 'row'
      if (openKind === kind) return closeMenu(true)
      openMenu(kind, e.detail === 0)
    })
  )
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('.tbl-item')
    if (!b) return
    const act = menu._items[+b.dataset.i]
    closeMenu()
    act.run()
    collapseToCaret()
    update()
  })
  document.addEventListener('mousedown', (e) => {
    if (openKind && !e.target.closest('.tbl-menu, .tbl-grip')) closeMenu()
  })

  menu.addEventListener('keydown', (e) => {
    const items = [...menu.querySelectorAll('.tbl-item')]
    const i = items.indexOf(document.activeElement)
    const go = (n) => {
      e.preventDefault()
      items[(n + items.length) % items.length].focus()
    }
    if (e.key === 'ArrowDown') go(i + 1)
    else if (e.key === 'ArrowUp') go(i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(items.length - 1)
    else if (e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'Tab') {
      e.preventDefault()
      const g = openKind === 'col' ? colGrip : rowGrip
      closeMenu()
      g.focus() // back on the grip; Esc again returns to the text
    }
  })
  buttons.forEach((b) =>
    b.addEventListener('keydown', (e) => {
      const i = buttons.indexOf(b)
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const next = buttons.filter((x) => !x.hidden)
        const j = next.indexOf(b)
        next[(j + (e.key === 'ArrowRight' ? 1 : -1) + next.length) % next.length].focus()
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault()
        closeMenu()
        editor.view.focus()
      } else if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && (b === colGrip || b === rowGrip)) {
        e.preventDefault()
        openMenu(b === colGrip ? 'col' : 'row', true)
      }
    })
  )
  // The "+" strips only show while the pointer is near the matching table edge (or when they have
  // keyboard focus). Zones are measured live so scrolling and resizing can't leave them stale.
  let nearRow = false
  let nearCol = false
  function setNear(row, col) {
    if (row !== nearRow) addRowBtn.classList.toggle('is-near', (nearRow = row))
    if (col !== nearCol) addColBtn.classList.toggle('is-near', (nearCol = col))
  }
  let moveRaf = 0
  document.addEventListener('mousemove', (e) => {
    if (!tableDom || !info) return
    cancelAnimationFrame(moveRaf)
    moveRaf = requestAnimationFrame(() => {
      if (!tableDom) return setNear(false, false)
      const t = tableDom.getBoundingClientRect()
      const inX = e.clientX >= t.left && e.clientX <= t.right + 22
      const inY = e.clientY >= t.top && e.clientY <= t.bottom + 22
      setNear(inX && e.clientY >= t.bottom - 14 && e.clientY <= t.bottom + 22, inY && e.clientX >= t.right - 14 && e.clientX <= t.right + 22)
    })
  })
  scroller.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  window.visualViewport?.addEventListener('resize', update)
  editor.on('blur', () => setTimeout(update, 120))
  editor.on('focus', update)

  return {
    update,
    // F10: move keyboard focus onto the table controls
    focusControls() {
      info = locate()
      if (!info) return false
      render()
      colGrip.focus()
      return true
    },
    inTable: () => !!locate(),
  }
}
