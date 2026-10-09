// localStorage wrapper that never throws (private mode / quota).
const P = 'tpnotes:v1:'

export const storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(P + key)
      return v == null ? fallback : JSON.parse(v)
    } catch (e) {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(P + key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(P + key)
    } catch (e) {}
  },
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(P))
        .forEach((k) => localStorage.removeItem(k))
    } catch (e) {}
  },
}
