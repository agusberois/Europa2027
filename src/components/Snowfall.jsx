import { useMemo } from 'react'
import './Snowfall.css'

const FLAKE_COUNT = 24

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        size: randomBetween(0.5, 1.25),
        duration: randomBetween(8, 18),
        delay: randomBetween(-18, 0),
        drift: randomBetween(-30, 30),
        opacity: randomBetween(0.35, 0.85),
      })),
    [],
  )

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowfall__flake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}rem`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            '--drift': `${flake.drift}px`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  )
}

export default Snowfall
