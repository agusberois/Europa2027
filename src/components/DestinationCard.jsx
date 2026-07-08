import { formatShortDate } from '../utils/trip'
import './DestinationCard.css'

function DestinationCard({ stop }) {
  return (
    <div className="card destination-card">
      <div className="destination-card__flag">{stop.flag}</div>
      <div className="destination-card__info">
        <h3>{stop.city}</h3>
        <p className="text-muted">{stop.country}</p>
        <p className="text-muted destination-card__dates">
          {formatShortDate(stop.startDate)} – {formatShortDate(stop.endDate)} ·{' '}
          {stop.nights} {stop.nights === 1 ? 'noche' : 'noches'}
        </p>
      </div>
    </div>
  )
}

export default DestinationCard
