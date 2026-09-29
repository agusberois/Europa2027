import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { itinerary } from '../data/itinerary'
import { activities } from '../data/activities'
import { getPhotos } from '../data/photos'
import { countryEmojis } from '../data/countryFun'
import { formatShortDate, getStopDays, toISODate } from '../utils/trip'
import { confetti } from '../utils/confetti'
import { useCompletedTasks } from '../hooks/useCompletedTasks'
import { useWeather, weatherIcon } from '../hooks/useWeather'
import BackLink from '../components/BackLink.jsx'
import DestinationEmojis from '../components/DestinationEmojis.jsx'
import AuroraStatus from '../components/AuroraStatus.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import Spinner from '../components/Spinner.jsx'
import './CityDetail.css'

const EMPTY_DAY_MESSAGES = [
  'Día libre: a improvisar 🎲',
  'Nada planeado… todavía 👀',
  'Lienzo en blanco 🎨',
]

function progressMessage(done, total) {
  if (done === 0) return '¡A arrancar! 🚀'
  if (done === total) return '¡Ciudad conquistada! 🏆'
  if (done / total < 0.5) return 'Vamos bien 💪'
  return '¡Ya casi! 🔥'
}

function formatDayDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

function taskKey(slug, dayNumber, index) {
  return `${slug}:${dayNumber}:${index}`
}

function CityDetail() {
  const { slug } = useParams()
  const stopIndex = itinerary.findIndex((s) => s.slug === slug)
  const stop = itinerary[stopIndex]
  const { isCompleted, toggle } = useCompletedTasks()
  const { data: weather, loading: weatherLoading } = useWeather()
  const todayRef = useRef(null)
  const today = toISODate(new Date())

  // Durante el viaje, abrir la ciudad actual lleva directo al plan de hoy.
  useEffect(() => {
    const node = todayRef.current
    if (!node || node.dataset.first === 'true') return undefined
    const frame = requestAnimationFrame(() => node.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [slug])

  if (!stop) {
    return (
      <div className="container stack">
        <BackLink to="/">Itinerario</BackLink>
        <div className="card empty-state">
          <span className="empty-state__icon">🧭</span>
          <p>Este destino no está en el mapa… ¿nos perdimos?</p>
        </div>
      </div>
    )
  }

  const prevStop = itinerary[stopIndex - 1]
  const nextStop = itinerary[stopIndex + 1]
  const days = getStopDays(stop)
  const cityWeather = weather?.[stop.city]
  const dayActivitiesOf = (day) => activities[stop.slug]?.[day.dayNumber] ?? []

  const { totalTasks, completedTasks } = days.reduce(
    (acc, day) => {
      const dayActivities = dayActivitiesOf(day)
      const done = dayActivities.filter((_, index) =>
        isCompleted(taskKey(stop.slug, day.dayNumber, index)),
      ).length
      return { totalTasks: acc.totalTasks + dayActivities.length, completedTasks: acc.completedTasks + done }
    },
    { totalTasks: 0, completedTasks: 0 },
  )
  const cityPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  function handleToggle(event, day, index) {
    const taskId = taskKey(stop.slug, day.dayNumber, index)
    const wasDone = isCompleted(taskId)
    toggle(taskId)
    if (wasDone) return

    const pendingInDay = dayActivitiesOf(day).filter(
      (_, i) => !isCompleted(taskKey(stop.slug, day.dayNumber, i)),
    ).length

    // Era la última pendiente del día: festejo. Si además cierra la ciudad,
    // festejo grande con los emojis del país.
    if (pendingInDay === 1) {
      const cityDone = completedTasks + 1 === totalTasks
      confetti(
        event.currentTarget,
        cityDone
          ? { pieces: [stop.flag, '🏆', ...countryEmojis[stop.countryCode]], count: 36, spread: 220 }
          : undefined,
      )
    }
  }

  return (
    <div className="container stack city-detail">
      <BackLink to="/">Itinerario</BackLink>

      <header className="card city-detail__hero">
        <div className="city-detail__title-row">
          <button
            type="button"
            className="city-detail__flag"
            onClick={(event) =>
              confetti(event.currentTarget, { pieces: [stop.flag, ...countryEmojis[stop.countryCode]] })
            }
            aria-label={`Festejar ${stop.country}`}
          >
            {stop.flag}
          </button>
          <div className="city-detail__title">
            <h1>{stop.city}</h1>
            <p className="text-muted">
              {stop.country} · {formatShortDate(stop.startDate)} – {formatShortDate(stop.endDate)} ·{' '}
              {stop.nights} {stop.nights === 1 ? 'noche' : 'noches'}
            </p>
          </div>
        </div>

        <DestinationEmojis key={stop.slug} city={stop.city} />

        {weatherLoading && (
          <div className="city-detail__weather">
            <span className="city-detail__chip">
              <Spinner size={12} /> Clima…
            </span>
          </div>
        )}
        {cityWeather && (
          <div className="city-detail__weather">
            <span className="city-detail__chip city-detail__chip--strong">
              {weatherIcon(cityWeather.code)} {cityWeather.current}°
            </span>
            <span className="city-detail__chip">
              ↓{cityWeather.min}° ↑{cityWeather.max}°
            </span>
            <span className="city-detail__chip">🌅 {cityWeather.sunrise}</span>
            <span className="city-detail__chip">🌇 {cityWeather.sunset}</span>
          </div>
        )}

        {totalTasks > 0 && (
          <div className="city-detail__progress">
            <div className="city-detail__progress-labels">
              <span className="city-detail__progress-message">
                {progressMessage(completedTasks, totalTasks)}
              </span>
              <span className="text-muted">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <div
              className={`progress${completedTasks === totalTasks ? ' progress--success' : ''}`}
              role="progressbar"
              aria-valuenow={cityPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Actividades completadas"
            >
              <div className="progress__fill" style={{ width: `${cityPercent}%` }} />
            </div>
          </div>
        )}
      </header>

      {stop.slug === 'rovaniemi' && <AuroraStatus />}

      <section className="city-detail__days">
        {days.map((day, dayIndex) => {
          const dayActivities = dayActivitiesOf(day)
          const isToday = day.date === today
          const doneCount = dayActivities.filter((_, index) =>
            isCompleted(taskKey(stop.slug, day.dayNumber, index)),
          ).length
          const dayDone = dayActivities.length > 0 && doneCount === dayActivities.length

          return (
            <article
              key={day.dayNumber}
              ref={isToday ? todayRef : undefined}
              data-first={dayIndex === 0}
              className={`card city-detail__day${isToday ? ' is-today' : ''}${dayDone ? ' is-done' : ''}`}
              style={{ '--i': dayIndex }}
            >
              <div className="city-detail__day-label">
                <span className="city-detail__day-number">Día {day.dayNumber}</span>
                <span className="text-muted city-detail__day-date">{formatDayDate(day.date)}</span>
                {isToday && <span className="badge city-detail__today">Hoy</span>}
                {dayActivities.length > 0 && (
                  <span className="city-detail__day-count">
                    {dayDone ? '✅' : `${doneCount}/${dayActivities.length}`}
                  </span>
                )}
              </div>

              {dayActivities.length > 0 ? (
                <ul className="city-detail__activities">
                  {dayActivities.map((activity, index) => {
                    const done = isCompleted(taskKey(stop.slug, day.dayNumber, index))

                    return (
                      <li key={index} className={done ? 'is-done' : undefined}>
                        <label className="city-detail__activity-main">
                          <input
                            type="checkbox"
                            className="city-detail__activity-check"
                            checked={done}
                            onChange={(event) => handleToggle(event, day, index)}
                          />
                          <span className="city-detail__activity-body">
                            {activity.time && <span className="time-pill">{activity.time}</span>}
                            <span className="city-detail__activity-text">{activity.text}</span>
                          </span>
                        </label>
                        {(activity.mapUrl || activity.fileUrls) && (
                          <span className="city-detail__activity-links">
                            {activity.mapUrl && (
                              <a
                                href={activity.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="city-detail__icon-link"
                                aria-label={`Ver ubicación de "${activity.text}" en Google Maps`}
                                title="Ver en el mapa"
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
                                className="city-detail__icon-link"
                                aria-label={`Ver archivo adjunto ${fileIndex + 1} de "${activity.text}"`}
                                title="Ver reserva / ticket"
                              >
                                🎟️
                              </a>
                            ))}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="text-muted city-detail__empty">
                  {EMPTY_DAY_MESSAGES[day.dayNumber % EMPTY_DAY_MESSAGES.length]}
                </p>
              )}
            </article>
          )
        })}
      </section>

      <section className="city-detail__gallery">
        <h2>📸 Galería</h2>
        <PhotoGallery photos={getPhotos(stop.slug)} />
      </section>

      <nav className="city-detail__nav" aria-label="Otras paradas">
        {prevStop ? (
          <Link to={`/destino/${prevStop.slug}`} className="card card-link city-detail__nav-link">
            <span className="text-muted city-detail__nav-hint">‹ Anterior</span>
            <span className="city-detail__nav-city">
              {prevStop.flag} {prevStop.city}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextStop && (
          <Link
            to={`/destino/${nextStop.slug}`}
            className="card card-link city-detail__nav-link city-detail__nav-link--next"
          >
            <span className="text-muted city-detail__nav-hint">
              {nextStop.transport ? `${nextStop.transport.emoji} ` : ''}Siguiente ›
            </span>
            <span className="city-detail__nav-city">
              {nextStop.city} {nextStop.flag}
            </span>
          </Link>
        )}
      </nav>
    </div>
  )
}

export default CityDetail
