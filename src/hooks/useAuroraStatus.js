import { useEffect, useState } from 'react'

const KP_INDEX_URL = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json'
const POLL_INTERVAL = 15 * 60 * 1000

function levelFromKp(kp) {
  if (kp >= 5) return { level: 'high', label: '¡Alta probabilidad!' }
  if (kp >= 3) return { level: 'good', label: 'Buena probabilidad' }
  return { level: 'low', label: 'Baja probabilidad' }
}

export function useAuroraStatus() {
  const [status, setStatus] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    let cancelled = false

    async function fetchStatus() {
      try {
        const response = await fetch(KP_INDEX_URL)
        if (!response.ok) throw new Error('Respuesta no válida')
        const entries = await response.json()
        const latest = entries[entries.length - 1]
        if (cancelled || !latest) return

        setStatus({
          loading: false,
          error: null,
          data: {
            kp: latest.Kp,
            time: latest.time_tag,
            ...levelFromKp(latest.Kp),
          },
        })
      } catch {
        if (!cancelled) setStatus({ loading: false, error: true, data: null })
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
