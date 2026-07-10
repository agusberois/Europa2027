import { Link } from 'react-router-dom'
import { itinerary } from '../data/itinerary'
import {
  getTripStatus,
  getTripSummary,
  getNightNumber,
  getItineraryTimeline,
  formatShortDate,
} from '../utils/trip'
import DestinationCard from '../components/DestinationCard.jsx'
import StatTile from '../components/StatTile.jsx'
import Timeline from '../components/Timeline.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import { useWeather } from '../hooks/useWeather'
import './Dashboard.css'

function Dashboard() {
  const status = getTripStatus()
  const summary = getTripSummary()
  const timeline = getItineraryTimeline()
  const firstStop = itinerary[0]
  const lastStop = itinerary[itinerary.length - 1]
  const firstDestination = itinerary.find((stop) => !stop.isHome)
  const { data: weather } = useWeather()
  const currentWeather = status.current && weather?.[status.current.city]

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
