import { ui } from './ui.js'
import { Node, mergeAttributes } from '@tiptap/core'

// A highlighted box for something worth remembering. Holds any blocks, so it can contain
// paragraphs, lists, even a checklist. Enter on an empty last line leaves the box.
export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML: () => [{ tag: 'div[data-callout]' }],
  renderHTML: ({ HTMLAttributes }) => ['div', mergeAttributes(HTMLAttributes, { 'data-callout': '', class: ui.callout }), 0],
  addCommands() {
    return { toggleCallout: () => ({ commands }) => commands.toggleWrap(this.name) }
  },
})

// Keep an empty paragraph after the last block when that block is not text (table, divider, toggle,
// code block, callout...), so there is always somewhere to put the caret below it.
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export const TrailingParagraph = Extension.create({
  name: 'trailingParagraph',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('trailingParagraph'),
        appendTransaction: (trs, _old, state) => {
          if (!trs.some((tr) => tr.docChanged)) return null
          const last = state.doc.lastChild
          if (!last || last.type.name === 'paragraph' || last.type.name === 'title') return null
          const p = state.schema.nodes.paragraph.create()
          return state.tr.insert(state.doc.content.size, p)
        },
      }),
    ]
  },
})
