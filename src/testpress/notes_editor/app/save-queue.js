import { storage } from './storage.js'

// Simulated backend. Knobs live in storage so they survive reloads (prototype tools menu).
export const serverSim = {
  settings() {
    return { fail: false, latency: 700, ...storage.get('sim', {}) }
  },
  update(patch) {
    storage.set('sim', { ...this.settings(), ...patch })
  },
  save(note) {
    const { fail, latency } = this.settings()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.settings().fail) return reject(new Error('Simulated network failure'))
        storage.set('server:' + note.id, { id: note.id, doc: note.doc, rev: note.rev, at: Date.now() })
        resolve({ rev: note.rev })
      }, latency * (0.6 + Math.random() * 0.8))
    })
  },
}

const DEBOUNCE_MS = 800
const STILL_SAVING_MS = 8000
const BACKOFF = [2000, 4000, 8000, 15000]

// Per-note autosave. States: idle | saving | still | error. A note's save is never cancelled by
// switching away: the queue holds its own reference by id and keeps retrying.
export class SaveQueue {
  constructor(store, onState) {
    this.store = store
    this.onState = onState
    this.entries = new Map() // id -> {state, timer, retryTimer, slowTimer, attempts, inflight}
  }

  #entry(id) {
    if (!this.entries.has(id)) this.entries.set(id, { state: 'idle', attempts: 0 })
    return this.entries.get(id)
  }

  #set(id, state) {
    const e = this.#entry(id)
    if (e.state === state) return
    e.state = state
    this.onState(id, state)
  }

  stateOf(id) {
    return this.entries.get(id)?.state || (this.store.isDirty(id) ? 'saving' : 'idle')
  }

  schedule(id) {
    const e = this.#entry(id)
    clearTimeout(e.timer)
    if (e.state !== 'error') this.#set(id, 'saving')
    e.timer = setTimeout(() => this.run(id), DEBOUNCE_MS)
  }

  flush(id) {
    const e = this.#entry(id)
    if (e.timer) {
      clearTimeout(e.timer)
      this.run(id)
    }
  }

  retryNow(id) {
    const e = this.#entry(id)
    clearTimeout(e.retryTimer)
    e.attempts = 0
    this.run(id)
  }

  async run(id) {
    const e = this.#entry(id)
    clearTimeout(e.timer)
    e.timer = null
    clearTimeout(e.retryTimer)
    if (e.inflight) {
      e.again = true
      return
    }
    const note = this.store.get(id)
    if (!note) return this.#set(id, 'idle')
    if (!this.store.isDirty(id)) return this.#set(id, 'idle')
    e.inflight = true
    // Automatic retries keep showing "Not saved" instead of flickering back to "Saving…".
    if (e.state !== 'error') this.#set(id, 'saving')
    clearTimeout(e.slowTimer)
    e.slowTimer = setTimeout(() => e.inflight && this.#set(id, 'still'), STILL_SAVING_MS)
    try {
      const res = await serverSim.save({ id, doc: note.doc, rev: note.rev })
      this.store.markSaved(id, res.rev)
      e.attempts = 0
    } catch (err) {
      const delay = BACKOFF[Math.min(e.attempts++, BACKOFF.length - 1)]
      e.inflight = false
      clearTimeout(e.slowTimer)
      this.#set(id, 'error')
      e.retryTimer = setTimeout(() => this.run(id), delay)
      return
    }
    e.inflight = false
    clearTimeout(e.slowTimer)
    if (this.store.isDirty(id) || e.again) {
      e.again = false
      this.#set(id, 'saving')
      e.timer = setTimeout(() => this.run(id), DEBOUNCE_MS)
    } else this.#set(id, 'idle')
  }

  // Re-queue anything that was dirty on load (recovered local edits).
  resume(ids) {
    ids.forEach((id) => this.run(id))
  }
}
