import { refreshIcons } from './icons.js'

// Library browsing: pick a folder, narrow by tags (several tags = AND), manage them in place.
// State lives here; the notes list reads it through `state` and re-renders on `onChange`.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const cleanFolder = (s) => s.trim().replace(/\s+/g, ' ').slice(0, 40)
const cleanTag = (s) => s.trim().replace(/^#+/, '').trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}_-]/gu, '').slice(0, 30)

export function createFiltersUI({ store, folderBtn, tagsBtn, clearBtn, onChange }) {
  const state = { folder: null, tags: new Set() }
  const pop = document.createElement('div')
  pop.className = 'meta-pop lib-pop'
  pop.hidden = true
  pop.setAttribute('role', 'dialog')
  document.body.appendChild(pop)

  let kind = null // 'folder' | 'tags'
  let anchor = null
  let index = 0
  let rows = []
  let mode = { type: 'browse' } // or { type: 'rename', key } | { type: 'confirm', key }

  const labelOf = () => (state.folder ? state.folder : 'All notes')

  function renderButtons() {
    folderBtn.querySelector('.filter-btn__label').textContent = labelOf()
    folderBtn.classList.toggle('is-set', !!state.folder)
    const n = state.tags.size
    tagsBtn.querySelector('.filter-btn__label').textContent = n ? `${n} tag${n > 1 ? 's' : ''}` : 'Tags'
    tagsBtn.classList.toggle('is-set', n > 0)
    clearBtn.hidden = !state.folder && !n
  }

  function changed() {
    renderButtons()
    onChange()
  }

  function position() {
    if (!anchor) return
    const r = anchor.getBoundingClientRect()
    const vv = window.visualViewport
    const vw = vv ? vv.width : innerWidth
    const vh = vv ? vv.height : innerHeight
    const w = pop.offsetWidth
    const h = pop.offsetHeight
    const left = Math.min(Math.max(8, r.left), vw - w - 8)
    let top = r.bottom + 6
    if (top + h > vh - 8) top = Math.max(8, vh - h - 8)
    pop.style.left = left + 'px'
    pop.style.top = top + 'px'
  }

  // ---- building the rows -----------------------------------------------------------------------
  function build(query) {
    const q = query.trim().toLowerCase()
    const out = []
    if (kind === 'folder') {
      const counts = store.folderCounts()
      if (!q) out.push({ key: '__all', label: 'All notes', count: store.notes.size, on: !state.folder, fixed: true })
      store.folders().filter((f) => !q || f.toLowerCase().includes(q)).forEach((f) => out.push({ key: f, label: f, count: counts.get(f) || 0, on: state.folder === f }))
      const typed = cleanFolder(query)
      if (typed && !store.folders().some((f) => f.toLowerCase() === typed.toLowerCase())) out.push({ key: '__new', label: `Create folder “${typed}”`, create: typed, fixed: true })
    } else {
      const counts = store.tagCounts()
      store.tags().filter((t) => !q || t.includes(cleanTag(query))).forEach((t) => out.push({ key: t, label: '#' + t, count: counts.get(t) || 0, on: state.tags.has(t) }))
    }
    return out
  }

  function paint(focusInput = true, keepQuery = true) {
    const input = pop.querySelector('input')
    const query = keepQuery && input ? input.value : ''
    rows = build(query)
    index = Math.min(index, rows.length - 1) // -1 = nothing highlighted yet
    const title = kind === 'folder' ? 'Folders' : 'Tags'
    pop.setAttribute('aria-label', title)
    const body = rows.length
      ? rows.map((r, i) => rowHTML(r, i)).join('')
      : `<div class="meta-pop__empty">${kind === 'folder' ? 'No folders yet. Type a name to create one.' : 'No tags yet. Add tags from a note.'}</div>`
    pop.innerHTML = `
      <div class="meta-pop__head">${title}${kind === 'tags' ? '<span class="lib-hint"> · notes must have all selected</span>' : ''}</div>
      <input type="text" autocomplete="off" spellcheck="false" class="meta-pop__input" role="combobox" aria-expanded="true" aria-controls="lib-list" aria-label="${kind === 'folder' ? 'Find or create a folder' : 'Find a tag'}" placeholder="${kind === 'folder' ? 'Find or create a folder' : 'Find a tag'}" value="${esc(query)}">
      <div id="lib-list" class="meta-pop__list" role="listbox" ${kind === 'tags' ? 'aria-multiselectable="true"' : ''}>${body}</div>
      <div class="meta-pop__foot">${kind === 'folder' ? 'Enter open · F2 rename · Del delete' : 'Enter toggle · F2 rename · Del remove'}</div>`
    refreshIcons(pop)
    const el = pop.querySelector('input')
    if (focusInput && mode.type === 'browse') {
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
    if (mode.type === 'rename') {
      const r = pop.querySelector('.lib-rename')
      r?.focus()
      r?.select()
    }
    if (mode.type === 'confirm') pop.querySelector('[data-confirm="yes"]')?.focus()
    el.setAttribute('aria-activedescendant', index >= 0 && rows.length ? 'lib-o' + index : '')
    // keep the confirmation card (or the highlighted row) fully inside the scrolling list
    ;(pop.querySelector('.lib-confirm') || pop.querySelector('.is-active'))?.scrollIntoView({ block: 'nearest' })
    position()
  }

  function rowHTML(r, i) {
    const active = i === index
    if (mode.type === 'rename' && mode.key === r.key)
      return `<div class="lib-row is-active"><input class="lib-rename" aria-label="Rename" value="${esc(kind === 'tags' ? r.key : r.label)}"></div>`
    if (mode.type === 'confirm' && mode.key === r.key) {
      const isFolder = kind === 'folder'
      const n = r.count
      const title = isFolder ? `Delete “${esc(r.label)}”?` : `Remove ${esc(r.label)}?`
      const note = isFolder
        ? n ? `Its ${n} note${n === 1 ? '' : 's'} will stay, unfiled.` : 'This folder is empty.'
        : n ? `It will be taken off ${n} note${n === 1 ? '' : 's'}. The notes stay.` : 'No notes use this tag.'
      return `<div class="lib-confirm" role="group" aria-label="Confirm delete">
        <div class="lib-confirm__text"><strong>${title}</strong><span>${note}</span></div>
        <div class="lib-confirm__btns"><button type="button" data-confirm="no" class="lib-no">Cancel</button><button type="button" data-confirm="yes" class="lib-yes">${isFolder ? 'Delete' : 'Remove'}</button></div>
      </div>`
    }
    const manage = r.fixed ? '' : `<span class="lib-actions"><button type="button" tabindex="-1" data-act="rename" data-k="${esc(r.key)}" aria-label="Rename ${esc(r.label)}"><i data-lucide="pencil" class="size-3.5"></i></button><button type="button" tabindex="-1" data-act="delete" data-k="${esc(r.key)}" aria-label="Delete ${esc(r.label)}"><i data-lucide="trash-2" class="size-3.5"></i></button></span>`
    const check = kind === 'tags' ? `<span class="lib-check ${r.on ? 'is-on' : ''}" aria-hidden="true">${r.on ? '✓' : ''}</span>` : ''
    return `<div role="option" id="lib-o${i}" aria-selected="${r.on ? 'true' : 'false'}" data-i="${i}" class="meta-opt lib-row ${active ? 'is-active' : ''} ${r.create ? 'is-create' : ''}">${check}<span class="lib-label">${esc(r.label)}</span>${r.count != null ? `<span class="lib-count">${r.count}</span>` : ''}${manage}${kind === 'folder' && r.on ? '<i data-lucide="check" class="size-4"></i>' : ''}</div>`
  }

  // ---- actions ---------------------------------------------------------------------------------
  function activate(r) {
    if (!r) return
    if (kind === 'folder') {
      if (r.create) {
        store.createFolder(r.create)
        state.folder = r.create
      } else state.folder = r.key === '__all' ? null : r.key
      close(true)
      changed()
    } else {
      state.tags.has(r.key) ? state.tags.delete(r.key) : state.tags.add(r.key)
      changed()
      paint()
    }
  }

  function commitRename(row, value) {
    mode = { type: 'browse' }
    const to = kind === 'folder' ? cleanFolder(value) : cleanTag(value)
    if (to && to !== row.key) {
      if (kind === 'folder') {
        store.renameFolder(row.key, to)
        if (state.folder === row.key) state.folder = to
      } else {
        store.renameTag(row.key, to)
        if (state.tags.delete(row.key)) state.tags.add(to)
      }
      changed()
    }
    paint()
  }

  function doDelete(row) {
    mode = { type: 'browse' }
    if (kind === 'folder') {
      store.deleteFolder(row.key)
      if (state.folder === row.key) state.folder = null
    } else {
      store.deleteTag(row.key)
      state.tags.delete(row.key)
    }
    changed()
    paint()
  }

  function open(which, el) {
    if (!pop.hidden && kind === which) return close(true)
    kind = which
    anchor = el
    index = -1 // nothing is highlighted until you hover, press an arrow key or type
    mode = { type: 'browse' }
    pop.hidden = false
    el.setAttribute('aria-expanded', 'true')
    paint(true, false)
  }

  function close(refocus) {
    if (pop.hidden) return
    pop.hidden = true
    folderBtn.setAttribute('aria-expanded', 'false')
    tagsBtn.setAttribute('aria-expanded', 'false')
    mode = { type: 'browse' }
    if (refocus && anchor) anchor.focus()
    kind = null
  }

  // ---- events ----------------------------------------------------------------------------------
  folderBtn.addEventListener('click', () => open('folder', folderBtn))
  tagsBtn.addEventListener('click', () => open('tags', tagsBtn))
  clearBtn.addEventListener('click', () => {
    state.folder = null
    state.tags.clear()
    changed()
  })
  pop.addEventListener('mousedown', (e) => {
    if (!e.target.closest('input')) e.preventDefault()
  })
  pop.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')
    if (act) {
      const row = rows.find((r) => r.key === act.dataset.k)
      mode = { type: act.dataset.act === 'rename' ? 'rename' : 'confirm', key: row.key }
      index = rows.indexOf(row)
      return paint(false)
    }
    const conf = e.target.closest('[data-confirm]')
    if (conf) {
      const row = rows.find((r) => r.key === mode.key)
      return conf.dataset.confirm === 'yes' ? doDelete(row) : ((mode = { type: 'browse' }), paint())
    }
    const o = e.target.closest('[data-i]')
    if (o) {
      index = +o.dataset.i
      activate(rows[index])
    }
  })
  // Hovering moves the one highlight (like the block menu) so mouse and keyboard never show two rows.
  // Only a real pointer movement counts, so re-rendered rows under a resting pointer don't steal it.
  let lastPtr = null
  pop.addEventListener('mousemove', (e) => {
    if (lastPtr && lastPtr.x === e.clientX && lastPtr.y === e.clientY) return
    lastPtr = { x: e.clientX, y: e.clientY }
    const row = e.target.closest('[data-i]')
    if (!row || mode.type !== 'browse' || +row.dataset.i === index) return
    index = +row.dataset.i
    pop.querySelectorAll('.lib-row[data-i]').forEach((n) => n.classList.toggle('is-active', +n.dataset.i === index))
    pop.querySelector('input')?.setAttribute('aria-activedescendant', 'lib-o' + index)
  })
  pop.addEventListener('input', (e) => {
    if (e.target.classList.contains('lib-rename')) return
    index = pop.querySelector('input').value.trim() ? 0 : -1 // searching: first match, so Enter works
    paint()
  })
  pop.addEventListener('keydown', (e) => {
    const target = e.target
    if (target.classList.contains('lib-rename')) {
      if (e.key === 'Enter') {
        e.preventDefault()
        return commitRename(rows.find((r) => r.key === mode.key), target.value)
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        mode = { type: 'browse' }
        return paint()
      }
      return
    }
    if (mode.type === 'confirm') {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        mode = { type: 'browse' }
        paint()
      } else if (e.key === 'Enter' && target.dataset.confirm === 'yes') {
        e.preventDefault()
        doDelete(rows.find((r) => r.key === mode.key))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        pop.querySelectorAll('[data-confirm]')[e.key === 'ArrowLeft' ? 0 : 1].focus()
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      return close(true)
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!rows.length) return
      index = index < 0 ? (e.key === 'ArrowDown' ? 0 : rows.length - 1) : (index + (e.key === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length
      pop.querySelectorAll('.lib-row').forEach((n, i) => {
        n.classList.toggle('is-active', i === index)
      })
      pop.querySelector('input').setAttribute('aria-activedescendant', 'lib-o' + index)
      pop.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (index >= 0) activate(rows[index])
    } else if (e.key === 'F2' && rows[index] && !rows[index].fixed) {
      e.preventDefault()
      mode = { type: 'rename', key: rows[index].key }
      paint(false)
    } else if ((e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) && rows[index] && !rows[index].fixed) {
      e.preventDefault()
      mode = { type: 'confirm', key: rows[index].key }
      paint(false)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      close(true)
    }
  })
  document.addEventListener('mousedown', (e) => {
    if (!pop.hidden && !e.target.closest('.lib-pop, #filter-folder, #filter-tags')) close(false)
  })
  window.addEventListener('resize', () => !pop.hidden && position())

  renderButtons()
  return {
    state,
    close,
    // does a note pass the current folder + tag filters?
    matches: (n) => (!state.folder || n.folder === state.folder) && [...state.tags].every((t) => (n.tags || []).includes(t)),
    scoped: () => !!state.folder || state.tags.size > 0,
    clear: () => {
      state.folder = null
      state.tags.clear()
      changed()
    },
    refresh: renderButtons,
  }
}
