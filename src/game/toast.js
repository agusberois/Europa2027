// Mini emisor de avisos: cualquier parte de la app dispara un toast y el
// <Toaster> (montado en Layout) lo muestra.
const listeners = new Set()

export function showToast(toast) {
  listeners.forEach((listener) => listener({ id: `${Date.now()}-${Math.random()}`, ...toast }))
}

export function onToast(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
