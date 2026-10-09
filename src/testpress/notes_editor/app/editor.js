import { Editor, Extension, Node, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Suggestion, { SuggestionPluginKey } from '@tiptap/suggestion'
import { Plugin, PluginKey, TextSelection, EditorState } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { SLASH_ITEMS, turnInto, insertDivider, insertTable } from './blocks.js'
import { Callout, TrailingParagraph } from './nodes.js'
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table'
import { Details, DetailsSummary, DetailsContent } from '@tiptap/extension-details'
import { refreshIcons } from './icons.js'

// ---- Document shape: one title line + blocks, in a single editing surface. -------------------
const Doc = Node.create({ name: 'doc', topNode: true, content: 'title block+' })

const Title = Node.create({
  name: 'title',
  content: 'text*',
  marks: '',
  defining: true,
  parseHTML: () => [{ tag: 'h1[data-title]' }],
  renderHTML: ({ HTMLAttributes }) => ['h1', mergeAttributes(HTMLAttributes, { 'data-title': '' }), 0],
})

const inTitle = (state) => state.selection.$from.parent.type.name === 'title'

function caretToBody(editor) {
  const { state, view } = editor
  const titleEnd = state.doc.firstChild.nodeSize
  const sel = TextSelection.near(state.doc.resolve(titleEnd), 1)
  view.dispatch(state.tr.setSelection(sel).scrollIntoView())
  view.focus()
  return true
}

function caretToTitleEnd(editor) {
  const { state, view } = editor
  view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, state.doc.firstChild.nodeSize - 1)).scrollIntoView())
  return true
}

// Title/body boundary behaviour: Enter or Tab leaves the title; Backspace/Delete never merge the two.
const TitleKeys = Extension.create({
  name: 'titleKeys',
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => (inTitle(editor.state) ? caretToBody(editor) : false),
      'Shift-Enter': ({ editor }) => (inTitle(editor.state) ? caretToBody(editor) : false),
      Tab: ({ editor }) => (inTitle(editor.state) ? caretToBody(editor) : false),
      Delete: ({ editor }) => {
        const { selection } = editor.state
        if (!selection.empty || !inTitle(editor.state)) return false
        return selection.$from.parentOffset === selection.$from.parent.content.size // at title end: do nothing
      },
      Backspace: ({ editor }) => {
        const { selection } = editor.state
        if (!selection.empty || inTitle(editor.state)) return false
        const { $from } = selection
        const isFirstBodyBlock = $from.depth === 1 && $from.index(0) === 1 && $from.parentOffset === 0
        if (!isFirstBodyBlock) return false
        if ($from.parent.type.name === 'heading') return editor.commands.setParagraph()
        return caretToTitleEnd(editor)
      },
    }
  },
})

// Outline the table cell the caret is in (Notion-style), via a node decoration.
const activeCell = Extension.create({
  name: 'activeCell',
  addProseMirrorPlugins: () => [
    new Plugin({
      key: new PluginKey('activeCell'),
      props: {
        decorations(state) {
          const { $from, empty } = state.selection
          if (!empty) return null
          for (let d = $from.depth; d > 0; d--) {
            const n = $from.node(d)
            if (n.type.name === 'tableCell' || n.type.name === 'tableHeader') {
              const pos = $from.before(d)
              return DecorationSet.create(state.doc, [Decoration.node(pos, pos + n.nodeSize, { class: 'is-active-cell' })])
            }
          }
          return null
        },
      },
    }),
  ],
})

// Extra shortcuts so nothing in the editor needs a mouse.
function keyboardExtras({ onLinkShortcut }) {
  return Extension.create({
    name: 'keyboardExtras',
    addKeyboardShortcuts() {
      return {
        // toggle the checklist item under the caret
        'Mod-Enter': ({ editor }) => {
          if (!editor.isActive('taskItem')) return false
          const checked = editor.getAttributes('taskItem').checked
          return editor.commands.updateAttributes('taskItem', { checked: !checked })
        },
        'Mod-Shift-l': () => onLinkShortcut(),
        // dividers / blocks have no markdown trigger on a keypress; Mod-Alt-d inserts a divider
        'Mod-Alt-d': ({ editor }) => insertDivider(editor),
        // table: insert a row below the caret
        'Mod-Alt-Enter': ({ editor }) => (editor.isActive('table') ? editor.commands.addRowAfter() : false),
        // table: delete the current row / column (or every selected one) without opening a menu
        'Mod-Alt-Backspace': ({ editor }) => (editor.isActive('table') ? editor.commands.deleteRow() : false),
        'Mod-Alt--': ({ editor }) => (editor.isActive('table') ? editor.commands.deleteColumn() : false),
      }
    },
  })
}

// Metadata line (folder · #tags) rendered as a widget between title and body.
function metaPlugin(getMeta) {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  return Extension.create({
    name: 'noteMeta',
    addProseMirrorPlugins: () => [
      new Plugin({
        key: new PluginKey('noteMeta'),
        props: {
          decorations(state) {
            const meta = getMeta()
            if (!meta) return null
            const key = `meta:${meta.id}:${meta.folder}:${meta.tags.join(',')}`
            const widget = () => {
              const el = document.createElement('div')
              const empty = !meta.folder && !meta.tags.length
              el.className = 'note-meta' + (empty ? ' note-meta--empty' : '')
              el.setAttribute('contenteditable', 'false')
              const parts = []
              if (empty) {
                parts.push('<button type="button" data-meta="folder" class="note-meta__hint" aria-haspopup="dialog">Add folder</button><span class="note-meta__dot" aria-hidden="true">or</span><button type="button" data-meta="tags" class="note-meta__hint" aria-haspopup="dialog">tags</button>')
              } else {
                parts.push(
                  `<button type="button" data-meta="folder" class="note-meta__folder${meta.folder ? '' : ' is-unset'}" aria-haspopup="dialog" aria-label="Folder: ${meta.folder ? esc(meta.folder) : 'none'}"><i data-lucide="folder" class="size-3.5"></i>${meta.folder ? esc(meta.folder) : 'Add folder'}</button>`
                )
                meta.tags.forEach((t) =>
                  parts.push(`<span class="note-meta__tag"><span>#${esc(t)}</span><button type="button" data-meta="remove-tag" data-tag="${esc(t)}" aria-label="Remove tag ${esc(t)}">&times;</button></span>`)
                )
                parts.push('<button type="button" data-meta="tags" class="note-meta__add" aria-haspopup="dialog" aria-label="Add tag">+ Tag</button>')
              }
              el.innerHTML = parts.join('')
              refreshIcons(el)
              return el
            }
            // stopEvent: clicks/keys on the chips belong to the page, not to ProseMirror
            return DecorationSet.create(state.doc, [Decoration.widget(state.doc.firstChild.nodeSize, widget, { key, side: -1, ignoreSelection: true, stopEvent: () => true })])
          },
        },
      }),
    ],
  })
}

// ---- Slash menu ------------------------------------------------------------------------------
function runSlash(editor, range, item) {
  editor.chain().focus().deleteRange(range).run()
  if (item.id === 'divider') insertDivider(editor)
  else if (item.id === 'table') insertTable(editor)
  else turnInto(editor, item.id)
}

// While the block menu is open the note behind it must not scroll (the menu is anchored to the
// caret). Hide the scroller's overflow and pad by the scrollbar's width so the text doesn't shift.
// Programmatic scrolling still works, so typing keeps the caret in view. Desktop only.
const phone = window.matchMedia('(max-width: 1023px)')
let scrollLocked = null
function lockPageScroll() {
  if (scrollLocked || phone.matches) return
  const sc = document.getElementById('editor-scroll')
  if (!sc) return
  sc.style.setProperty('--sbw', sc.offsetWidth - sc.clientWidth + 'px')
  sc.classList.add('is-scroll-locked')
  scrollLocked = sc
}
function unlockPageScroll() {
  if (!scrollLocked) return
  scrollLocked.classList.remove('is-scroll-locked')
  scrollLocked.style.removeProperty('--sbw')
  scrollLocked = null
}

function slashRenderer() {
  let el, items = [], index = 0, command, lastPointer = null, preview = null

  // Full render only when the item list changes (typing). Arrow keys just move the highlight, so
  // a resting mouse pointer can't be re-triggered by replaced DOM and yank the selection back.
  const render = () => {
    el.innerHTML = items.length
      ? items
          .map(
            (it, i) => `${i === 0 || it.group !== items[i - 1].group ? `<div class="slash-group" role="presentation">${it.group}</div>` : ''}<button type="button" id="slash-opt-${i}" role="option" tabindex="-1" aria-selected="false" data-i="${i}" class="slash-item">
              <i data-lucide="${it.icon}" class="size-4"></i><span class="slash-item__label">${it.label}</span><kbd class="slash-item__hint">${it.hint}</kbd></button>`
          )
          .join('')
      : '<div class="slash-empty">No matching blocks</div>'
    el.insertAdjacentHTML('beforeend', '<div class="slash-foot" aria-hidden="true">Close menu<kbd>esc</kbd></div>')
    refreshIcons(el)
    highlightIndex(false)
  }

  const highlightIndex = (scroll = true) => {
    el.querySelectorAll('.slash-item').forEach((n, i) => {
      const on = i === index
      n.classList.toggle('is-active', on)
      n.setAttribute('aria-selected', on)
      if (on && scroll) n.scrollIntoView({ block: 'nearest' })
    })
    const active = el.querySelector('.is-active')
    // the editor keeps DOM focus, so announce the active option through it
    if (active) editorDom?.setAttribute('aria-activedescendant', active.id)
    else editorDom?.removeAttribute('aria-activedescendant')
    updatePreview(active)
  }

  // Mini window beside the menu that shows what the highlighted block looks like (decorative:
  // the option label is what assistive tech announces).
  const updatePreview = (active) => {
    if (!preview) return
    const item = items[index]
    if (!active || !item?.sample) {
      preview.style.display = 'none'
      return
    }
    preview.innerHTML = `<div class="slash-preview__page note-mini">${item.sample}</div><div class="slash-preview__cap">${item.desc || item.label}</div>`
    preview.style.display = 'block'
    const m = el.getBoundingClientRect()
    const a = active.getBoundingClientRect()
    const vv = window.visualViewport
    const vw = vv ? vv.width : innerWidth
    const vh = vv ? vv.height : innerHeight
    const top0 = vv ? vv.offsetTop : 0
    const w = preview.offsetWidth
    const h = preview.offsetHeight
    let left = m.right + 8
    if (left + w > vw - 8) left = m.left - w - 8 // no room on the right -> put it on the left
    if (left < 8) {
      preview.style.display = 'none' // phones: not enough room beside the menu
      return
    }
    const top = Math.min(Math.max(a.top - 8, top0 + 8), top0 + vh - h - 8)
    preview.style.left = left + 'px'
    preview.style.top = top + 'px'
  }

  let editorDom = null

  const place = (rect) => {
    if (!rect) return
    const vv = window.visualViewport
    const vw = vv ? vv.width : innerWidth
    const vh = vv ? vv.height : innerHeight
    const top0 = vv ? vv.offsetTop : 0
    const w = el.offsetWidth
    const h = el.offsetHeight
    let left = Math.min(Math.max(8, rect.left), vw - w - 8)
    let top = rect.bottom + 6
    if (top + h > top0 + vh - 8) top = Math.max(top0 + 8, rect.top - h - 6) // flip above
    el.style.left = left + 'px'
    el.style.top = top + 'px'
  }

  const move = (delta) => {
    index = (index + delta + items.length) % items.length
    highlightIndex()
  }

  return {
    onStart(props) {
      editorDom = props.editor.view.dom
      el = document.createElement('div')
      el.className = 'slash-menu'
      el.id = 'slash-menu'
      el.setAttribute('role', 'listbox')
      el.setAttribute('aria-label', 'Insert block')
      editorDom.setAttribute('aria-controls', 'slash-menu')
      // keep editor focus + selection when clicking the menu
      el.addEventListener('mousedown', (e) => e.preventDefault())
      el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-i]')
        if (b) command(items[+b.dataset.i])
      })
      // Hover only counts when the pointer really moved, never when content moved under it.
      el.addEventListener('mousemove', (e) => {
        if (lastPointer && lastPointer.x === e.clientX && lastPointer.y === e.clientY) return
        lastPointer = { x: e.clientX, y: e.clientY }
        const b = e.target.closest('[data-i]')
        if (b && +b.dataset.i !== index) {
          index = +b.dataset.i
          highlightIndex(false)
        }
      })
      preview = document.createElement('div')
      preview.className = 'slash-preview'
      preview.setAttribute('aria-hidden', 'true')
      preview.style.display = 'none'
      document.body.append(el, preview)
      lockPageScroll()
      this.onUpdate(props)
    },
    onUpdate(props) {
      const prev = items.map((i) => i.id).join()
      items = props.items
      command = props.command
      if (items.map((i) => i.id).join() !== prev) index = 0 // new result set -> first match
      index = Math.min(index, Math.max(0, items.length - 1))
      render()
      place(props.clientRect?.())
      updatePreview(el.querySelector('.is-active'))
    },
    onKeyDown({ event }) {
      if (event.key === 'Escape') {
        el?.remove()
        preview?.remove()
        unlockPageScroll()
        return true
      }
      if (!items.length) return false
      const mod = event.metaKey || event.ctrlKey || event.altKey
      if (event.key === 'ArrowDown' || (event.ctrlKey && event.key === 'n')) return move(1), true
      if (event.key === 'ArrowUp' || (event.ctrlKey && event.key === 'p')) return move(-1), true
      if (event.key === 'PageDown') return move(Math.min(4, items.length - 1 - index) || 1), true
      if (event.key === 'PageUp') return move(-Math.min(4, index) || -1), true
      if (event.key === 'Home' && !mod) return (index = 0), highlightIndex(), true
      if (event.key === 'End' && !mod) return (index = items.length - 1), highlightIndex(), true
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault()
        command(items[index])
        return true
      }
      return false
    },
    onExit() {
      unlockPageScroll()
      el?.remove()
      preview?.remove()
      preview = null
      el = null
      index = 0
      lastPointer = null
      editorDom?.removeAttribute('aria-activedescendant')
      editorDom?.removeAttribute('aria-controls')
    },
  }
}

const SlashCommands = Extension.create({
  name: 'slashCommands',
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        allowSpaces: false,
        items: ({ query }) => {
          const q = query.toLowerCase().trim()
          if (!q) return SLASH_ITEMS
          // label starts with the query > label contains it > only a keyword matches; ties keep menu order
          const rank = (i) => (i.label.toLowerCase().startsWith(q) ? 0 : i.label.toLowerCase().includes(q) ? 1 : i.keywords.toLowerCase().includes(q) ? 2 : 3)
          return SLASH_ITEMS.map((i, n) => ({ i, n, r: rank(i) }))
            .filter((x) => x.r < 3)
            .sort((a, b) => a.r - b.r || a.n - b.n)
            .map((x) => x.i)
        },
        allow: ({ state, range }) => state.doc.resolve(range.from).parent.type.name === 'paragraph',
        command: ({ editor, range, props }) => runSlash(editor, range, props),
        render: slashRenderer,
      }),
    ]
  },
})

// ---- Editor factory --------------------------------------------------------------------------
export function createNotesEditor({ element, bubbleEl, shouldShowBubble, getMeta, isMobile, onDocChange, onSelection, onFocusChange, onLinkShortcut, onEscape }) {
  const editor = new Editor({
    element,
    extensions: [
      Doc,
      Title,
      StarterKit.configure({
        document: false,
        underline: false,
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({ node, pos, editor: ed }) => {
          if (node.type.name === 'title') return 'Title'
          if (node.type.name === 'detailsSummary') return 'Toggle title'
          const first = ed.state.doc.firstChild.nodeSize
          if (node.type.name === 'paragraph' && pos === first && ed.state.doc.childCount === 2)
            return isMobile() ? 'Start writing…' : 'Start writing, or type / for blocks'
          return ''
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Callout,
      TrailingParagraph,
      Details.configure({ persist: true, HTMLAttributes: { class: 'toggle' } }),
      DetailsSummary,
      DetailsContent,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight,
      TitleKeys,
      activeCell,
      keyboardExtras({ onLinkShortcut }),
      SlashCommands,
      metaPlugin(getMeta),
      BubbleMenu.configure({
        element: bubbleEl,
        shouldShow: shouldShowBubble,
        options: { strategy: 'fixed', placement: 'top', offset: 10, flip: true, shift: { padding: 8 } },
      }),
    ],
    editorProps: {
      attributes: { class: 'note-prose', 'aria-label': 'Note editor', spellcheck: 'true' },
      scrollMargin: { top: 24, bottom: 140, left: 0, right: 0 },
      scrollThreshold: { top: 24, bottom: 140, left: 0, right: 0 },
      handleKeyDown: (view, e) => {
        if (e.key !== 'Escape') return false
        // an open slash menu owns Escape (editorProps run before plugin handlers)
        if (SuggestionPluginKey.getState(view.state)?.active) return false
        if (!view.state.selection.empty) {
          const { to } = view.state.selection
          view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, to)))
          return true
        }
        return onEscape ? onEscape() : false
      },
    },
    onUpdate: ({ editor: ed, transaction }) => {
      if (transaction.docChanged) onDocChange(ed.getJSON())
    },
    onSelectionUpdate: ({ editor: ed }) => onSelection(ed),
    onTransaction: ({ editor: ed }) => onSelection(ed),
    onFocus: () => onFocusChange(true),
    onBlur: () => onFocusChange(false),
  })
  return editor
}

// Swap the whole document (note switching) while keeping each note's own undo history and
// selection: the caller caches the EditorState it gets back and hands it in next time.
export function stateForDoc(editor, docJSON) {
  const doc = editor.schema.nodeFromJSON(docJSON)
  return EditorState.create({ doc, plugins: editor.state.plugins })
}
