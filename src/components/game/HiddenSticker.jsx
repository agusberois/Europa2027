import { useState } from 'react'
import { pickSticker, stickers, RARITY } from '../../game/stickers'
import { collectSticker, getGame } from '../../game/store'
import { showToast } from '../../game/toast'
import { confetti } from '../../utils/confetti'
import './HiddenSticker.css'

const APPEAR_CHANCE = 0.75

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

// Una figurita asomando desde el borde, en un lugar distinto cada vez que se
// entra a una página (Layout la remonta con key={pathname}).
function HiddenSticker({ city }) {
  const [spot] = useState(() => {
    if (Math.random() > APPEAR_CHANCE) return null
    return {
      sticker: pickSticker({ city, owned: getGame().stickers }),
      top: randomBetween(18, 85),
      side: Math.random() < 0.5 ? 'left' : 'right',
      delay: randomBetween(1, 4),
    }
  })
  const [found, setFound] = useState(false)

  if (!spot || found) return null

  const { sticker } = spot

  function handleFind(event) {
    const pieces = [sticker.emoji, '✨', '⭐']
    confetti(event.currentTarget, { pieces, count: sticker.rarity === 'legendary' ? 36 : 16 })
    const previous = collectSticker(sticker.id)
    const owned = Object.keys(getGame().stickers).length

    showToast(
      previous === 0
        ? {
            icon: sticker.emoji,
            title: `¡Nueva figurita! #${sticker.number} ${sticker.name}`,
            text: `${RARITY[sticker.rarity].label} · llevás ${owned}/${stickers.length}`,
          }
        : {
            icon: sticker.emoji,
            title: `Repetida: ${sticker.name}`,
            text: `Ya la tenías ${previous === 1 ? 'una vez' : `${previous} veces`} 😅`,
          },
    )
    setFound(true)
  }

  return (
    <button
      type="button"
      className={`hidden-sticker hidden-sticker--${spot.side} hidden-sticker--${sticker.rarity}`}
      style={{ top: `${spot.top}%`, animationDelay: `${spot.delay}s` }}
      onClick={handleFind}
      aria-label="¡Una figurita escondida! Tocala para guardarla"
    >
      {sticker.emoji}
    </button>
  )
}

export default HiddenSticker
