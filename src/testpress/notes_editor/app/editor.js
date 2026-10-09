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
import { BLOCKS, DIVIDER, turnInto, insertDivider } from './blocks.js'

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

// Title/body boundary behaviour: Enter leaves the title; Backspace/Delete never merge the two.
const TitleKeys = Extension.create({
  name: 'titleKeys',
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => (inTitle(editor.state) ? caretToBody(editor) : false),
      'Shift-Enter': ({ editor }) => (inTitle(editor.state) ? caretToBody(editor) : false),
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
      }
    },
  })
}

// Metadata line (folder · #tags) rendered as a widget between title and body.
function metaPlugin(getMeta) {
  return Extension.create({
    name: 'noteMeta',
    addProseMirrorPlugins: () => [
      new Plugin({
        key: new PluginKey('noteMeta'),
        props: {
          decorations(state) {
            const meta = getMeta()
            if (!meta || (!meta.folder && !meta.tags.length)) return null
            const key = `meta:${meta.id}:${meta.folder}:${meta.tags.join(',')}`
            const widget = () => {
              const el = document.createElement('div')
              el.className = 'note-meta'
              el.setAttribute('contenteditable', 'false')
              const parts = []
              if (meta.folder) parts.push(`<span class="note-meta__folder"><i data-lucide="folder" class="size-3.5"></i>${meta.folder}</span>`)
              meta.tags.forEach((t) => parts.push(`<span class="note-meta__tag">#${t}</span>`))
              el.innerHTML = parts.join('')
              if (window.lucide) window.lucide.createIcons({ nodes: [el] })
              return el
            }
            return DecorationSet.create(state.doc, [Decoration.widget(state.doc.firstChild.nodeSize, widget, { key, side: -1, ignoreSelection: true })])
          },
        },
      }),
    ],
  })
}

// ---- Slash menu ------------------------------------------------------------------------------
const SLASH_ITEMS = [...BLOCKS.filter((b) => b.id !== 'paragraph'), DIVIDER]

function runSlash(editor, range, item) {
  editor.chain().focus().deleteRange(range).run()
  if (item.id === 'divider') insertDivider(editor)
  else turnInto(editor, item.id)
}

function slashRenderer() {
  let el, items = [], index = 0, command, lastPointer = null

  // Full render only when the item list changes (typing). Arrow keys just move the highlight, so
  // a resting mouse pointer can't be re-triggered by replaced DOM and yank the selection back.
  const render = () => {
    el.innerHTML = items.length
      ? items
          .map(
            (it, i) => `<button type="button" id="slash-opt-${i}" role="option" tabindex="-1" aria-selected="false" data-i="${i}" class="slash-item">
              <i data-lucide="${it.icon}" class="size-4"></i><span class="slash-item__label">${it.label}</span><kbd class="slash-item__hint">${it.hint}</kbd></button>`
          )
          .join('')
      : '<div class="slash-empty">No matching blocks</div>'
    if (window.lucide) window.lucide.createIcons({ nodes: [el] })
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
      document.body.appendChild(el)
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
    },
    onKeyDown({ event }) {
      if (event.key === 'Escape') {
        el?.remove()
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
      el?.remove()
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
          return SLASH_ITEMS.filter((i) => !q || (i.label + ' ' + i.keywords).toLowerCase().includes(q))
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
          const first = ed.state.doc.firstChild.nodeSize
          if (node.type.name === 'paragraph' && pos === first && ed.state.doc.childCount === 2)
            return isMobile() ? 'Start writing…' : 'Start writing, or type / for blocks'
          return ''
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight,
      TitleKeys,
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
