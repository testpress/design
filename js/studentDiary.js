/**
 * Orders entries so that the single pinned entry appears at the TOP,
 * with all other entries keeping their existing relative order.
 *
 * @param {Array} entries - List of diary entries
 * @returns {Array} Ordered entries
 */
function orderEntries(entries = []) {
    if (!Array.isArray(entries)) return [];

    const indexed = entries.map((entry, idx) => {
        if (entry && typeof entry === "object" && entry.original_index === undefined) {
            return { ...entry, original_index: idx };
        }
        return entry;
    });

    let pinnedEntry = null;
    const unpinned = [];

    for (const entry of indexed) {
        if (!pinnedEntry && entry && (entry.is_pinned === true || entry.pinned === true)) {
            pinnedEntry = entry;
        } else {
            const item = entry && (entry.is_pinned || entry.pinned)
                ? { ...entry, is_pinned: false, pinned: false }
                : entry;
            unpinned.push(item);
        }
    }

    unpinned.sort((a, b) => (a.original_index ?? 0) - (b.original_index ?? 0));

    return pinnedEntry ? [pinnedEntry, ...unpinned] : unpinned;
}

/**
 * Checks if user is authorized to pin/unpin entries.
 *
 * @param {Object} [user] - User object or permission flag
 * @returns {boolean} True if authorized
 */
function canUserPin(user) {
    if (user === undefined || user === null) return true;
    if (typeof user === "boolean") return user;
    if (user.can_pin === false) return false;
    if (user.is_authenticated === false) return false;
    if (user.role && user.role === "student") return false;
    if (user.permissions && Array.isArray(user.permissions) && !user.permissions.includes("pin_entry")) return false;
    return true;
}

/**
 * Pins a diary entry, moving it to the top while enforcing the single-pin rule.
 * Any previously pinned entry is automatically unpinned and returns to its normal position.
 *
 * @param {Array} entries - List of diary entries
 * @param {number|string} entryId - ID of entry to pin
 * @param {Object} [user] - User performing the action
 * @returns {Array} New list with entry pinned at the top
 */
function pinEntry(entries = [], entryId, user) {
    if (!canUserPin(user)) {
        throw new Error("Unauthorized: User does not have permission to pin entries.");
    }
    if (!Array.isArray(entries)) return [];

    const exists = entries.some(entry => entry && entry.id === entryId);
    if (!exists) {
        return orderEntries(entries);
    }

    let pinnedEntry = null;
    const unpinned = [];

    entries.forEach((entry, idx) => {
        if (!entry || typeof entry !== "object") return;
        const baseIndex = entry.original_index !== undefined ? entry.original_index : idx;
        if (entry.id === entryId) {
            pinnedEntry = { ...entry, is_pinned: true, pinned: true, original_index: baseIndex };
        } else {
            unpinned.push({ ...entry, is_pinned: false, pinned: false, original_index: baseIndex });
        }
    });

    unpinned.sort((a, b) => (a.original_index ?? 0) - (b.original_index ?? 0));

    return pinnedEntry ? [pinnedEntry, ...unpinned] : unpinned;
}

/**
 * Unpins a diary entry, restoring its normal position.
 *
 * @param {Array} entries - List of diary entries
 * @param {number|string} entryId - ID of entry to unpin
 * @param {Object} [user] - User performing the action
 * @returns {Array} New list with entry unpinned and restored to normal position
 */
function unpinEntry(entries = [], entryId, user) {
    if (!canUserPin(user)) {
        throw new Error("Unauthorized: User does not have permission to unpin entries.");
    }
    if (!Array.isArray(entries)) return [];

    const exists = entries.some(entry => entry && entry.id === entryId);
    if (!exists) {
        return orderEntries(entries);
    }

    const updated = entries.map((entry, idx) => {
        if (!entry || typeof entry !== "object") return entry;
        const baseIndex = entry.original_index !== undefined ? entry.original_index : idx;
        if (entry.id === entryId) {
            return { ...entry, is_pinned: false, pinned: false, original_index: baseIndex };
        }
        return { ...entry, original_index: baseIndex };
    });

    return orderEntries(updated);
}

module.exports = {
    orderEntries,
    orderByPinned: orderEntries,
    pinEntry,
    unpinEntry,
    canUserPin
};
