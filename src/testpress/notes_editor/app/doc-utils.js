// Pure helpers over TipTap/ProseMirror JSON. No DOM, no editor instance.

export const FALLBACK_TITLE = 'Untitled note'

function walk(node, fn) {
  fn(node)
  ;(node.content || []).forEach((c) => walk(c, fn))
}

export function textOf(node) {
  if (!node) return ''
  if (node.type === 'text') return node.text || ''
  return (node.content || []).map(textOf).join(node.type === 'doc' ? '\n' : ' ').replace(/\s+/g, ' ').trim()
}

// Title rule: explicit title, else first body line, else "Untitled note".
export function deriveTitle(doc) {
  const [title, ...body] = doc.content || []
  const explicit = textOf(title)
  if (explicit) return { title: explicit, derived: false }
  for (const block of body) {
    const t = textOf(block)
    if (t) return { title: t.length > 80 ? t.slice(0, 80) + '…' : t, derived: true }
  }
  return { title: FALLBACK_TITLE, derived: true }
}

export function deriveSnippet(doc) {
  const [title, ...body] = doc.content || []
  const parts = []
  for (const block of body) {
    const t = textOf(block)
    if (t) parts.push(t)
    if (parts.join(' ').length > 140) break
  }
  let s = parts.join(' ')
  // When the title was derived from the first body line, don't repeat it in the snippet.
  if (!textOf(title) && parts.length) s = parts.slice(1).join(' ')
  return s.length > 140 ? s.slice(0, 140) : s
}

// "Empty" means nothing a student would miss: no text, no divider, no checklist item.
export function isEmptyDoc(doc) {
  let hasContent = false
  walk(doc, (n) => {
    if (n.type === 'text' && (n.text || '').trim()) hasContent = true
    if (n.type === 'horizontalRule' || n.type === 'taskItem') hasContent = true
  })
  return !hasContent
}

export function emptyDoc() {
  return { type: 'doc', content: [{ type: 'title' }, { type: 'paragraph' }] }
}

// Tiny inline parser for seed data: **bold**, ==highlight==, `code`, _sub_ not needed.
export function inline(str) {
  const out = []
  const re = /(\*\*[^*]+\*\*|==[^=]+==|`[^`]+`)/g
  let last = 0
  let m
  while ((m = re.exec(str))) {
    if (m.index > last) out.push({ type: 'text', text: str.slice(last, m.index) })
    const tok = m[0]
    if (tok.startsWith('**')) out.push({ type: 'text', text: tok.slice(2, -2), marks: [{ type: 'bold' }] })
    else if (tok.startsWith('==')) out.push({ type: 'text', text: tok.slice(2, -2), marks: [{ type: 'highlight' }] })
    else out.push({ type: 'text', text: tok.slice(1, -1), marks: [{ type: 'code' }] })
    last = m.index + tok.length
  }
  if (last < str.length) out.push({ type: 'text', text: str.slice(last) })
  return out
}

// Block builder: ['h2','x'] ['p','x'] ['ul',[..]] ['ol',[..]] ['task',[[checked,'x'],..]] ['quote','x'] ['hr']
export function buildDoc(title, blocks) {
  const para = (s) => ({ type: 'paragraph', content: inline(s) })
  const content = [{ type: 'title', content: title ? [{ type: 'text', text: title }] : undefined }]
  blocks.forEach(([kind, val]) => {
    if (kind === 'p') content.push(para(val))
    else if (/^h[1-3]$/.test(kind)) content.push({ type: 'heading', attrs: { level: +kind[1] }, content: inline(val) })
    else if (kind === 'ul' || kind === 'ol')
      content.push({
        type: kind === 'ul' ? 'bulletList' : 'orderedList',
        content: val.map((s) => ({ type: 'listItem', content: [para(s)] })),
      })
    else if (kind === 'task')
      content.push({
        type: 'taskList',
        content: val.map(([checked, s]) => ({ type: 'taskItem', attrs: { checked }, content: [para(s)] })),
      })
    else if (kind === 'quote') content.push({ type: 'blockquote', content: [para(val)] })
    else if (kind === 'hr') content.push({ type: 'horizontalRule' })
  })
  if (content.length === 1) content.push({ type: 'paragraph' })
  return { type: 'doc', content }
}
