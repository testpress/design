import { ui } from './ui.js'
import { refreshIcons } from './icons.js'

// Folder + tag editing for the open note. One popover element is reused:
//  - folder: single choice. Search box, "None", existing folders, and "Create “x”" for new names.
//  - tags: type and press Enter to add (creating the tag when it is new); Backspace on an empty
//    field removes the last tag; existing tags are suggested.
// Everything is keyboard driven (↑ ↓ Enter Esc) and returns focus to the note when it closes.

const clean = {
  folder: (s) => s.trim().replace(/\s+/g, ' ').slice(0, 40),
  tag: (s) => s.trim().replace(/^#+/, '').trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}_-]/gu, '').slice(0, 30),
}
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export function createMetaUI({ editor, store, getCurrentId, onChange }) {
  const pop = document.createElement('div')
  pop.className = ui.metaPop
  pop.hidden = true
  pop.setAttribute('role', 'dialog')
  document.body.appendChild(pop)

  let kind = null
  let anchor = null
  let opts = []
  let index = 0

  const note = () => store.get(getCurrentId())

  function position() {
    if (!anchor || !anchor.isConnected) return close(false)
    const r = anchor.getBoundingClientRect()
    const vv = window.visualViewport
    const vw = vv ? vv.width : innerWidth
    const vh = vv ? vv.height : innerHeight
    const w = pop.offsetWidth
    const h = pop.offsetHeight
    let left = Math.min(Math.max(8, r.left), vw - w - 8)
    let top = r.bottom + 6
    if (top + h > vh - 8) top = Math.max(8, r.top - h - 6)
    pop.style.left = left + 'px'
    pop.style.top = top + 'px'
  }

  function build() {
    const n = note()
    const q = pop.querySelector('input')?.value ?? ''
    const query = q.trim().toLowerCase()
    if (kind === 'folder') {
      const folders = store.folders()
      opts = query ? [] : [{ id: 'none', label: 'None', value: null, on: !n.folder }]
      folders.filter((f) => !query || f.toLowerCase().includes(query)).forEach((f) => opts.push({ id: 'f:' + f, label: f, value: f, on: n.folder === f }))
      const typed = clean.folder(q)
      // "Create" is offered unless the name already exists exactly; it comes last so Enter picks a real match first
      if (typed && !folders.some((f) => f.toLowerCase() === typed.toLowerCase())) opts.push({ id: 'new', label: `Create “${typed}”`, value: typed, create: true })
    } else {
      const have = new Set(n.tags || [])
      const typed = clean.tag(q)
      const all = store.tags().filter((t) => !have.has(t))
      opts = all.filter((t) => !typed || t.includes(typed)).map((t) => ({ id: 't:' + t, label: '#' + t, value: t }))
      if (typed && !have.has(typed) && !all.includes(typed)) opts.push({ id: 'new', label: `Create “#${typed}”`, value: typed, create: true })
    }
    index = Math.min(index, opts.length - 1) // -1 = nothing highlighted yet
    return opts
  }

  function paint(keepFocus = true) {
    const n = note()
    const inputVal = pop.querySelector('input')?.value ?? ''
    build()
    const title = kind === 'folder' ? 'Folder' : 'Tags'
    const chips = kind === 'tags' && n.tags?.length
      ? `<div class="${ui.popChips}">${n.tags.map((t) => `<span class="${ui.metaTag}"><span>#${esc(t)}</span><button type="button" class="${ui.metaTagX} !opacity-100" tabindex="-1" data-rm="${esc(t)}" aria-label="Remove tag ${esc(t)}">&times;</button></span>`).join('')}</div>`
      : ''
    pop.setAttribute('aria-label', title)
    pop.innerHTML = `
      <div class="${ui.popHead}">${title}</div>
      ${chips}
      <input type="text" autocomplete="off" spellcheck="false" aria-label="${kind === 'folder' ? 'Find or create a folder' : 'Add a tag'}" placeholder="${kind === 'folder' ? 'Find or create a folder' : 'Type a tag, press Enter'}" value="${esc(inputVal)}" class="${ui.popInput}" role="combobox" aria-expanded="true" aria-controls="meta-list">
      <div id="meta-list" class="${ui.popList}" role="listbox">
        ${opts.length ? opts.map((o, i) => `<button type="button" tabindex="-1" role="option" id="meta-o${i}" aria-selected="${i === index}" data-i="${i}" class="${ui.metaOpt} ${i === index ? 'is-active' : ''} ${o.create ? 'is-create' : ''}"><span>${esc(o.label)}</span>${o.on ? '<i data-lucide="check" class="size-4"></i>' : ''}</button>`).join('') : `<div class="${ui.popEmpty}">${kind === 'folder' ? 'No folders yet. Type a name to create one.' : 'No tags yet. Type to create one.'}</div>`}
      </div>
      <div class="${ui.popFoot}">${kind === 'folder' ? '↑ ↓ choose · Enter select · Esc close' : 'Enter add · Backspace remove last · Esc close'}</div>`
    refreshIcons(pop)
    const input = pop.querySelector('input')
    if (keepFocus) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
    input.setAttribute('aria-activedescendant', index >= 0 && opts.length ? 'meta-o' + index : '')
    pop.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' })
    position()
  }

  function open(which, el) {
    if (!getCurrentId()) return
    if (kind === which && anchor === el && !pop.hidden) return close(true)
    kind = which
    anchor = el
    index = -1
    pop.hidden = false
    pop.innerHTML = ''
    paint()
  }

  function close(refocus = true) {
    if (pop.hidden) return
    pop.hidden = true
    kind = null
    anchor = null
    if (refocus) editor.view.focus()
  }

  function choose(o) {
    const id = getCurrentId()
    if (!id || !o) return
    if (kind === 'folder') {
      store.setMeta(id, { folder: o.value })
      onChange(id)
      close(true)
    } else {
      const n = note()
      store.setMeta(id, { tags: [...(n.tags || []), o.value] })
      onChange(id)
      pop.querySelector('input').value = ''
      index = -1
      anchor = document.querySelector('.note-meta__add') || anchor
      paint()
    }
  }

  function addTypedTag() {
    const typed = clean.tag(pop.querySelector('input').value)
    if (!typed) return
    const n = note()
    if ((n.tags || []).includes(typed)) {
      pop.querySelector('input').value = ''
      return paint()
    }
    choose({ value: typed })
  }

  function removeTag(t) {
    const id = getCurrentId()
    const n = note()
    store.setMeta(id, { tags: (n.tags || []).filter((x) => x !== t) })
    onChange(id)
  }

  pop.addEventListener('mousedown', (e) => {
    if (!e.target.closest('input')) e.preventDefault()
  })
  pop.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-rm]')
    if (rm) {
      removeTag(rm.dataset.rm)
      anchor = document.querySelector('.note-meta__add') || anchor
      return paint()
    }
    const o = e.target.closest('[data-i]')
    if (o) choose(opts[+o.dataset.i])
  })
  pop.addEventListener('input', () => {
    index = pop.querySelector('input').value.trim() ? 0 : -1
    const keep = pop.querySelector('input').value
    paint()
    pop.querySelector('input').value = keep
  })
  pop.addEventListener('keydown', (e) => {
    const input = pop.querySelector('input')
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      return close(true)
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!opts.length) return
      index = index < 0 ? (e.key === 'ArrowDown' ? 0 : opts.length - 1) : (index + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length
      pop.querySelectorAll('.meta-opt').forEach((n, i) => {
        n.classList.toggle('is-active', i === index)
        n.setAttribute('aria-selected', i === index)
      })
      input.setAttribute('aria-activedescendant', 'meta-o' + index)
      pop.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (kind === 'tags') {
        // typed text wins; with nothing typed Enter picks the highlighted suggestion
        if (clean.tag(input.value)) {
          const exact = opts.find((o) => !o.create && o.value === clean.tag(input.value))
          return exact ? choose(exact) : addTypedTag()
        }
        if (opts[index]) choose(opts[index])
        else close(true)
      } else choose(opts[index])
    } else if (e.key === 'Backspace' && kind === 'tags' && !input.value) {
      const n = note()
      if (n.tags?.length) {
        e.preventDefault()
        removeTag(n.tags[n.tags.length - 1])
        anchor = document.querySelector('.note-meta__add') || anchor
        paint()
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      close(true)
    }
  })
  document.addEventListener('mousedown', (e) => {
    if (!pop.hidden && !e.target.closest('.meta-pop, .note-meta')) close(false)
  })
  window.addEventListener('resize', () => !pop.hidden && position())
  document.getElementById('editor-scroll')?.addEventListener('scroll', () => !pop.hidden && position(), { passive: true })

  return {
    open,
    close,
    isOpen: () => !pop.hidden,
    // click handling for the chips inside the editor
    handleClick(e) {
      const b = e.target.closest('[data-meta]')
      if (!b) return false
      e.preventDefault()
      const act = b.dataset.meta
      if (act === 'folder') open('folder', b)
      else if (act === 'tags') open('tags', b)
      else if (act === 'remove-tag') {
        removeTag(b.dataset.tag)
      }
      return true
    },
    openFolderFromKeyboard() {
      const el = document.querySelector('.note-meta [data-meta="folder"]')
      if (el) open('folder', el)
    },
    openTagsFromKeyboard() {
      const el = document.querySelector('.note-meta [data-meta="tags"]') || document.querySelector('.note-meta [data-meta="folder"]')
      if (el) open('tags', el)
    },
  }
}
