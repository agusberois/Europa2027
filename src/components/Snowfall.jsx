import { useEffect, useMemo, useState } from 'react'
import { onSnowstorm } from '../game/snowstorm'
import './Snowfall.css'

const FLAKE_COUNT = 24
const STORM_FLAKE_COUNT = 90
const STORM_DURATION = 6000

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function makeFlakes(count, { minDuration, maxDuration, maxDelay }) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    size: randomBetween(0.5, 1.25),
    duration: randomBetween(minDuration, maxDuration),
    delay: randomBetween(-maxDelay, 0),
    drift: randomBetween(-30, 30),
    opacity: randomBetween(0.35, 0.85),
  }))
}

function Flake({ flake, className = '' }) {
  return (
    <span
      className={`snowfall__flake ${className}`}
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
  )
}

function Snowfall() {
  const flakes = useMemo(
    () => makeFlakes(FLAKE_COUNT, { minDuration: 8, maxDuration: 18, maxDelay: 18 }),
    [],
  )
  const [storm, setStorm] = useState(null)

  useEffect(
    () =>
      onSnowstorm(() => {
        const id = Date.now()
        setStorm({
          id,
          flakes: makeFlakes(STORM_FLAKE_COUNT, { minDuration: 1.8, maxDuration: 3.5, maxDelay: 0 }).map(
            (flake) => ({ ...flake, delay: randomBetween(0, 2), drift: randomBetween(-160, 160) }),
          ),
        })
        setTimeout(() => setStorm((current) => (current?.id === id ? null : current)), STORM_DURATION)
      }),
    [],
  )

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((flake) => (
        <Flake key={flake.id} flake={flake} />
      ))}
      {storm?.flakes.map((flake) => (
        <Flake key={`${storm.id}-${flake.id}`} flake={flake} className="snowfall__flake--storm" />
      ))}
    </div>
  )
}

export default Snowfall
