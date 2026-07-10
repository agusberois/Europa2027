import { Link } from 'react-router-dom'
import { itinerary } from '../data/itinerary'
import { activities } from '../data/activities'
import {
  getTripStatus,
  getTripSummary,
  getNightNumber,
  getItineraryTimeline,
  getTripDayNumber,
  getPlanningProgress,
  PLANNING_START,
  toISODate,
  formatShortDate,
} from '../utils/trip'
import DestinationCard from '../components/DestinationCard.jsx'
import StatTile from '../components/StatTile.jsx'
import Timeline from '../components/Timeline.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import PlanningProgress from '../components/PlanningProgress.jsx'
import { useWeather } from '../hooks/useWeather'
import { useCompletedTasks } from '../hooks/useCompletedTasks'
import './Dashboard.css'

function Dashboard() {
  const status = getTripStatus()
  const summary = getTripSummary()
  const timeline = getItineraryTimeline()
  const planning = getPlanningProgress()
  const firstStop = itinerary[0]
  const lastStop = itinerary[itinerary.length - 1]
  const firstDestination = itinerary.find((stop) => !stop.isHome)
  const { data: weather } = useWeather()
  const { isCompleted } = useCompletedTasks()
  const currentWeather = status.current && weather?.[status.current.city]

  let nextActivity = null
  let activitiesDone = false

  if (status.current) {
    const dayNumber = getTripDayNumber(toISODate(new Date()))
    const dayActivities = activities[status.current.slug]?.[dayNumber]

    if (dayActivities?.length > 0) {
      const pendingIndex = dayActivities.findIndex(
        (_, index) => !isCompleted(`${status.current.slug}:${dayNumber}:${index}`),
      )
      if (pendingIndex === -1) activitiesDone = true
      else nextActivity = dayActivities[pendingIndex]
    }
  }

  return (
    <div className="container dashboard">
      <Snowfall />
      <ChristmasLights />
      <header className="dashboard__header">
        <h1>EUROPA 2027 🇪🇸🇨🇿🇭🇺🇦🇹🇫🇮</h1>
        <p className="text-muted">
          {formatShortDate(firstStop.startDate)} — {formatShortDate(lastStop.endDate)}
        </p>
      </header>

      {status.phase === 'before' && (
        <section className="card dashboard__countdown">
          <span className="badge">Faltan {status.daysUntilStart} días</span>
          <h2>Arranca la aventura</h2>
          <p className="text-muted">
            Primer destino: {firstDestination.flag} {firstDestination.city}, {firstDestination.country}
          </p>
          {firstDestination.transport && (
            <p className="text-muted dashboard__countdown-transport">
              {firstDestination.transport.emoji} {firstDestination.transport.mode}
              {firstDestination.transport.detail ? ` · ${firstDestination.transport.detail}` : ''}
            </p>
          )}
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
              <span className="text-muted">Estás en</span>
              <h2>
                {status.current.flag} {status.current.city}
              </h2>
              <p className="text-muted">
                {status.current.country}
                {status.current.nights > 0 &&
                  ` · Noche ${getNightNumber(status.current)} de ${status.current.nights}`}
              </p>
              {currentWeather && (
                <p className="text-muted dashboard__current-sun">
                  🌅 {currentWeather.sunrise} · 🌇 {currentWeather.sunset}
                </p>
              )}
              {nextActivity && (
                <p className="dashboard__current-activity">
                  ⏭️ {nextActivity.time ? `${nextActivity.time} · ` : ''}
                  {nextActivity.text}
                </p>
              )}
              {activitiesDone && (
                <p className="text-muted dashboard__current-activity">
                  ✅ Ya completaste las actividades de hoy
                </p>
              )}
              {(nextActivity || activitiesDone) && (
                <Link to={`/destino/${status.current.slug}`} className="dashboard__current-link">
                  Ver plan de hoy ›
                </Link>
              )}
            </section>
          )}

          {status.next && (
            <section className="dashboard__next">
              <h3>Próximo destino</h3>
              <DestinationCard stop={status.next} />
            </section>
          )}

          <section className="dashboard__stats">
            <StatTile label="Países" value={summary.countries} />
            <StatTile label="Ciudades" value={summary.cities} />
            <StatTile label="Noches restantes" value={status.nightsRemaining} />
          </section>
        </>
      )}

      {status.phase === 'after' && (
        <section className="card dashboard__finished">
          <h2>Viaje completado ❄️</h2>
          <p className="text-muted">
            {summary.countries} países · {summary.cities} ciudades · {summary.totalNights} noches
          </p>
        </section>
      )}

      <Link to="/herramientas" className="card dashboard__tools-link">
        <span className="dashboard__tools-icon">🧰</span>
        <span className="dashboard__tools-label">Herramientas</span>
        <span className="dashboard__tools-arrow" aria-hidden="true">
          ›
        </span>
      </Link>

      <section className="dashboard__timeline">
        <h2>Itinerario completo</h2>
        <Timeline items={timeline} />
      </section>
    </div>
  )
}

export default Dashboard
