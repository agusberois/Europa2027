import { useEffect, useState } from 'react'
import { cityCoordinates } from '../data/coordinates'

const POLL_INTERVAL = 30 * 60 * 1000
const cities = Object.keys(cityCoordinates)

function buildUrl() {
  const lats = cities.map((city) => cityCoordinates[city].lat).join(',')
  const lons = cities.map((city) => cityCoordinates[city].lon).join(',')
  return `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
}

export function useWeather() {
  const [state, setState] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    let cancelled = false

    async function fetchWeather() {
      try {
        const response = await fetch(buildUrl())
        if (!response.ok) throw new Error('Respuesta no válida')
        const results = await response.json()
        if (cancelled) return

        const data = {}
        results.forEach((result, index) => {
          data[cities[index]] = {
            current: Math.round(result.current.temperature_2m),
            max: Math.round(result.daily.temperature_2m_max[0]),
            min: Math.round(result.daily.temperature_2m_min[0]),
          }
        })

        setState({ loading: false, error: null, data })
      } catch {
        if (!cancelled) setState({ loading: false, error: true, data: null })
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, POLL_INTERVAL)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return state
}
