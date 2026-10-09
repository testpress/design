import { storage } from './storage.js'
import { deriveTitle, deriveSnippet, textOf, isEmptyDoc, emptyDoc } from './doc-utils.js'
import { seedNotes } from './seed.js'

// Local source of truth. Every edit is mirrored to localStorage (the "unsaved edits kept on this
// device" copy). `savedRev` tracks what the fake server last confirmed, so any note with
// rev > savedRev is dirty and gets re-queued on the next load.
export class NotesStore {
  constructor() {
    this.notes = new Map()
    this.listeners = new Set()
    this.persistTimers = new Map()
    this.restored = [] // ids whose unsaved edits were recovered on load
    this.#load()
  }

  #load() {
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
    this.#put({ id, doc: emptyDoc(), folder, tags, updatedAt: Date.now(), rev: 1, savedRev: 0, createdThisSession: true })
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
