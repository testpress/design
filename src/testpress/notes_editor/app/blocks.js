// Block/mark commands shared by the slash menu, desktop bubble menu and mobile tray.
// Everything runs through the editor instance; nothing here knows about the DOM chrome.

export const BLOCKS = [
  { id: 'paragraph', label: 'Text', hint: '', icon: 'type', keywords: 'text paragraph plain', active: (e) => e.isActive('paragraph') && !e.isActive('bulletList') && !e.isActive('orderedList') && !e.isActive('taskList') && !e.isActive('blockquote') },
  { id: 'h1', label: 'Heading 1', hint: '#', icon: 'heading-1', keywords: 'h1 heading title large', active: (e) => e.isActive('heading', { level: 1 }) },
  { id: 'h2', label: 'Heading 2', hint: '##', icon: 'heading-2', keywords: 'h2 heading subtitle', active: (e) => e.isActive('heading', { level: 2 }) },
  { id: 'h3', label: 'Heading 3', hint: '###', icon: 'heading-3', keywords: 'h3 heading small', active: (e) => e.isActive('heading', { level: 3 }) },
  { id: 'bullet', label: 'Bulleted list', hint: '-', icon: 'list', keywords: 'bullet list ul unordered', active: (e) => e.isActive('bulletList') },
  { id: 'ordered', label: 'Numbered list', hint: '1.', icon: 'list-ordered', keywords: 'number ordered list ol', active: (e) => e.isActive('orderedList') },
  { id: 'task', label: 'Checklist', hint: '[ ]', icon: 'list-checks', keywords: 'todo task checkbox checklist', active: (e) => e.isActive('taskList') },
  { id: 'quote', label: 'Quote', hint: '>', icon: 'text-quote', keywords: 'quote blockquote callout', active: (e) => e.isActive('blockquote') },
  { id: 'code', label: 'Code block', hint: '```', icon: 'code-xml', keywords: 'code snippet pre', active: (e) => e.isActive('codeBlock') },
]

export const DIVIDER = { id: 'divider', label: 'Divider', hint: '---', icon: 'minus', keywords: 'divider rule hr line separator' }

const TOGGLES = {
  h1: (c) => c.toggleHeading({ level: 1 }),
  h2: (c) => c.toggleHeading({ level: 2 }),
  h3: (c) => c.toggleHeading({ level: 3 }),
  bullet: (c) => c.toggleBulletList(),
  ordered: (c) => c.toggleOrderedList(),
  task: (c) => c.toggleTaskList(),
  quote: (c) => c.toggleBlockquote(),
  code: (c) => c.toggleCodeBlock(),
}

// "Turn into": flatten whatever the block currently is, then apply the target. Choosing the
// block type that is already active turns it back into plain text.
export function turnInto(editor, id) {
  const block = BLOCKS.find((b) => b.id === id)
  if (!block) return
  if (id === 'paragraph' || block.active(editor)) {
    editor.chain().focus().clearNodes().run()
    return
  }
  const chain = editor.chain().focus().clearNodes()
  TOGGLES[id](chain).run()
}

export function insertDivider(editor) {
  editor.chain().focus().setHorizontalRule().run()
}

export function currentBlockLabel(editor) {
  const hit = BLOCKS.find((b) => b.id !== 'paragraph' && b.active(editor))
  return hit ? hit.label : 'Text'
}

export function normalizeUrl(raw) {
  const v = (raw || '').trim()
  if (!v) return ''
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'mailto:' + v
  return 'https://' + v
}

export function applyLink(editor, raw) {
  const href = normalizeUrl(raw)
  const chain = editor.chain().focus()
  if (!href) chain.extendMarkRange('link').unsetLink().run()
  else chain.extendMarkRange('link').setLink({ href }).run()
}

export const MARKS = {
  bold: { run: (e) => e.chain().focus().toggleBold().run(), active: (e) => e.isActive('bold') },
  italic: { run: (e) => e.chain().focus().toggleItalic().run(), active: (e) => e.isActive('italic') },
  highlight: { run: (e) => e.chain().focus().toggleHighlight().run(), active: (e) => e.isActive('highlight') },
  strike: { run: (e) => e.chain().focus().toggleStrike().run(), active: (e) => e.isActive('strike') },
  code: { run: (e) => e.chain().focus().toggleCode().run(), active: (e) => e.isActive('code') },
}

export function indentList(editor, dir) {
  const item = editor.isActive('taskItem') ? 'taskItem' : 'listItem'
  if (!editor.isActive('bulletList') && !editor.isActive('orderedList') && !editor.isActive('taskList')) return false
  const chain = editor.chain().focus()
  return dir > 0 ? chain.sinkListItem(item).run() : chain.liftListItem(item).run()
}

export function inList(editor) {
  return editor.isActive('bulletList') || editor.isActive('orderedList') || editor.isActive('taskList')
}
