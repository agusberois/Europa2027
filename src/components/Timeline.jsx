import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { formatShortDate } from '../utils/trip'
import { useWeather, weatherIcon } from '../hooks/useWeather'
import Spinner from './Spinner.jsx'
import './Timeline.css'

function dayLabel(item) {
  return item.dayStart === item.dayEnd ? `Día ${item.dayStart}` : `Día ${item.dayStart}–${item.dayEnd}`
}

function Timeline({ items }) {
  const { data: weather, loading: weatherLoading } = useWeather()

  return (
    <ol className="timeline">
      {items.map((item) => {
        const cityWeather = weather?.[item.city]

        return (
          <Fragment key={item.id}>
            {item.transport && (
              <li className="timeline__transport">
                <span aria-hidden="true">{item.transport.emoji}</span>
                <span>
                  {item.transport.mode}
                  {item.transport.detail ? ` · ${item.transport.detail}` : ''}
                </span>
              </li>
            )}
            <li className={`timeline__item timeline__item--${item.state}`}>
              <div className="timeline__marker" />
              <Link
                to={`/destino/${item.slug}`}
                className="card timeline__content"
                aria-label={`Ver plan de ${item.city}`}
              >
                <div className="timeline__day">{dayLabel(item)}</div>
                <div className="timeline__main">
                  <span className="timeline__flag">{item.flag}</span>
                  <div>
                    <h3>{item.city}</h3>
                    <p className="text-muted timeline__dates">
                      {formatShortDate(item.startDate)} – {formatShortDate(item.endDate)} ·{' '}
                      {item.nights} {item.nights === 1 ? 'noche' : 'noches'}
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
                <span className="timeline__arrow" aria-hidden="true">
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
