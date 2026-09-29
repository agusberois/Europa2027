import { useMemo, useState } from 'react'
import { triggerSnowstorm, requestMotionPermission } from '../game/snowstorm'
import './ChristmasLights.css'

const COLORS = ['#e5484d', '#2f9e63', '#f2c94c', '#4a90d9']
const BULB_COUNT = 16
const PARTY_DURATION = 2500

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

// Tocar la guirnalda: las luces se vuelven locas y se larga a nevar fuerte.
function ChristmasLights() {
  const bulbs = useMemo(
    () =>
      Array.from({ length: BULB_COUNT }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        delay: randomBetween(0, 2),
        duration: randomBetween(1.5, 3),
      })),
    [],
  )
  const [party, setParty] = useState(false)

  function handleClick() {
    requestMotionPermission()
    triggerSnowstorm()
    setParty(true)
    setTimeout(() => setParty(false), PARTY_DURATION)
  }

  return (
    <button
      type="button"
      className={`xmas-lights${party ? ' is-party' : ''}`}
      onClick={handleClick}
      aria-label="Desatar una tormenta de nieve"
    >
      {bulbs.map((bulb, i) => (
        <span
          key={bulb.id}
          className="xmas-lights__bulb"
          style={{
            '--bulb-color': bulb.color,
            animationDelay: `${bulb.delay}s`,
            animationDuration: `${bulb.duration}s`,
            transform: i % 2 === 0 ? 'translateY(0)' : 'translateY(6px)',
          }}
        />
      ))}
    </button>
  )
}

export default ChristmasLights
