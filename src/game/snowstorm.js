import { bump } from './store'

const EVENT = 'europa2027:snowstorm'
const SHAKE_THRESHOLD = 22
const SHAKE_COOLDOWN = 5000

export function triggerSnowstorm() {
  window.dispatchEvent(new Event(EVENT))
  bump('storms')
}

export function onSnowstorm(listener) {
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}

// iOS pide permiso para leer el acelerómetro, y solo desde un toque del
// usuario: se llama desde el click en las luces de Navidad.
export function requestMotionPermission() {
  const request = window.DeviceMotionEvent?.requestPermission
  if (typeof request === 'function') request().catch(() => {})
}

// Globo de nieve: agitar el celu desata la tormenta.
export function listenForShake() {
  let lastStorm = 0

  function handleMotion(event) {
    const a = event.accelerationIncludingGravity
    if (!a) return
    const force = Math.abs(a.x ?? 0) + Math.abs(a.y ?? 0) + Math.abs(a.z ?? 0)
    const now = Date.now()
    if (force > SHAKE_THRESHOLD + 9.8 && now - lastStorm > SHAKE_COOLDOWN) {
      lastStorm = now
      triggerSnowstorm()
    }
  }

  window.addEventListener('devicemotion', handleMotion)
  return () => window.removeEventListener('devicemotion', handleMotion)
}
