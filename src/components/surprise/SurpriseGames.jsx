import { useEffect, useRef, useState } from 'react'
import { trivia, foods, scratchPrizes, fortunes, wordsFor } from '../../data/surprises'
import { pickRandom } from '../../data/countryFun'
import { bump } from '../../game/store'
import { confetti } from '../../utils/confetti'

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5)
}

// --- 🧠 Trivia ---------------------------------------------------------------
export function TriviaGame({ city }) {
  const [question] = useState(() => {
    const { q, options } = pickRandom(trivia[city] ?? trivia.Montevideo)
    return { q, answer: options[0], options: shuffle(options) }
  })
  const [chosen, setChosen] = useState(null)

  function handleAnswer(event, option) {
    if (chosen) return
    setChosen(option)
    if (option === question.answer) {
      confetti(event.currentTarget, { pieces: ['🧠', '✅', '⭐'], count: 14 })
      bump('triviaCorrect')
    }
  }

  return (
    <div className="trivia">
      <p className="trivia__question">{question.q}</p>
      <div className="trivia__options">
        {question.options.map((option) => {
          let state = ''
          if (chosen && option === question.answer) state = ' is-correct'
          else if (option === chosen) state = ' is-wrong'
          return (
            <button
              key={option}
              type="button"
              className={`trivia__option${state}`}
              onClick={(event) => handleAnswer(event, option)}
              disabled={Boolean(chosen)}
            >
              {option}
            </button>
          )
        })}
      </div>
      {chosen && (
        <p className="surprise__result">
          {chosen === question.answer ? '¡Correcto! 🎉' : `Casi… era «${question.answer}» 😅`}
        </p>
      )}
    </div>
  )
}

// --- 🪙 Rascá y ganá --------------------------------------------------------
const SCRATCH_RADIUS = 20
const REVEAL_AT = 0.45

export function ScratchGame() {
  const [prize] = useState(() => pickRandom(scratchPrizes))
  const [revealed, setRevealed] = useState(false)
  const canvasRef = useRef(null)
  const movesRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ratio = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    const ctx = canvas.getContext('2d')
    ctx.scale(ratio, ratio)

    const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    gradient.addColorStop(0, '#b8c4cf')
    gradient.addColorStop(0.5, '#e6ecf1')
    gradient.addColorStop(1, '#9fadba')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    ctx.fillStyle = '#5b6b7c'
    ctx.font = '600 15px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🪙 Rascá acá con el dedo 🪙', canvas.offsetWidth / 2, canvas.offsetHeight / 2 + 5)
  }, [])

  function clearedRatio(ctx, canvas) {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 16) {
      total++
      if (data[i] === 0) clear++
    }
    return clear / total
  }

  function scratch(event) {
    if (revealed || (event.pointerType === 'mouse' && event.buttons !== 1)) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(event.clientX - rect.left, event.clientY - rect.top, SCRATCH_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    movesRef.current++
    if (movesRef.current % 6 === 0 && clearedRatio(ctx, canvas) > REVEAL_AT) {
      setRevealed(true)
      bump('scratches')
      confetti(canvas, { pieces: ['🎁', '🪙', '✨', '🎉'], count: 20 })
    }
  }

  return (
    <div className="scratch">
      <div className="scratch__prize">{prize}</div>
      <canvas
        ref={canvasRef}
        className={`scratch__cover${revealed ? ' is-revealed' : ''}`}
        onPointerDown={scratch}
        onPointerMove={scratch}
        aria-label="Tarjeta para rascar"
      />
      {revealed && <p className="surprise__result">¡Premio! Mostrale esto a tu compañero de viaje 😄</p>}
    </div>
  )
}

// --- 🎡 Ruleta de comida ----------------------------------------------------
const WHEEL_COLORS = ['#2b6cb8', '#c9702f', '#2f9e63', '#8a4fd6', '#d1483f', '#d9a441']

export function FoodWheelGame({ city }) {
  const options = foods[city] ?? foods.Madrid
  const segment = 360 / options.length
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const wheelRef = useRef(null)

  function spin() {
    if (spinning) return
    setResult(null)
    setSpinning(true)
    setRotation((current) => current + 360 * 5 + Math.random() * 360)
  }

  function handleSpinEnd() {
    // El puntero está arriba: qué porción del disco quedó debajo.
    const pointerAngle = (360 - (rotation % 360)) % 360
    const food = options[Math.floor(pointerAngle / segment)]
    setSpinning(false)
    setResult(food)
    bump('spins')
    confetti(wheelRef.current, { pieces: ['🍽️', '😋', '🤤'], count: 10, spread: 100 })
  }

  const gradient = options
    .map((_, i) => `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * segment}deg ${(i + 1) * segment}deg`)
    .join(', ')

  return (
    <div className="wheel">
      <div className="wheel__stage">
        <span className="wheel__pointer" aria-hidden="true">
          ▼
        </span>
        <div
          ref={wheelRef}
          className="wheel__disc"
          style={{ background: `conic-gradient(${gradient})`, transform: `rotate(${rotation}deg)` }}
          onTransitionEnd={handleSpinEnd}
        >
          {options.map((food, i) => (
            <span
              key={food}
              className="wheel__label"
              style={{ transform: `rotate(${i * segment + segment / 2 - 90}deg)` }}
            >
              {food}
            </span>
          ))}
        </div>
      </div>
      <button type="button" className="surprise__action" onClick={spin} disabled={spinning}>
        {spinning ? 'Girando…' : result ? '🎡 Girar de nuevo' : '🎡 ¡Girar!'}
      </button>
      <p className="surprise__result" aria-live="polite">
        {result ? `Hoy toca: ${result} 😋` : '¿No saben qué comer? Que decida la ruleta.'}
      </p>
    </div>
  )
}

// --- 🗣️ Palabra del día -----------------------------------------------------
export function WordGame({ city }) {
  const [word] = useState(() => {
    const book = wordsFor(city) ?? wordsFor(pickRandom(['Budapest', 'Praga', 'Rovaniemi', 'Salzburgo']))
    return { ...pickRandom(book.items), speechLang: book.speechLang }
  })
  const [speaking, setSpeaking] = useState(false)
  const canSpeak = 'speechSynthesis' in window

  function speak() {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(word.local)
    utterance.lang = word.speechLang
    utterance.rate = 0.85
    utterance.onend = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
    bump('phrasesHeard')
  }

  return (
    <div className="word">
      <span className="word__local">{word.local}</span>
      <span className="text-muted word__pron">[{word.pron}]</span>
      <span className="word__es">= {word.es}</span>
      {canSpeak && (
        <button type="button" className={`surprise__action${speaking ? ' is-speaking' : ''}`} onClick={speak}>
          🔊 Escuchar
        </button>
      )}
    </div>
  )
}

// --- 🥠 Galleta de la fortuna -----------------------------------------------
export function FortuneGame() {
  const [fortune] = useState(() => pickRandom(fortunes))
  const [open, setOpen] = useState(false)

  function crack(event) {
    if (open) return
    setOpen(true)
    bump('fortunes')
    confetti(event.currentTarget, { pieces: ['✨', '🔮', '⭐'], count: 12, spread: 100 })
  }

  return (
    <div className="fortune">
      <button
        type="button"
        className={`fortune__cookie${open ? ' is-open' : ''}`}
        onClick={crack}
        aria-label="Abrir la galleta de la fortuna"
      >
        🥠
      </button>
      <p className={`fortune__text${open ? ' is-open' : ''}`}>
        {open ? `«${fortune}»` : 'Tocá la galleta para abrirla'}
      </p>
    </div>
  )
}
