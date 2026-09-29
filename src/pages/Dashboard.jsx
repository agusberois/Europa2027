import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { itinerary } from '../data/itinerary'
import { activities } from '../data/activities'
import { countryEmojis, waitingTaglines, pickRandom } from '../data/countryFun'
import {
  getTripStatus,
  getTripSummary,
  getNightNumber,
  getItineraryTimeline,
  getTripDayNumber,
  getPlanningProgress,
  getTripDistanceKm,
  formatNumber,
  EARTH_CIRCUMFERENCE_KM,
  DEPARTURE_TIME,
  PLANNING_START,
  toISODate,
  formatShortDate,
} from '../utils/trip'
import { confetti } from '../utils/confetti'
import DestinationCard from '../components/DestinationCard.jsx'
import StatTile from '../components/StatTile.jsx'
import Timeline from '../components/Timeline.jsx'
import Countdown from '../components/Countdown.jsx'
import PlanningProgress from '../components/PlanningProgress.jsx'
import { useWeather, weatherIcon } from '../hooks/useWeather'
import { useCompletedTasks } from '../hooks/useCompletedTasks'
import './Dashboard.css'

const TAGLINE_INTERVAL = 5000

// Países a visitar en orden, sin repetir (y sin contar casa).
const tripCountries = itinerary
  .filter((stop) => !stop.isHome)
  .filter((stop, index, stops) => stops.findIndex((s) => s.countryCode === stop.countryCode) === index)

function burstFlag(event, stop) {
  confetti(event.currentTarget, { pieces: [stop.flag, ...countryEmojis[stop.countryCode]] })
}

function Dashboard() {
  const status = getTripStatus()
  const summary = getTripSummary()
  const timeline = getItineraryTimeline()
  const planning = getPlanningProgress()
  const distanceKm = getTripDistanceKm()
  const worldPercent = Math.round((distanceKm / EARTH_CIRCUMFERENCE_KM) * 100)
  const firstStop = itinerary[0]
  const lastStop = itinerary[itinerary.length - 1]
  const firstDestination = itinerary.find((stop) => !stop.isHome)
  const { data: weather } = useWeather()
  const { isCompleted } = useCompletedTasks()
  const currentWeather = status.current && weather?.[status.current.city]
  const [tagline, setTagline] = useState(() => pickRandom(waitingTaglines))

  useEffect(() => {
    if (status.phase !== 'before') return undefined
    const interval = setInterval(() => {
      setTagline((prev) => pickRandom(waitingTaglines.filter((line) => line !== prev)))
    }, TAGLINE_INTERVAL)
    return () => clearInterval(interval)
  }, [status.phase])

  useEffect(() => {
    if (status.phase !== 'after') return
    confetti({ x: window.innerWidth / 2, y: window.innerHeight / 3 }, { count: 40, spread: 240 })
  }, [status.phase])

  let nextActivity = null
  let activitiesDone = false
  let todayTotal = 0
  let todayDone = 0

  if (status.current) {
    const dayNumber = getTripDayNumber(toISODate(new Date()))
    const dayActivities = activities[status.current.slug]?.[dayNumber] ?? []
    const doneFlags = dayActivities.map((_, index) =>
      isCompleted(`${status.current.slug}:${dayNumber}:${index}`),
    )

    todayTotal = dayActivities.length
    todayDone = doneFlags.filter(Boolean).length

    if (todayTotal > 0) {
      const pendingIndex = doneFlags.indexOf(false)
      if (pendingIndex === -1) activitiesDone = true
      else nextActivity = dayActivities[pendingIndex]
    }
  }

  const distanceTile = (
    <StatTile
      icon="🌍"
      label="Km recorridos"
      value={`${Math.round(distanceKm / 1000)}k`}
      hint={`${worldPercent}% vuelta al mundo`}
    />
  )

  return (
    <div className="container dashboard">
      <header className="dashboard__hero">
        <p className="dashboard__eyebrow">
          {formatShortDate(firstStop.startDate)} — {formatShortDate(lastStop.endDate)}
        </p>
        <h1 className="dashboard__title">
          Europa <span className="aurora-text">2027</span>
        </h1>
        <div className="dashboard__flags">
          {tripCountries.map((stop, index) => (
            <button
              key={stop.countryCode}
              type="button"
              className="dashboard__flag"
              style={{ '--i': index }}
              onClick={(event) => burstFlag(event, stop)}
              aria-label={`Festejar ${stop.country}`}
              title={stop.country}
            >
              {stop.flag}
            </button>
          ))}
        </div>
      </header>

      {status.phase === 'before' && (
        <section className="card dashboard__countdown">
          <span className="badge">🛫 Cuenta regresiva al despegue</span>
          <Countdown target={DEPARTURE_TIME} />
          <p className="dashboard__tagline" key={tagline}>
            {tagline}
          </p>
          <div className="dashboard__first-stop">
            <span className="dashboard__first-stop-flag">{firstDestination.flag}</span>
            <div>
              <span className="text-muted dashboard__first-stop-label">Primera parada</span>
              <strong>
                {firstDestination.city}, {firstDestination.country}
              </strong>
              {firstDestination.transport && (
                <span className="text-muted dashboard__first-stop-transport">
                  {firstDestination.transport.emoji} {firstDestination.transport.mode}
                  {firstDestination.transport.detail ? ` · ${firstDestination.transport.detail}` : ''}
                </span>
              )}
            </div>
          </div>
          <PlanningProgress
            percent={planning.percent}
            startLabel={formatShortDate(PLANNING_START)}
            endLabel={formatShortDate(firstStop.startDate)}
            elapsedDays={planning.elapsedDays}
            totalDays={planning.totalDays}
          />
        </section>
      )}

      {status.phase === 'during' && (
        <>
          {status.current && (
            <section className="card dashboard__current">
              <div className="dashboard__current-top">
                <span className="badge dashboard__live">
                  <span className="dashboard__live-dot" /> Día {status.dayNumber} de {status.totalDays}
                </span>
                {currentWeather && (
                  <span className="dashboard__current-temp">
                    {weatherIcon(currentWeather.code)} {currentWeather.current}°
                  </span>
                )}
              </div>
              <span className="text-muted">Estás en</span>
              <h2 className="dashboard__current-city">
                <button
                  type="button"
                  className="dashboard__current-flag"
                  onClick={(event) => burstFlag(event, status.current)}
                  aria-label={`Festejar ${status.current.country}`}
                >
                  {status.current.flag}
                </button>
                {status.current.city}
              </h2>
              <p className="text-muted dashboard__current-meta">
                {status.current.country}
                {status.current.nights > 0 &&
                  ` · Noche ${getNightNumber(status.current)} de ${status.current.nights}`}
                {currentWeather && ` · 🌅 ${currentWeather.sunrise} · 🌇 ${currentWeather.sunset}`}
              </p>

              <div
                className="progress"
                role="progressbar"
                aria-valuenow={status.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Avance del viaje"
              >
                <div className="progress__fill" style={{ width: `${status.percent}%` }} />
              </div>

              {nextActivity && (
                <div className="dashboard__next-activity">
                  <span className="text-muted dashboard__next-activity-label">
                    A continuación · {todayDone}/{todayTotal} hechas
                  </span>
                  <span className="dashboard__next-activity-text">
                    {nextActivity.time && <span className="time-pill">{nextActivity.time}</span>}
                    {nextActivity.text}
                  </span>
                </div>
              )}
              {activitiesDone && (
                <p className="dashboard__all-done">🏆 ¡Día completado! A descansar (o no 😏)</p>
              )}
              <Link to={`/destino/${status.current.slug}`} className="dashboard__current-link">
                Ver plan de hoy <span aria-hidden="true">›</span>
              </Link>
            </section>
          )}

          {status.next && (
            <section className="dashboard__next">
              <h3>
                Próximo destino{' '}
                {status.next.transport && (
                  <span className="text-muted dashboard__next-transport">
                    {status.next.transport.emoji} {status.next.transport.mode}
                  </span>
                )}
              </h3>
              <DestinationCard stop={status.next} to={`/destino/${status.next.slug}`} />
            </section>
          )}

          <section className="dashboard__stats">
            <StatTile icon="🗺️" label="Países" value={summary.countries} />
            <StatTile icon="🏙️" label="Ciudades" value={summary.cities} />
            <StatTile icon="🌙" label="Noches restantes" value={status.nightsRemaining} />
            {distanceTile}
          </section>
        </>
      )}

      {status.phase === 'before' && (
        <section className="dashboard__stats">
          <StatTile icon="🗺️" label="Países" value={summary.countries} />
          <StatTile icon="🏙️" label="Ciudades" value={summary.cities} />
          <StatTile icon="🌙" label="Noches" value={summary.totalNights} />
          {distanceTile}
        </section>
      )}

      {status.phase === 'after' && (
        <section className="card dashboard__finished">
          <span className="dashboard__finished-icon">🏆</span>
          <h2>¡Viaje completado!</h2>
          <p className="text-muted">
            {summary.countries} países · {summary.cities} ciudades · {summary.totalNights} noches ·{' '}
            {formatNumber(distanceKm)} km
          </p>
          <p className="dashboard__finished-note">¿Cuándo es el próximo? 👀</p>
        </section>
      )}

      <Link to="/herramientas" className="card card-link dashboard__tools-link">
        <span className="dashboard__tools-icon" aria-hidden="true">
          🧰
        </span>
        <span className="dashboard__tools-label">
          Herramientas
          <span className="text-muted dashboard__tools-hint">Clima, mapa, frases, moneda y más</span>
        </span>
        <span className="chevron" aria-hidden="true">
          ›
        </span>
      </Link>

      <section className="dashboard__timeline">
        <h2>Itinerario completo</h2>
        <Timeline items={timeline} />
      </section>

      <footer className="dashboard__footer text-muted">Hecho con 🧉 desde Montevideo</footer>
    </div>
  )
}

export default Dashboard
