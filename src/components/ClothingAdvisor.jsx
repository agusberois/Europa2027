import { itinerary } from '../data/itinerary'
import { useWeather, weatherIcon } from '../hooks/useWeather'
import { getClothingAdvice, precipitationHint } from '../data/clothingAdvice'
import Spinner from './Spinner.jsx'
import './ClothingAdvisor.css'

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

function ClothingAdvisor() {
  const { data: weather, loading, error } = useWeather()

  if (loading) {
    return (
      <p className="text-muted clothing-advisor__status">
        <Spinner size={14} /> Cargando clima…
      </p>
    )
  }

  if (error) {
    return <p className="text-muted clothing-advisor__status">No se pudo cargar el clima.</p>
  }

  return (
    <ul className="clothing-advisor">
      {cities.map((stop) => {
        const cityWeather = weather?.[stop.city]
        if (!cityWeather) return null

        const band = getClothingAdvice(cityWeather.current)
        const precip = precipitationHint(cityWeather.code)

        return (
          <li key={stop.city} className="card clothing-advisor__item">
            <div className="clothing-advisor__header">
              <span className="clothing-advisor__city">
                {stop.flag} {stop.city}
              </span>
              <span className="clothing-advisor__temp">
                {weatherIcon(cityWeather.code)} {cityWeather.current}°
              </span>
            </div>
            <p className="text-muted clothing-advisor__range">
              Hoy entre {cityWeather.min}° y {cityWeather.max}°
            </p>
            <span className={`badge clothing-advisor__band clothing-advisor__band--${band.code}`}>
              {band.label}
            </span>
            <p className="clothing-advisor__advice">{band.advice}</p>
            {precip && <p className="text-muted clothing-advisor__precip">{precip}</p>}
          </li>
        )
      })}
    </ul>
  )
}

export default ClothingAdvisor
