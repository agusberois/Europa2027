import { useEffect, useState } from 'react'

const POLL_INTERVAL = 60 * 60 * 1000
const RATES_URL = 'https://open.er-api.com/v6/latest/UYU'

export function useExchangeRates() {
  const [state, setState] = useState({ loading: true, error: null, rates: null })

  useEffect(() => {
    let cancelled = false

    async function fetchRates() {
      try {
        const response = await fetch(RATES_URL)
        if (!response.ok) throw new Error('Respuesta no válida')
        const result = await response.json()
        if (cancelled) return
        setState({ loading: false, error: null, rates: result.rates })
      } catch {
        if (!cancelled) setState({ loading: false, error: true, rates: null })
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, POLL_INTERVAL)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return state
}
