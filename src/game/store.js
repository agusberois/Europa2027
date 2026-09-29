import { useSyncExternalStore } from 'react'
import { achievements } from './achievements'
import { showToast } from './toast'
import { toISODate } from '../utils/trip'

const STORAGE_KEY = 'europa2027:game'

const EMPTY = { stickers: {}, stamps: {}, achievements: {}, counters: {} }

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

let state = load()
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function unlockAchievements(next) {
  const today = toISODate(new Date())
  let result = next
  achievements.forEach((achievement) => {
    if (result.achievements[achievement.id] || !achievement.check(result)) return
    result = { ...result, achievements: { ...result.achievements, [achievement.id]: today } }
    showToast({ icon: achievement.icon, title: `¡Logro! ${achievement.name}`, text: achievement.description })
  })
  return result
}

function update(recipe) {
  state = unlockAchievements(recipe(state))
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // sin storage (modo privado): el progreso vive solo en esta sesión
  }
  listeners.forEach((listener) => listener())
}

export function useGame() {
  return useSyncExternalStore(subscribe, () => state)
}

export function getGame() {
  return state
}

// Devuelve cuántas veces la tenías antes (0 = nueva).
export function collectSticker(id) {
  const previous = state.stickers[id] ?? 0
  update((s) => ({
    ...s,
    stickers: { ...s.stickers, [id]: previous + 1 },
    counters: previous > 0 ? { ...s.counters, duplicates: (s.counters.duplicates ?? 0) + 1 } : s.counters,
  }))
  return previous
}

// Un sello "real" (dorado) le gana a uno de explorador, nunca al revés.
export function stampPassport(city, real) {
  const existing = state.stamps[city]
  if (existing && (existing.real || !real)) return false
  update((s) => ({ ...s, stamps: { ...s.stamps, [city]: { date: toISODate(new Date()), real } } }))
  return true
}

export function bump(name, amount = 1) {
  update((s) => ({ ...s, counters: { ...s.counters, [name]: (s.counters[name] ?? 0) + amount } }))
}
