import { useEffect, useState } from 'react'
import './Countdown.css'

const MS = { day: 86400000, hour: 3600000, minute: 60000, second: 1000 }

function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const diff = Math.max(0, target - now)
  const units = [
    { label: 'días', value: Math.floor(diff / MS.day) },
    { label: 'horas', value: Math.floor(diff / MS.hour) % 24 },
    { label: 'min', value: Math.floor(diff / MS.minute) % 60 },
    { label: 'seg', value: Math.floor(diff / MS.second) % 60 },
  ]

  return (
    <div className="countdown" role="timer" aria-label={`Faltan ${units[0].value} días`}>
      {units.map((unit) => (
        <div className="countdown__unit" key={unit.label}>
          {/* key={value}: remonta el número en cada cambio para animar el "tic" */}
          <span className="countdown__value" key={unit.value} aria-hidden="true">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="countdown__label" aria-hidden="true">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Countdown
