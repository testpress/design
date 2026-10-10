import { refreshIcons } from './icons.js'
import { MAX_PINNED_FOLDERS } from './store.js'

// The nav pane (stage 1): folders with counts and tags, as in the handoff. It stays short however many
// folders exist: pinned folders first (at most MAX_PINNED_FOLDERS), then the most recently used ones, and an
// "All folders" row that opens the full searchable list. It shares its state with the filter popovers
// (`filters.state`), so picking a folder here or there is the same thing. Create, rename, pin and delete work in
// place; Delete asks with the inline confirmation card.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const cleanFolder = (s) => s.trim().replace(/\s+/g, ' ').slice(0, 40)

export const NAV_FOLDER_CAP = 7 // pinned + recent folders shown in the pane
export const NAV_TAG_CAP = 8

export function createNavUI({ store, filters, foldersEl, tagsEl, newFolderBtn, tagsMenuBtn, onHint = () => {} }) {
  let mode = { type: 'idle' } // idle | create | rename | confirm

  // Which folders does the pane show? Pinned (in pin order), then recents; the open folder is always there.
  function visibleFolders() {
    const all = store.folders()
    const pinned = store.pinnedFolders()
    const rec = store.folderRecency()
    const others = all.filter((f) => !pinned.includes(f)).sort((a, b) => (rec.get(b) || 0) - (rec.get(a) || 0) || a.localeCompare(b))
    const shown = [...pinned, ...others.slice(0, Math.max(0, NAV_FOLDER_CAP - pinned.length))]
    const cur = filters.state.folder
    if (cur && all.includes(cur) && !shown.includes(cur)) shown.push(cur)
    return { shown, total: all.length, pinned }
  }

  function render() {
    const counts = store.folderCounts()
    const total = store.notes.size
    const cur = filters.state.folder
    const { shown, total: nFolders, pinned } = visibleFolders()
    const pinFull = pinned.length >= MAX_PINNED_FOLDERS
    const rows = [
      `<button type="button" class="nav-row nav-row--all ${!cur ? 'is-active' : ''}" data-folder="" aria-current="${!cur}"><i data-lucide="layers" class="size-4"></i><span class="nav-row__label">All notes</span><span class="nav-row__count">${total}</span></button>`,
    ]
    if (mode.type === 'create') rows.push(`<div class="nav-row-edit"><input class="nav-rename" data-create aria-label="New folder name" placeholder="Folder name" autocomplete="off"></div>`)
    shown.forEach((f) => {
      if (mode.type === 'rename' && mode.key === f) return rows.push(`<div class="nav-row-edit"><input class="nav-rename" data-rename="${esc(f)}" aria-label="Rename folder" value="${esc(f)}" autocomplete="off"></div>`)
      if (mode.type === 'confirm' && mode.key === f) {
        const n = counts.get(f) || 0
        return rows.push(`<div class="lib-confirm" role="group" aria-label="Confirm delete"><div class="lib-confirm__text"><strong>Delete “${esc(f)}”?</strong><span>${n ? `Its ${n} note${n === 1 ? '' : 's'} will stay, unfiled.` : 'This folder is empty.'}</span></div><div class="lib-confirm__btns"><button type="button" data-confirm="no" class="lib-no">Cancel</button><button type="button" data-confirm="yes" class="lib-yes">Delete</button></div></div>`)
      }
      const isPinned = pinned.includes(f)
      rows.push(`<div class="nav-row ${cur === f ? 'is-active' : ''}" data-folder="${esc(f)}" role="listitem">
        <button type="button" class="nav-row__main" data-folder-btn="${esc(f)}" aria-current="${cur === f}"><i data-lucide="${isPinned ? 'pin' : 'folder'}" class="size-4 ${isPinned ? 'nav-pin' : ''}"></i><span class="nav-row__label">${esc(f)}</span><span class="nav-row__count">${counts.get(f) || 0}</span></button>
        <span class="nav-actions"><button type="button" data-act="pin" data-k="${esc(f)}" aria-label="${isPinned ? 'Unpin' : 'Pin'} ${esc(f)}" title="${isPinned ? 'Unpin' : pinFull ? `You can pin up to ${MAX_PINNED_FOLDERS} folders` : 'Pin to the top'}"><i data-lucide="${isPinned ? 'pin-off' : 'pin'}" class="size-3.5"></i></button><button type="button" data-act="rename" data-k="${esc(f)}" aria-label="Rename ${esc(f)}"><i data-lucide="pencil" class="size-3.5"></i></button><button type="button" data-act="delete" data-k="${esc(f)}" aria-label="Delete ${esc(f)}"><i data-lucide="trash-2" class="size-3.5"></i></button></span></div>`)
    })
    if (nFolders > shown.length)
      rows.push(`<button type="button" class="nav-row nav-row--more" data-more-folders aria-haspopup="dialog"><i data-lucide="layout-list" class="size-4"></i><span class="nav-row__label">All folders</span><span class="nav-row__count">${nFolders}</span><i data-lucide="chevron-right" class="size-3.5 nav-row__chev"></i></button>`)
    foldersEl.innerHTML = rows.join('')

    // tags: the most used first, capped; the selected ones are always visible
    const tagCounts = store.tagCounts()
    const byUse = store.tags().sort((a, b) => (tagCounts.get(b) || 0) - (tagCounts.get(a) || 0) || a.localeCompare(b))
    const keep = byUse.slice(0, NAV_TAG_CAP)
    filters.state.tags.forEach((t) => !keep.includes(t) && byUse.includes(t) && keep.push(t))
    const hidden = byUse.length - keep.length
    tagsEl.innerHTML = byUse.length
      ? keep.map((t) => `<button type="button" class="nav-tag ${filters.state.tags.has(t) ? 'is-on' : ''}" data-tag="${esc(t)}" aria-pressed="${filters.state.tags.has(t)}" title="${tagCounts.get(t)} note${tagCounts.get(t) === 1 ? '' : 's'}">#${esc(t)}</button>`).join('') +
        (hidden > 0 ? `<button type="button" class="nav-tag nav-tag--more" data-more-tags aria-haspopup="dialog">+${hidden} more</button>` : '')
      : '<span class="nav-empty">No tags yet</span>'
    // with 2+ tags selected, say how they combine (and let the student change it)
    if (filters.state.tags.size >= 2) tagsEl.insertAdjacentHTML('beforeend', `<div class="nav-match" role="group" aria-label="How selected tags combine"><span>Match</span><button type="button" data-match="all" aria-pressed="${filters.state.tagMode === 'all'}" title="Notes that have every selected tag">all</button><button type="button" data-match="any" aria-pressed="${filters.state.tagMode === 'any'}" title="Notes that have at least one selected tag">any</button></div>`)
    refreshIcons(foldersEl)
    const input = foldersEl.querySelector('input')
    if (input) {
      input.focus()
      input.select()
    }
    foldersEl.querySelector('[data-confirm="yes"]')?.focus()
  }

  function setMode(m) {
    mode = m
    render()
  }

  function togglePin(name) {
    if (store.isPinned(name)) return store.unpinFolder(name)
    if (!store.pinFolder(name).ok) onHint(`You can pin up to ${MAX_PINNED_FOLDERS} folders. Unpin one to pin another.`)
  }

  // ---- events ----------------------------------------------------------------------------------
  foldersEl.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')
    if (act) {
      if (act.dataset.act === 'pin') return togglePin(act.dataset.k)
      return setMode({ type: act.dataset.act === 'rename' ? 'rename' : 'confirm', key: act.dataset.k })
    }
    const conf = e.target.closest('[data-confirm]')
    if (conf) {
      if (conf.dataset.confirm === 'yes') {
        const f = mode.key
        store.deleteFolder(f)
        if (filters.state.folder === f) filters.setFolder(null)
      }
      return setMode({ type: 'idle' })
    }
    const more = e.target.closest('[data-more-folders]')
    if (more) return filters.openFolders(more)
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
    const cur = document.activeElement
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const btns = [...foldersEl.querySelectorAll('.nav-row--all, .nav-row__main, .nav-row--more')]
      const i = btns.indexOf(cur)
      if (i < 0) return
      e.preventDefault()
      btns[(i + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length].focus()
    } else if (e.key === 'F2' && cur.dataset.folderBtn) {
      e.preventDefault()
      setMode({ type: 'rename', key: cur.dataset.folderBtn })
    } else if (e.key === 'Delete' && cur.dataset.folderBtn) {
      e.preventDefault()
      setMode({ type: 'confirm', key: cur.dataset.folderBtn })
    } else if (e.altKey && e.code === 'KeyP' && cur.dataset.folderBtn) {
      e.preventDefault()
      const name = cur.dataset.folderBtn
      togglePin(name)
      // the row may move (pinned rows go first): keep focus on it
      foldersEl.querySelector(`[data-folder-btn="${CSS.escape(name)}"]`)?.focus()
    }
  })
  foldersEl.addEventListener('focusout', (e) => {
    // leaving the "new folder" box empty just cancels it
    if (e.target.matches?.('input.nav-rename') && !foldersEl.contains(e.relatedTarget) && mode.type !== 'idle') setTimeout(() => mode.type !== 'confirm' && setMode({ type: 'idle' }), 0)
  })

  // Type letters on a focused folder row to jump to the visible folder that starts with them.
  // "/" opens the full folder list (it has a search box).
  let typed = ''
  let typedTimer = 0
  foldersEl.addEventListener('keydown', (e) => {
    const cur = document.activeElement
    if (!cur?.matches?.('.nav-row__main, .nav-row--all, .nav-row--more') || e.metaKey || e.ctrlKey || e.altKey) return
    if (e.key === '/') {
      e.preventDefault()
      return filters.openFolders(foldersEl.querySelector('.nav-row--more') || cur)
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

  tagsEl.addEventListener('click', (e) => {
    const mm = e.target.closest('[data-match]')
    if (mm) return filters.setTagMode(mm.dataset.match)
    const more = e.target.closest('[data-more-tags]')
    if (more) return filters.openTags(more)
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

  newFolderBtn.addEventListener('click', () => setMode({ type: 'create' }))
  tagsMenuBtn.addEventListener('click', () => filters.openTags(tagsMenuBtn))

  render()
  return { render }
}
