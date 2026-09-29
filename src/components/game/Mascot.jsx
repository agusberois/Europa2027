import { useEffect, useState } from 'react'
import { bump } from '../../game/store'
import { pickRandom } from '../../data/countryFun'
import './Mascot.css'

const APPEAR_CHANCE = 0.35
const BUBBLE_DURATION = 2200

// Copito, el pingüino viajero: se "disfraza" con algo de cada ciudad.
const outfits = {
  Montevideo: { item: '🧉', lines: ['¿Un mate antes de salir?', '¡Chau Rambla, hola Europa!'] },
  Madrid: { item: '🍇', lines: ['¡Qué guay!', '¿Tenés las 12 uvas listas?', '¡Olé!'] },
  Budapest: { item: '🌶️', lines: ['Egészségedre! 🍻', '¿Vamos a las termas?', 'Köszönöm!'] },
  Salzburgo: { item: '🎻', lines: ['Servus!', 'Do-re-mi-fa-sol… 🎶', '¡Hallstatt es de postal!'] },
  Praga: { item: '🍺', lines: ['Na zdraví!', '¿Viste el reloj en punto?', 'Děkuji!'] },
  Rovaniemi: { item: '🎁', lines: ['¡Acá me siento en casa! ❄️', '¿Viste alguna aurora? 🌌', 'Kiitos!'] },
  Barcelona: { item: '⚽', lines: ['Bon dia!', '¿Vamos a la Barceloneta?', 'Visca el Barça!'] },
}

const defaultOutfit = {
  item: '🧳',
  lines: ['¡Hola! Soy Copito 🐧', '¡Me encanta el frío!', '¿Ya encontraste todas las figuritas?', '¡Falta poco!'],
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function Mascot({ city }) {
  const outfit = outfits[city] ?? defaultOutfit
  const [plan] = useState(() =>
    Math.random() < APPEAR_CHANCE
      ? { delay: randomBetween(3, 10), fromRight: Math.random() < 0.5 }
      : null,
  )
  const [visible, setVisible] = useState(false)
  const [bubble, setBubble] = useState(null)

  useEffect(() => {
    if (!plan) return undefined
    const timeout = setTimeout(() => setVisible(true), plan.delay * 1000)
    return () => clearTimeout(timeout)
  }, [plan])

  useEffect(() => {
    if (!bubble) return undefined
    const timeout = setTimeout(() => setBubble(null), BUBBLE_DURATION)
    return () => clearTimeout(timeout)
  }, [bubble])

  if (!plan || !visible) return null

  function handleTap() {
    setBubble(pickRandom(outfit.lines.filter((line) => line !== bubble)))
    bump('mascotTaps')
  }

  return (
    <div
      className={`mascot${plan.fromRight ? ' mascot--from-right' : ''}${bubble ? ' is-talking' : ''}`}
      onAnimationEnd={(event) => {
        if (event.animationName === 'mascot-walk') setVisible(false)
      }}
    >
      {bubble && <span className="mascot__bubble">{bubble}</span>}
      <button type="button" className="mascot__body" onClick={handleTap} aria-label="Saludar a Copito">
        <span className="mascot__penguin">🐧</span>
        <span className="mascot__item">{outfit.item}</span>
      </button>
    </div>
  )
}

export default Mascot
