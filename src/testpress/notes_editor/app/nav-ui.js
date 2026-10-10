import { refreshIcons } from './icons.js'

// The nav pane (stage 1): folders with counts and tags, as in the handoff. It shares its state with the
// filter popovers (`filters.state`), so picking a folder here and in the "All notes" dropdown is the same
// thing. Rename/delete/create work in place; Delete asks with the same inline confirmation card.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const cleanFolder = (s) => s.trim().replace(/\s+/g, ' ').slice(0, 40)

const FIND_BUTTON_MIN_FOLDERS = 8 // the magnifier only appears once the list is long enough to need it

export function createNavUI({ store, filters, foldersEl, tagsEl, newFolderBtn, tagsMenuBtn, findBtn, findRow, findInput, findClear }) {
  let mode = { type: 'idle' } // idle | create | rename:<name> | confirm:<name>
  let findQuery = ''
  const matches = (name) => !findQuery || name.toLowerCase().includes(findQuery.toLowerCase().replace(/^#/, ''))

  function render() {
    const counts = store.folderCounts()
    const total = store.notes.size
    const cur = filters.state.folder
    const folders = store.folders().filter(matches)
    const rows = findQuery ? [] : [
      `<button type="button" class="nav-row nav-row--all ${!cur ? 'is-active' : ''}" data-folder="" aria-current="${!cur}"><i data-lucide="layers" class="size-4"></i><span class="nav-row__label">All notes</span><span class="nav-row__count">${total}</span></button>`,
    ]
    if (mode.type === 'create')
      rows.push(`<div class="nav-row-edit"><input class="nav-rename" data-create aria-label="New folder name" placeholder="Folder name" autocomplete="off"></div>`)
    folders.forEach((f) => {
      if (mode.type === 'rename' && mode.key === f) return rows.push(`<div class="nav-row-edit"><input class="nav-rename" data-rename="${esc(f)}" aria-label="Rename folder" value="${esc(f)}" autocomplete="off"></div>`)
      if (mode.type === 'confirm' && mode.key === f) {
        const n = counts.get(f) || 0
        return rows.push(`<div class="lib-confirm" role="group" aria-label="Confirm delete"><div class="lib-confirm__text"><strong>Delete “${esc(f)}”?</strong><span>${n ? `Its ${n} note${n === 1 ? '' : 's'} will stay, unfiled.` : 'This folder is empty.'}</span></div><div class="lib-confirm__btns"><button type="button" data-confirm="no" class="lib-no">Cancel</button><button type="button" data-confirm="yes" class="lib-yes">Delete</button></div></div>`)
      }
      rows.push(`<div class="nav-row ${cur === f ? 'is-active' : ''}" data-folder="${esc(f)}" role="listitem">
        <button type="button" class="nav-row__main" data-folder-btn="${esc(f)}" aria-current="${cur === f}"><i data-lucide="folder" class="size-4"></i><span class="nav-row__label">${esc(f)}</span><span class="nav-row__count">${counts.get(f) || 0}</span></button>
        <span class="nav-actions"><button type="button" data-act="rename" data-k="${esc(f)}" aria-label="Rename ${esc(f)}"><i data-lucide="pencil" class="size-3.5"></i></button><button type="button" data-act="delete" data-k="${esc(f)}" aria-label="Delete ${esc(f)}"><i data-lucide="trash-2" class="size-3.5"></i></button></span></div>`)
    })
    if (findQuery && !folders.length) rows.push('<div class="nav-empty">No folders match</div>')
    foldersEl.innerHTML = rows.join('')
    findBtn.hidden = store.folders().length <= FIND_BUTTON_MIN_FOLDERS && !findQuery && findRow.hidden

    const tagCounts = store.tagCounts()
    const shownTags = store.tags().filter(matches)
    tagsEl.innerHTML = shownTags.length
      ? shownTags.map((t) => `<button type="button" class="nav-tag ${filters.state.tags.has(t) ? 'is-on' : ''}" data-tag="${esc(t)}" aria-pressed="${filters.state.tags.has(t)}" title="${tagCounts.get(t)} note${tagCounts.get(t) === 1 ? '' : 's'}">#${esc(t)}</button>`).join('')
      : `<span class="nav-empty">${findQuery ? 'No tags match' : 'No tags yet'}</span>`
    refreshIcons(foldersEl)
    const input = foldersEl.querySelector('input')
    if (input && document.activeElement !== findInput) {
      input.focus()
      input.select()
    }
    foldersEl.querySelector('[data-confirm="yes"]')?.focus()
  }

  function setMode(m) {
    mode = m
    render()
  }

  // ---- events ----------------------------------------------------------------------------------
  foldersEl.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')
    if (act) return setMode({ type: act.dataset.act === 'rename' ? 'rename' : 'confirm', key: act.dataset.k })
    const conf = e.target.closest('[data-confirm]')
    if (conf) {
      if (conf.dataset.confirm === 'yes') {
        const f = mode.key
        store.deleteFolder(f)
        if (filters.state.folder === f) filters.setFolder(null)
      }
      return setMode({ type: 'idle' })
    }
    const all = e.target.closest('.nav-row--all')
    if (all) return filters.setFolder(null)
    const b = e.target.closest('[data-folder-btn]')
    if (b) filters.setFolder(b.dataset.folderBtn)
  })

  foldersEl.addEventListener('keydown', (e) => {
    const t = e.target
    if (t.matches('input.nav-rename')) {
      if (e.key === 'Enter') {
        e.preventDefault()
        const v = cleanFolder(t.value)
        if (t.dataset.create !== undefined) {
          if (v) {
            store.createFolder(v)
            filters.setFolder(v)
          }
        } else if (v && v !== t.dataset.rename) {
          store.renameFolder(t.dataset.rename, v)
          if (filters.state.folder === t.dataset.rename) filters.setFolder(v)
        }
        return setMode({ type: 'idle' })
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        return setMode({ type: 'idle' })
      }
      return
    }
    if (mode.type === 'confirm' && e.key === 'Escape') {
      e.preventDefault()
      return setMode({ type: 'idle' })
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const btns = [...foldersEl.querySelectorAll('.nav-row--all, .nav-row__main')]
      const i = btns.indexOf(document.activeElement)
      if (i < 0) return
      e.preventDefault()
      btns[(i + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length].focus()
    } else if ((e.key === 'F2') && document.activeElement.dataset.folderBtn) {
      e.preventDefault()
      setMode({ type: 'rename', key: document.activeElement.dataset.folderBtn })
    } else if (e.key === 'Delete' && document.activeElement.dataset.folderBtn) {
      e.preventDefault()
      setMode({ type: 'confirm', key: document.activeElement.dataset.folderBtn })
    }
  })
  foldersEl.addEventListener('focusout', (e) => {
    // leaving the "new folder" box empty just cancels it; leaving a rename box with text commits nothing
    if (e.target.matches?.('input.nav-rename') && !foldersEl.contains(e.relatedTarget) && mode.type !== 'idle') setTimeout(() => mode.type !== 'confirm' && setMode({ type: 'idle' }), 0)
  })

  tagsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tag]')
    if (b) filters.toggleTag(b.dataset.tag)
  })
  tagsEl.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const btns = [...tagsEl.querySelectorAll('.nav-tag')]
    const i = btns.indexOf(document.activeElement)
    if (i < 0) return
    e.preventDefault()
    btns[(i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length].focus()
  })

  // ---- find box (folders + tags) and type-ahead -----------------------------------------------
  function openFind() {
    findRow.hidden = false
    findBtn.hidden = false
    findBtn.setAttribute('aria-expanded', 'true')
    findInput.focus()
    findInput.select()
  }
  function closeFind(refocus) {
    findInput.value = ''
    findQuery = ''
    findRow.hidden = true
    findBtn.setAttribute('aria-expanded', 'false')
    render()
    if (refocus) (findBtn.hidden ? foldersEl.querySelector('.nav-row--all') : findBtn)?.focus()
  }
  findBtn.addEventListener('click', () => (findRow.hidden ? openFind() : closeFind(true)))
  findClear.addEventListener('click', () => closeFind(true))
  findInput.addEventListener('input', () => {
    findQuery = findInput.value.trim()
    render()
  })
  findInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      return closeFind(true)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const first = foldersEl.querySelector('[data-folder-btn]')
      if (first) {
        filters.setFolder(first.dataset.folderBtn) // open the first match
        closeFind(false)
        foldersEl.querySelector('.nav-row.is-active .nav-row__main')?.focus()
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      ;(foldersEl.querySelector('[data-folder-btn], .nav-row--all') || tagsEl.querySelector('.nav-tag'))?.focus()
    }
  })

  // Type letters on a focused folder row to jump to the folder that starts with them (like a file list).
  let typed = ''
  let typedTimer = 0
  foldersEl.addEventListener('keydown', (e) => {
    const cur = document.activeElement
    if (!cur?.matches?.('.nav-row__main, .nav-row--all') || e.metaKey || e.ctrlKey || e.altKey) return
    if (e.key === '/') {
      e.preventDefault()
      return openFind()
    }
    if (e.key.length !== 1 || e.key === ' ') {
      typed = '' // Enter, arrows, Tab... end the current word
      return
    }
    e.preventDefault()
    clearTimeout(typedTimer)
    typed += e.key.toLowerCase()
    typedTimer = setTimeout(() => (typed = ''), 700)
    const btns = [...foldersEl.querySelectorAll('[data-folder-btn]')]
    const start = btns.indexOf(cur) + 1
    const order = [...btns.slice(start), ...btns.slice(0, start)]
    const hit = order.find((b) => b.dataset.folderBtn.toLowerCase().startsWith(typed)) || order.find((b) => b.dataset.folderBtn.toLowerCase().includes(typed))
    hit?.focus()
  }, true)

  newFolderBtn.addEventListener('click', () => setMode({ type: 'create' }))
  tagsMenuBtn.addEventListener('click', () => filters.openTags(tagsMenuBtn))

  render()
  return { render }
}
