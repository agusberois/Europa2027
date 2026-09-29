import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatShortDate } from '../utils/trip'
import { useWeather, weatherIcon } from '../hooks/useWeather'
import { getCityEmojis } from '../data/cityEmojis'
import Spinner from './Spinner.jsx'
import './Timeline.css'

function dayLabel(item) {
  return item.dayStart === item.dayEnd ? `Día ${item.dayStart}` : `Día ${item.dayStart}–${item.dayEnd}`
}

function datesLabel(item) {
  if (item.nights === 0) {
    const moment = item.id === 1 ? '¡despegamos! 🛫' : 'vuelta a casa 🛬'
    return `${formatShortDate(item.startDate)} · ${moment}`
  }
  const nights = `${item.nights} ${item.nights === 1 ? 'noche' : 'noches'}`
  return `${formatShortDate(item.startDate)} – ${formatShortDate(item.endDate)} · ${nights}`
}

function Timeline({ items }) {
  const { data: weather, loading: weatherLoading } = useWeather()

  return (
    <ol className="timeline">
      {items.map((item, index) => {
        const cityWeather = weather?.[item.city]

        return (
          <Fragment key={item.id}>
            {item.transport && (
              <li className="timeline__transport" style={{ '--i': index }}>
                <span className="timeline__transport-emoji" aria-hidden="true">
                  {item.transport.emoji}
                </span>
                <span>
                  {item.transport.mode}
                  {item.transport.detail ? ` · ${item.transport.detail}` : ''}
                </span>
              </li>
            )}
            <li
              className={`timeline__item timeline__item--${item.state}`}
              style={{ '--i': index }}
            >
              <div className="timeline__marker" />
              <Link
                to={`/destino/${item.slug}`}
                className="card card-link timeline__content"
                aria-label={`Ver plan de ${item.city}`}
              >
                <div className="timeline__day">{dayLabel(item)}</div>
                <div className="timeline__main">
                  <span className="timeline__flag">{item.flag}</span>
                  <div>
                    <h3>
                      {item.city}
                      {item.isHome && <span className="timeline__home"> 🏠 casa</span>}
                    </h3>
                    <p className="text-muted timeline__dates">{datesLabel(item)}</p>
                    <p className="timeline__emojis" aria-hidden="true">
                      {getCityEmojis(item.city)
                        .slice(0, 4)
                        .map((entry) => entry.emoji)
                        .join(' ')}
                    </p>
                    {weatherLoading ? (
                      <p className="text-muted timeline__weather">
                        <Spinner size={11} /> Clima…
                      </p>
                    ) : (
                      cityWeather && (
                        <p className="text-muted timeline__weather">
                          {weatherIcon(cityWeather.code)} {cityWeather.current}° (
                          {cityWeather.min}°/{cityWeather.max}°)
                        </p>
                      )
                    )}
                  </div>
                </div>
                {item.state === 'current' && <span className="badge timeline__status">Hoy</span>}
                {item.state === 'past' && <span className="timeline__check">✓</span>}
                <span className="chevron" aria-hidden="true">
                  ›
                </span>
              </Link>
            </li>
          </Fragment>
        )
      })}
    </ol>
  )
}

export default Timeline
