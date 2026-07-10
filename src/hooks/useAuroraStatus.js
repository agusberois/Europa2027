import { useEffect, useState } from 'react'

const KP_FORECAST_URL = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json'
const POLL_INTERVAL = 15 * 60 * 1000

function levelFromKp(kp) {
  if (kp >= 5) return { level: 'high', label: '¡Alta probabilidad!' }
  if (kp >= 3) return { level: 'good', label: 'Buena probabilidad' }
  return { level: 'low', label: 'Baja probabilidad' }
}

// El producto de NOAA trae ~7 días de historia más lo que alcance a
// pronosticar (normalmente hoy + 2 días completos y un tercero parcial).
// Nos quedamos solo con hoy en adelante, según lo que la API entregue.
export function useAuroraStatus() {
  const [status, setStatus] = useState({ loading: true, error: null, days: [] })

  useEffect(() => {
    let cancelled = false

    async function fetchStatus() {
      try {
        const response = await fetch(KP_FORECAST_URL)
        if (!response.ok) throw new Error('Respuesta no válida')
        const entries = await response.json()
        if (cancelled) return

        const today = new Date().toISOString().slice(0, 10)

        const byDate = new Map()
        entries.forEach((entry) => {
          const date = entry.time_tag.slice(0, 10)
          if (date < today) return
          if (!byDate.has(date)) byDate.set(date, [])
          byDate.get(date).push(entry)
        })

        const days = Array.from(byDate.entries()).map(([date, dayEntries]) => {
          const kp = Math.max(...dayEntries.map((entry) => entry.kp))
          const isForecast = dayEntries.some((entry) => entry.observed === 'predicted')
          return { date, kp, isForecast, ...levelFromKp(kp) }
        })

        setStatus({ loading: false, error: null, days })
      } catch {
        if (!cancelled) setStatus({ loading: false, error: true, days: [] })
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, POLL_INTERVAL)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return status
}
