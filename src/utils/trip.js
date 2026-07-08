import { itinerary, TRIP_START, TRIP_END } from '../data/itinerary'

function daysBetween(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((new Date(b) - new Date(a)) / msPerDay)
}

export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

export const TOTAL_DAYS = daysBetween(TRIP_START, TRIP_END) + 1

export function getCurrentStop(today = toISODate(new Date())) {
  if (today < TRIP_START || today > TRIP_END) return null
  return itinerary.reduce(
    (current, stop) => (stop.startDate <= today ? stop : current),
    itinerary[0],
  )
}

export function getNextStop(today = toISODate(new Date())) {
  if (today < TRIP_START) return itinerary[0]
  const current = getCurrentStop(today)
  if (!current) return null
  return itinerary[current.id] ?? null
}

export function getNightNumber(stop, today = toISODate(new Date())) {
  return daysBetween(stop.startDate, today) + 1
}

export function getTripStatus(today = toISODate(new Date())) {
  if (today < TRIP_START) {
    return { phase: 'before', daysUntilStart: daysBetween(today, TRIP_START) }
  }
  if (today > TRIP_END) {
    return { phase: 'after' }
  }

  const current = getCurrentStop(today)
  const dayNumber = daysBetween(TRIP_START, today) + 1

  return {
    phase: 'during',
    dayNumber,
    totalDays: TOTAL_DAYS,
    percent: Math.min(100, Math.round((dayNumber / TOTAL_DAYS) * 100)),
    current,
    next: getNextStop(today),
    nightsRemaining: daysBetween(today, TRIP_END),
  }
}

export function getTripSummary() {
  const touristStops = itinerary.filter((stop) => !stop.isHome)
  const countries = new Set(touristStops.map((stop) => stop.country))
  const cities = new Set(touristStops.map((stop) => stop.city))
  const totalNights = touristStops.reduce((sum, stop) => sum + stop.nights, 0)
  return { countries: countries.size, cities: cities.size, totalNights }
}

export function getTripDayNumber(dateStr) {
  return daysBetween(TRIP_START, dateStr) + 1
}

function addDaysISO(dateStr, amount) {
  const date = new Date(dateStr)
  date.setUTCDate(date.getUTCDate() + amount)
  return date.toISOString().slice(0, 10)
}

// El día de checkout de una parada es el mismo día de llegada a la
// siguiente (parte del día en una ciudad, parte en la otra), así que
// ese día aparece en el rango de ambas paradas.
function getStopDayRange(stop) {
  const dayStart = getTripDayNumber(stop.startDate)
  const dayEnd = getTripDayNumber(stop.endDate)
  return { dayStart, dayEnd }
}

export function getItineraryTimeline(today = toISODate(new Date())) {
  const current = getCurrentStop(today)

  return itinerary.map((stop) => {
    const { dayStart, dayEnd } = getStopDayRange(stop)

    let state = 'upcoming'
    if (today > TRIP_END) state = 'past'
    else if (current) {
      if (stop.id < current.id) state = 'past'
      else if (stop.id === current.id) state = 'current'
    }

    return { ...stop, dayStart, dayEnd, state }
  })
}

export function getStopDays(stop) {
  const { dayStart, dayEnd } = getStopDayRange(stop)
  const count = dayEnd - dayStart + 1

  return Array.from({ length: count }, (_, i) => ({
    dayNumber: dayStart + i,
    date: addDaysISO(stop.startDate, i),
  }))
}
