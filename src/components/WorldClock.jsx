import { useEffect, useState } from 'react'
import { itinerary } from '../data/itinerary'
import { cityTimezones } from '../data/timezones'
import './WorldClock.css'

function uniqueCities() {
  const seen = new Set()
  const cities = []
  itinerary.forEach((stop) => {
    if (seen.has(stop.city)) return
    seen.add(stop.city)
    cities.push(stop)
  })
  return cities
}

const cities = uniqueCities()
const HOME_TIMEZONE = cityTimezones.Montevideo

function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function dayKey(date, timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function dayDiffLabel(date, timeZone) {
  const cityDay = dayKey(date, timeZone)
  const homeDay = dayKey(date, HOME_TIMEZONE)
  if (cityDay === homeDay) return null
  return cityDay > homeDay ? 'mañana' : 'ayer'
}

function WorldClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card world-clock">
      <ul className="world-clock__list">
        {cities.map((stop) => {
          const timeZone = cityTimezones[stop.city]
          if (!timeZone) return null
          const dayDiff = dayDiffLabel(now, timeZone)

          return (
            <li key={stop.city}>
              <span className="world-clock__city">
                {stop.flag} {stop.city}
              </span>
              <span className="world-clock__time">
                {formatTime(now, timeZone)}
                {dayDiff && <span className="text-muted world-clock__day-diff"> ({dayDiff})</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default WorldClock
