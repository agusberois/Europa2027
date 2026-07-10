import { useEffect, useState } from 'react'
import { cityCoordinates } from '../data/coordinates'

const POLL_INTERVAL = 30 * 60 * 1000
const cities = Object.keys(cityCoordinates)

function formatTime(isoString) {
  return isoString.slice(11, 16)
}

// Códigos WMO usados por Open-Meteo (https://open-meteo.com/en/docs).
const WEATHER_ICONS = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌦️',
  55: '🌦️',
  56: '🌧️',
  57: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  66: '🌧️',
  67: '🌧️',
  71: '❄️',
  73: '❄️',
  75: '❄️',
  77: '❄️',
  80: '🌦️',
  81: '🌦️',
  82: '🌧️',
  85: '🌨️',
  86: '🌨️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
}

export function weatherIcon(code) {
  return WEATHER_ICONS[code] ?? '🌡️'
}

function buildUrl() {
  const lats = cities.map((city) => cityCoordinates[city].lat).join(',')
  const lons = cities.map((city) => cityCoordinates[city].lon).join(',')
  return `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1`
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
            code: result.current.weather_code,
            max: Math.round(result.daily.temperature_2m_max[0]),
            min: Math.round(result.daily.temperature_2m_min[0]),
            sunrise: formatTime(result.daily.sunrise[0]),
            sunset: formatTime(result.daily.sunset[0]),
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
