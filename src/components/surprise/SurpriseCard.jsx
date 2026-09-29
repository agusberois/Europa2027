import { useState } from 'react'
import { itinerary } from '../../data/itinerary'
import { trivia } from '../../data/surprises'
import { pickRandom } from '../../data/countryFun'
import { TriviaGame, ScratchGame, FoodWheelGame, WordGame, FortuneGame } from './SurpriseGames.jsx'
import './SurpriseCard.css'

const games = [
  { id: 'trivia', icon: '🧠', title: (city) => `Trivia: ${city}`, showsCity: true, Component: TriviaGame },
  { id: 'scratch', icon: '🪙', title: () => 'Rascá y ganá', Component: ScratchGame },
  {
    id: 'wheel',
    icon: '🎡',
    title: (city) => `¿Qué comemos en ${city}?`,
    showsCity: true,
    Component: FoodWheelGame,
  },
  { id: 'word', icon: '🗣️', title: () => 'Palabra del día', Component: WordGame },
  { id: 'fortune', icon: '🥠', title: () => 'Galleta de la fortuna', Component: FortuneGame },
]

const cities = Object.keys(trivia)

// Recordamos el último juego (a nivel módulo) para que dos páginas seguidas
// no muestren el mismo.
let lastGameId = null

function pickGame(exceptId) {
  const game = pickRandom(games.filter((entry) => entry.id !== exceptId && entry.id !== lastGameId))
  lastGameId = game.id
  return game
}

function SurpriseCard({ city: fixedCity }) {
  const [round, setRound] = useState(() => ({
    game: pickGame(),
    city: fixedCity ?? pickRandom(cities),
    key: 0,
  }))
  const { game, city } = round
  const flag = itinerary.find((stop) => stop.city === city)?.flag
  const { Component } = game

  function reroll() {
    setRound((current) => ({
      game: pickGame(current.game.id),
      city: fixedCity ?? pickRandom(cities),
      key: current.key + 1,
    }))
  }

  return (
    <section className="card surprise">
      <div className="surprise__header">
        <span className="surprise__badge">🎁 Sorpresa</span>
        <button type="button" className="surprise__reroll" onClick={reroll} aria-label="Otra sorpresa">
          🎲 Otra
        </button>
      </div>
      <h3 className="surprise__title">
        <span aria-hidden="true">{game.icon}</span> {game.title(city)} {game.showsCity && flag}
      </h3>
      <div className="surprise__body" key={round.key}>
        <Component city={city} />
      </div>
    </section>
  )
}

export default SurpriseCard
