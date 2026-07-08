import { useMemo } from 'react'
import './ChristmasLights.css'

const COLORS = ['#e5484d', '#2f9e63', '#f2c94c', '#4a90d9']
const BULB_COUNT = 16

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

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

  return (
    <div className="xmas-lights" aria-hidden="true">
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
    </div>
  )
}

export default ChristmasLights
