import { useParams, Link } from 'react-router-dom'
import { itinerary } from '../data/itinerary'
import { activities } from '../data/activities'
import { getPhotos } from '../data/photos'
import { formatShortDate, getStopDays } from '../utils/trip'
import { useCompletedTasks } from '../hooks/useCompletedTasks'
import { useWeather } from '../hooks/useWeather'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import AuroraStatus from '../components/AuroraStatus.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import Spinner from '../components/Spinner.jsx'
import './CityDetail.css'

function CityDetail() {
  const { slug } = useParams()
  const stop = itinerary.find((s) => s.slug === slug)
  const { isCompleted, toggle } = useCompletedTasks()
  const { data: weather, loading: weatherLoading } = useWeather()

  if (!stop) {
    return (
      <div className="container city-detail">
        <p>Destino no encontrado.</p>
        <Link to="/">‹ Volver al inicio</Link>
      </div>
    )
  }

  const days = getStopDays(stop)
  const cityWeather = weather?.[stop.city]

  const { totalTasks, completedTasks } = days.reduce(
    (acc, day) => {
      const dayActivities = activities[stop.slug]?.[day.dayNumber] ?? []
      const done = dayActivities.filter((_, index) =>
        isCompleted(`${stop.slug}:${day.dayNumber}:${index}`),
      ).length
      return { totalTasks: acc.totalTasks + dayActivities.length, completedTasks: acc.completedTasks + done }
    },
    { totalTasks: 0, completedTasks: 0 },
  )

  return (
    <div className="container city-detail">
      <Snowfall />
      <ChristmasLights />
      <Link to="/" className="city-detail__back">
        ‹ Itinerario
      </Link>

      <header className="city-detail__header">
        <span className="city-detail__flag">{stop.flag}</span>
        <div>
          <h1>{stop.city}</h1>
          <p className="text-muted">
            {stop.country} · {formatShortDate(stop.startDate)} – {formatShortDate(stop.endDate)} ·{' '}
            {stop.nights} {stop.nights === 1 ? 'noche' : 'noches'}
          </p>
        </div>
        {weatherLoading ? (
          <div className="city-detail__weather">
            <Spinner size={16} />
          </div>
        ) : (
          cityWeather && (
            <div className="city-detail__weather">
              <span className="city-detail__weather-current">🌡️ {cityWeather.current}°</span>
              <span className="text-muted city-detail__weather-range">
                {cityWeather.min}°/{cityWeather.max}°
              </span>
            </div>
          )
        )}
      </header>

      {stop.slug === 'rovaniemi' && <AuroraStatus />}

      {totalTasks > 0 && (
        <span className="badge city-detail__progress">
          ✅ {completedTasks}/{totalTasks} actividades completadas
        </span>
      )}

      <section className="city-detail__days">
        {days.map((day) => {
          const dayActivities = activities[stop.slug]?.[day.dayNumber]

          return (
            <div className="card city-detail__day" key={day.dayNumber}>
              <div className="city-detail__day-label">
                <span>Día {day.dayNumber}</span>
                <span className="text-muted">{formatShortDate(day.date)}</span>
              </div>
              {dayActivities ? (
                <ul className="city-detail__activities">
                  {dayActivities.map((activity, index) => {
                    const taskId = `${stop.slug}:${day.dayNumber}:${index}`
                    const done = isCompleted(taskId)

                    return (
                      <li key={index} className={done ? 'is-done' : undefined}>
                        <input
                          type="checkbox"
                          className="city-detail__activity-check"
                          checked={done}
                          onChange={() => toggle(taskId)}
                          aria-label={`Marcar "${activity.text}" como completada`}
                        />
                        <span className="city-detail__activity-time">{activity.time}</span>
                        <span className="city-detail__activity-text">{activity.text}</span>
                        {activity.mapUrl && (
                          <a
                            href={activity.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="city-detail__activity-icon"
                            aria-label={`Ver ubicación de "${activity.text}" en Google Maps`}
                          >
                            📍
                          </a>
                        )}
                        {activity.fileUrls?.map((fileUrl, fileIndex) => (
                          <a
                            key={fileUrl}
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="city-detail__activity-icon"
                            aria-label={`Ver archivo adjunto ${fileIndex + 1} de "${activity.text}"`}
                          >
                            📎
                          </a>
                        ))}
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="text-muted city-detail__empty">Sin actividades cargadas todavía.</p>
              )}
            </div>
          )
        })}
      </section>

      <section className="city-detail__gallery">
        <h2>Galería</h2>
        <PhotoGallery photos={getPhotos(stop.slug)} />
      </section>
    </div>
  )
}

export default CityDetail
