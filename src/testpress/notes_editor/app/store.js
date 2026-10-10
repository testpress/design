import { storage } from './storage.js'
import { deriveTitle, deriveSnippet, textOf, isEmptyDoc, emptyDoc } from './doc-utils.js'
import { seedNotes } from './seed.js'

export const MAX_PINNED_FOLDERS = 5

// Local source of truth. Every edit is mirrored to localStorage (the "unsaved edits kept on this
// device" copy). `savedRev` tracks what the fake server last confirmed, so any note with
// rev > savedRev is dirty and gets re-queued on the next load.
export class NotesStore {
  constructor() {
    this.notes = new Map()
    this.listeners = new Set()
    this.persistTimers = new Map()
    this.restored = [] // ids whose unsaved edits were recovered on load
    this.trash = new Map() // deleted notes kept in memory until the Undo window closes
    this.#load()
  }

  #load() {
    // a delete whose Undo window was still open when the page closed is final
    storage.get('pendingDelete', []).forEach((id) => {
      storage.remove('note:' + id)
      storage.remove('server:' + id)
    })
    storage.set('pendingDelete', [])
    if (!storage.get('seeded')) {
      const seed = seedNotes()
      seed.forEach((s) => this.#put({ ...s, rev: 1, savedRev: 1, createdThisSession: false }))
      storage.set('seeded', true)
      seed.forEach((s) => this.#persistNow(s.id))
      storage.set('index', seed.map((s) => s.id))
    }
    const ids = storage.get('index', [])
    ids.forEach((id) => {
      const n = storage.get('note:' + id)
      if (!n) return
      this.#put({ ...n, createdThisSession: false })
      if (n.rev > n.savedRev) this.restored.push(id)
    })
  }

  #put(n) {
    const meta = { ...deriveTitle(n.doc), snippet: deriveSnippet(n.doc), text: textOf(n.doc).toLowerCase() }
    this.notes.set(n.id, { ...n, ...meta })
  }

  #persistNow(id) {
    clearTimeout(this.persistTimers.get(id))
    this.persistTimers.delete(id)
    const n = this.notes.get(id)
    if (!n) return
    const { id: _i, createdThisSession, title, derived, snippet, text, ...persist } = n
    storage.set('note:' + id, { id, ...persist })
    storage.set('index', [...this.notes.keys()])
  }

  onChange(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
  #emit(id, kind) {
    this.listeners.forEach((fn) => fn(id, kind))
  }

  get(id) {
    return this.notes.get(id)
  }
  all() {
    return [...this.notes.values()].sort((a, b) => b.updatedAt - a.updatedAt)
  }

  create({ folder = null, tags = [] } = {}) {
    const id = 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
    this.#put({ id, doc: emptyDoc(), folder, tags, createdAt: Date.now(), updatedAt: Date.now(), rev: 1, savedRev: 0, createdThisSession: true })
    this.#persistNow(id)
    this.#emit(id, 'create')
    return id
  }

  // Called on every document change. Synchronous in memory; debounced to disk
  // (flushLocal is also called on leave / pagehide, so nothing waits on the timer).
  setDoc(id, doc) {
    const n = this.notes.get(id)
    if (!n) return
    this.#put({ ...n, doc, rev: n.rev + 1, updatedAt: Date.now() })
    clearTimeout(this.persistTimers.get(id))
    this.persistTimers.set(id, setTimeout(() => this.#persistNow(id), 200))
    this.#emit(id, 'edit')
  }

  // Folder (one or none) and tags (any number) live beside the document, not inside it.
  setMeta(id, patch) {
    const n = this.notes.get(id)
    if (!n) return
    const next = { ...n }
    if ('folder' in patch) next.folder = patch.folder || null
    if ('tags' in patch) next.tags = [...new Set(patch.tags)]
    next.rev = n.rev + 1
    next.updatedAt = Date.now()
    this.#put(next)
    this.#persistNow(id)
    this.#emit(id, 'meta')
  }

  // Folders exist because a note uses them OR because the student created them empty.
  folders() {
    const used = [...this.notes.values()].map((n) => n.folder).filter(Boolean)
    return [...new Set([...used, ...storage.get('folders', [])])].sort((a, b) => a.localeCompare(b))
  }

  createFolder(name) {
    const list = storage.get('folders', [])
    if (!list.includes(name)) storage.set('folders', [...list, name])
    this.touchFolder(name)
    this.#emit(null, 'folders')
  }

  // ---- pinned folders (at most MAX_PINNED_FOLDERS, in the order they were pinned) -------------
  pinnedFolders() {
    const all = new Set(this.folders())
    return storage.get('pinnedFolders', []).filter((f) => all.has(f))
  }

  isPinned(name) {
    return this.pinnedFolders().includes(name)
  }

  // returns { ok: true } or { ok: false, reason: 'limit' }
  pinFolder(name) {
    const pins = this.pinnedFolders()
    if (pins.includes(name)) return { ok: true }
    if (pins.length >= MAX_PINNED_FOLDERS) return { ok: false, reason: 'limit' }
    storage.set('pinnedFolders', [...pins, name])
    this.#emit(null, 'folders')
    return { ok: true }
  }

  unpinFolder(name) {
    storage.set('pinnedFolders', this.pinnedFolders().filter((f) => f !== name))
    this.#emit(null, 'folders')
  }

  // "recently used" = last time a note in the folder changed, or the folder was opened/created
  touchFolder(name) {
    if (!name) return
    storage.set('folderStamps', { ...storage.get('folderStamps', {}), [name]: Date.now() })
  }

  folderRecency() {
    const stamps = storage.get('folderStamps', {})
    const m = new Map(Object.entries(stamps))
    this.notes.forEach((n) => n.folder && m.set(n.folder, Math.max(m.get(n.folder) || 0, n.updatedAt)))
    return m
  }

  folderCounts() {
    const m = new Map()
    this.notes.forEach((n) => n.folder && m.set(n.folder, (m.get(n.folder) || 0) + 1))
    return m
  }

  tagCounts() {
    const m = new Map()
    this.notes.forEach((n) => (n.tags || []).forEach((t) => m.set(t, (m.get(t) || 0) + 1)))
    return m
  }

  // Renaming/deleting a folder keeps its notes; deleting a tag only removes the label.
  renameFolder(from, to) {
    storage.set('folders', storage.get('folders', []).map((f) => (f === from ? to : f)))
    storage.set('pinnedFolders', storage.get('pinnedFolders', []).map((f) => (f === from ? to : f)))
    const st = storage.get('folderStamps', {})
    if (st[from]) storage.set('folderStamps', { ...st, [to]: st[from] })
    this.notes.forEach((n) => n.folder === from && this.setMeta(n.id, { folder: to }))
    this.#emit(null, 'folders')
  }

  deleteFolder(name) {
    storage.set('folders', storage.get('folders', []).filter((f) => f !== name))
    storage.set('pinnedFolders', storage.get('pinnedFolders', []).filter((f) => f !== name))
    this.notes.forEach((n) => n.folder === name && this.setMeta(n.id, { folder: null }))
    this.#emit(null, 'folders')
  }

  renameTag(from, to) {
    this.notes.forEach((n) => (n.tags || []).includes(from) && this.setMeta(n.id, { tags: n.tags.map((t) => (t === from ? to : t)) }))
  }

  deleteTag(name) {
    this.notes.forEach((n) => (n.tags || []).includes(name) && this.setMeta(n.id, { tags: n.tags.filter((t) => t !== name) }))
  }

  tags() {
    return [...new Set([...this.notes.values()].flatMap((n) => n.tags || []))].sort((a, b) => a.localeCompare(b))
  }

  flushLocal(id) {
    if (id) this.#persistNow(id)
    else [...this.persistTimers.keys()].forEach((k) => this.#persistNow(k))
  }

  markSaved(id, rev) {
    const n = this.notes.get(id)
    if (!n) return
    n.savedRev = Math.max(n.savedRev, rev)
    this.#persistNow(id)
    this.#emit(id, 'saved')
  }

  isDirty(id) {
    const n = this.notes.get(id)
    return !!n && n.rev > n.savedRev
  }

  // Discard rule: only a note created this session that is still completely empty.
  discardIfEmpty(id) {
    const n = this.notes.get(id)
    if (!n || !n.createdThisSession || !isEmptyDoc(n.doc)) return false
    this.remove(id)
    return true
  }

  // Delete with Undo: notes leave the list at once but are only purged when the Undo window closes.
  softDelete(ids) {
    ids.forEach((id) => {
      const n = this.notes.get(id)
      if (!n) return
      clearTimeout(this.persistTimers.get(id))
      this.persistTimers.delete(id)
      this.trash.set(id, n)
      this.notes.delete(id)
    })
    storage.set('index', [...this.notes.keys()])
    storage.set('pendingDelete', [...this.trash.keys()])
    this.#emit(null, 'delete')
  }

  restore(ids) {
    ids.forEach((id) => {
      const n = this.trash.get(id)
      if (!n) return
      this.notes.set(id, n)
      this.trash.delete(id)
      this.#persistNow(id)
    })
    storage.set('index', [...this.notes.keys()])
    storage.set('pendingDelete', [...this.trash.keys()])
    this.#emit(null, 'restore')
  }

  finalizeDelete(ids) {
    ids.forEach((id) => {
      this.trash.delete(id)
      storage.remove('note:' + id)
      storage.remove('server:' + id)
    })
    storage.set('pendingDelete', [...this.trash.keys()])
  }

  remove(id) {
    this.notes.delete(id)
    storage.remove('note:' + id)
    storage.remove('server:' + id)
    storage.set('index', [...this.notes.keys()])
    this.#emit(id, 'remove')
  }

  reset() {
    storage.clearAll()
    location.reload()
  }
}
