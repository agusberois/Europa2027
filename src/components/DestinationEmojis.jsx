import { useState } from 'react'
import { getCityEmojis } from '../data/cityEmojis'
import { confetti } from '../utils/confetti'
import { bump } from '../game/store'
import './DestinationEmojis.css'

function DestinationEmojis({ city }) {
  const items = getCityEmojis(city)
  const [active, setActive] = useState(null)
  // Sube en cada toque para remontar el emoji y repetir el salto aunque
  // se toque el mismo dos veces seguidas.
  const [tapCount, setTapCount] = useState(0)

  if (items.length === 0) return null

  function handleTap(event, index) {
    confetti(event.currentTarget, { pieces: [items[index].emoji], count: 10, spread: 90 })
    setActive(index)
    setTapCount((count) => count + 1)
    bump('emojiTaps')
  }

  return (
    <div className="destination-emojis">
      <div className="destination-emojis__row">
        {items.map((item, index) => (
          <button
            key={item.emoji}
            type="button"
            className={`destination-emojis__button${active === index ? ' is-active' : ''}`}
            style={{ '--i': index }}
            onClick={(event) => handleTap(event, index)}
            aria-label={item.text}
            aria-pressed={active === index}
          >
            <span
              className="destination-emojis__emoji"
              key={active === index ? tapCount : 'idle'}
            >
              {item.emoji}
            </span>
          </button>
        ))}
      </div>
      <p className="destination-emojis__fact" aria-live="polite">
        {active === null ? (
          <span className="text-muted">Tocá un emoji para descubrir algo de {city} 👆</span>
        ) : (
          <span className="destination-emojis__fact-text" key={tapCount}>
            {items[active].emoji} {items[active].text}
          </span>
        )}
      </p>
    </div>
  )
}

export default DestinationEmojis
