import { TableMap, addRow, addColumn, CellSelection } from '@tiptap/pm/tables'
import { refreshIcons } from './icons.js'

// Notion-style table editing. No floating toolbar: while the caret is in a table we show
//  - a "+" strip under the table (add row) and one at its right edge (add column)
//  - a grip on the active column's top edge and the active row's left edge; clicking one opens
//    a small menu (insert before/after, clear contents, delete)
// The active cell gets an outline (see editor.js). Everything keeps the caret where it was.

const DOTS_H = '<svg width="14" height="6" viewBox="0 0 14 6" fill="currentColor" aria-hidden="true"><circle cx="2" cy="3" r="1.2"/><circle cx="7" cy="3" r="1.2"/><circle cx="12" cy="3" r="1.2"/></svg>'
const DOTS_V = '<svg width="6" height="14" viewBox="0 0 6 14" fill="currentColor" aria-hidden="true"><circle cx="3" cy="2" r="1.2"/><circle cx="3" cy="7" r="1.2"/><circle cx="3" cy="12" r="1.2"/></svg>'
const PLUS = '<svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 1.5v9M1.5 6h9"/></svg>'

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

  let info = null // { tablePos, tableNode, tableStart, cellPos, row, col }
  let openKind = null
  let raf = 0

  // ---- where is the caret in the table? ------------------------------------------------------
  function locate() {
    const { state } = editor
    const sel = state.selection
    if (sel instanceof CellSelection) return null // multi-cell selection: leave the cells alone
    const $from = sel.$from
    let cellDepth = -1
    let tableDepth = -1
    for (let d = $from.depth; d > 0; d--) {
      const n = $from.node(d).type.name
      if (cellDepth < 0 && (n === 'tableCell' || n === 'tableHeader')) cellDepth = d
      if (n === 'table') {
        tableDepth = d
        break
      }
    }
    if (tableDepth < 0 || cellDepth < 0) return null
    const tableNode = $from.node(tableDepth)
    const tableStart = $from.start(tableDepth)
    const cellPos = $from.before(cellDepth)
    const map = TableMap.get(tableNode)
    const rel = cellPos - tableStart
    const rect = map.findCell(rel)
    return { tablePos: $from.before(tableDepth), tableNode, tableStart, cellPos, map, row: rect.top, col: rect.left }
  }

  const place = (el, x, y, w, h) => {
    el.style.left = Math.round(x) + 'px'
    el.style.top = Math.round(y) + 'px'
    if (w != null) el.style.width = Math.round(w) + 'px'
    if (h != null) el.style.height = Math.round(h) + 'px'
  }

  function hideAll() {
    buttons.forEach((b) => (b.hidden = true))
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
    const cell = editor.view.nodeDOM(info.cellPos)
    if (!table || !cell) return hideAll()
    const t = table.getBoundingClientRect()
    const c = cell.getBoundingClientRect()
    const s = scroller.getBoundingClientRect()
    if (t.bottom < s.top + 4 || t.top > s.bottom - 4) return hideAll() // scrolled out of view
    buttons.forEach((b) => (b.hidden = false))
    const topVisible = t.top - 18 >= s.top
    colGrip.hidden = !topVisible
    place(colGrip, c.left + c.width / 2 - 14, t.top - 17, 28, 14)
    place(rowGrip, t.left - 19, c.top + c.height / 2 - 14, 14, 28)
    place(addRowBtn, t.left, t.bottom + 4, t.width, 20)
    place(addColBtn, t.right + 4, t.top, 20, t.height)
    addRowBtn.hidden = t.bottom + 24 > s.bottom
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

  const cellsOf = (kind) => {
    const { map } = info
    const out = []
    if (kind === 'col') for (let r = 0; r < map.height; r++) out.push(map.map[r * map.width + info.col])
    else for (let c = 0; c < map.width; c++) out.push(map.map[info.row * map.width + c])
    return out
  }

  function addAtEnd(kind) {
    if (!info) return
    const { state, view } = editor
    const tr = kind === 'row' ? addRow(state.tr, rectFor(), info.map.height) : addColumn(state.tr, rectFor(), info.map.width)
    view.dispatch(tr)
    editor.view.focus()
  }

  const ACTIONS = {
    col: [
      { label: 'Insert left', icon: 'arrow-left', run: () => editor.chain().focus().addColumnBefore().run() },
      { label: 'Insert right', icon: 'arrow-right', run: () => editor.chain().focus().addColumnAfter().run() },
      { label: 'Clear contents', icon: 'circle-x', run: () => clearCells(cellsOf('col')) },
      { label: 'Delete column', icon: 'trash-2', danger: true, run: () => editor.chain().focus().deleteColumn().run() },
    ],
    row: [
      { label: 'Insert above', icon: 'arrow-up', run: () => editor.chain().focus().addRowBefore().run() },
      { label: 'Insert below', icon: 'arrow-down', run: () => editor.chain().focus().addRowAfter().run() },
      { label: 'Clear contents', icon: 'circle-x', run: () => clearCells(cellsOf('row')) },
      { label: 'Delete row', icon: 'trash-2', danger: true, run: () => editor.chain().focus().deleteRow().run() },
    ],
  }
  const ICON_DELETE_TABLE = { label: 'Delete table', icon: 'trash-2', danger: true, run: () => editor.chain().focus().deleteTable().run() }

  function openMenu(kind, fromKeyboard) {
    if (!info) return
    openKind = kind
    const items = [...ACTIONS[kind], ICON_DELETE_TABLE]
    menu.innerHTML = items
      .map((a, i) => `<button type="button" role="menuitem" tabindex="-1" data-i="${i}" class="tbl-item ${a.danger ? 'is-danger' : ''}"><i data-lucide="${a.icon}" class="size-4"></i><span>${a.label}</span></button>`)
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

  function closeMenu(refocus) {
    if (menu.hidden) return
    menu.hidden = true
    openKind = null
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
