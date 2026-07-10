import { useState } from 'react'
import { useAuroraStatus } from '../hooks/useAuroraStatus'
import './AuroraStatus.css'

function dayLabel(dateStr, index) {
  if (index === 0) return 'Hoy'
  if (index === 1) return 'Mañana'
  if (index === 2) return 'Pasado mañana'
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

function AuroraStatus() {
  const { loading, error, days } = useAuroraStatus()
  const [selectedDate, setSelectedDate] = useState(null)

  const active = days.find((day) => day.date === selectedDate) ?? days[0]

  return (
    <div className="card aurora-status">
      <div className="aurora-status__header">
        <span className="text-muted aurora-status__title">🌌 Estado de auroras (índice Kp)</span>
        {days.length > 0 && (
          <select
            className="aurora-status__select"
            value={active.date}
            onChange={(event) => setSelectedDate(event.target.value)}
            aria-label="Elegir día"
          >
            {days.map((day, index) => (
              <option key={day.date} value={day.date}>
                {dayLabel(day.date, index)}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading && <p className="text-muted aurora-status__message">Cargando…</p>}
      {error && (
        <p className="text-muted aurora-status__message">No se pudo cargar el pronóstico.</p>
      )}

      {active && (
        <>
          <div className="aurora-status__value">
            <span className="aurora-status__kp">Kp máx. {active.kp.toFixed(1)}</span>
            <span className={`badge aurora-status__level aurora-status__level--${active.level}`}>
              {active.label}
            </span>
          </div>
          <p className="text-muted aurora-status__updated">
            {active.isForecast ? 'Pronóstico NOAA' : 'Dato observado/estimado'}
          </p>
        </>
      )}
    </div>
  )
}

export default AuroraStatus
