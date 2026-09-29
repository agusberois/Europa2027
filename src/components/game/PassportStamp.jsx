import { formatShortDate } from '../../utils/trip'
import './PassportStamp.css'

// Sello de goma: la inclinación sale del nombre para que cada ciudad tenga la
// suya y no cambie entre renders.
function tiltFor(city) {
  const hash = [...city].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return (hash % 21) - 10
}

function PassportStamp({ city, flag, date, real, slam = false }) {
  return (
    <div
      className={`stamp${real ? ' stamp--real' : ''}${slam ? ' stamp--slam' : ''}`}
      style={{ '--tilt': `${tiltFor(city)}deg` }}
    >
      <span className="stamp__label">{real ? '★ Estuve acá ★' : 'Explorador'}</span>
      <span className="stamp__flag">{flag}</span>
      <span className="stamp__city">{city}</span>
      <span className="stamp__date">{formatShortDate(date)}</span>
    </div>
  )
}

export default PassportStamp
