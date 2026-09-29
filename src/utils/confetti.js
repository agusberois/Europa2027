import { pickRandom } from '../data/countryFun'
import './confetti.css'

const DEFAULT_PIECES = ['🎉', '✨', '❄️', '⭐', '🥳']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function originPoint(origin) {
  if (origin instanceof Element) {
    const rect = origin.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }
  return origin
}

// Explosión de emojis desde un elemento (o un punto {x, y}). Es DOM puro para
// poder dispararla desde cualquier handler sin estado de React; se limpia sola.
export function confetti(origin, { pieces = DEFAULT_PIECES, count = 18, spread = 140 } = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { x, y } = originPoint(origin)
  const layer = document.createElement('div')
  layer.className = 'confetti'
  layer.setAttribute('aria-hidden', 'true')

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span')
    const angle = randomBetween(0, Math.PI * 2)
    const distance = spread * randomBetween(0.4, 1)

    piece.className = 'confetti__piece'
    piece.textContent = i < pieces.length ? pieces[i] : pickRandom(pieces)
    piece.style.left = `${x}px`
    piece.style.top = `${y}px`
    piece.style.fontSize = `${randomBetween(1, 1.6)}rem`
    piece.style.animationDelay = `${randomBetween(0, 80)}ms`
    piece.style.setProperty('--dx', `${Math.cos(angle) * distance}px`)
    piece.style.setProperty('--dy', `${Math.sin(angle) * distance - 40}px`)
    piece.style.setProperty('--rot', `${randomBetween(-270, 270)}deg`)
    layer.appendChild(piece)
  }

  document.body.appendChild(layer)
  setTimeout(() => layer.remove(), 1500)
}
