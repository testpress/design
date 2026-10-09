// Lucide is loaded from a CDN by the page layout. If it is still loading when we render, keep
// trying instead of leaving empty icon slots (they would stay blank until the next re-render).
export function refreshIcons(root) {
  const run = () => window.lucide.createIcons(root ? { nodes: [root] } : undefined)
  if (window.lucide) return run()
  let tries = 0
  const timer = setInterval(() => {
    if (window.lucide) {
      clearInterval(timer)
      if (!root || root.isConnected) run()
    } else if (++tries > 100) clearInterval(timer)
  }, 100)
}
