import { useState } from 'react'
import { phraseBooks } from '../data/phrases'
import { bump } from '../game/store'
import './PhraseBook.css'

const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

function speak(text, lang) {
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 0.85
  window.speechSynthesis.speak(utterance)
}

function PhraseBook() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [speakingKey, setSpeakingKey] = useState(null)
  const active = phraseBooks[activeIndex]

  function handleSpeak(item) {
    speak(item.local, active.speechLang)
    bump('phrasesHeard')
    setSpeakingKey(item.es)
    setTimeout(() => setSpeakingKey((key) => (key === item.es ? null : key)), 1200)
  }

  return (
    <div className="phrase-book">
      <div className="phrase-book__tabs" role="tablist">
        {phraseBooks.map((book, index) => (
          <button
            key={book.code}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`phrase-book__tab${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="phrase-book__tab-flag">{book.flag}</span> {book.language}
          </button>
        ))}
      </div>

      <p className="text-muted phrase-book__hint">
        Útil en {active.city} · pronunciación aproximada
        {canSpeak && ' · tocá 🔊 para escucharla'}
      </p>

      <ul className="card phrase-book__list" key={active.code}>
        {active.items.map((item, index) => (
          <li key={item.es} style={{ '--i': index }}>
            <div className="phrase-book__text">
              <span className="text-muted phrase-book__es">{item.es}</span>
              <span className="phrase-book__local">{item.local}</span>
              <span className="text-muted phrase-book__pron">[{item.pron}]</span>
            </div>
            {canSpeak && (
              <button
                type="button"
                className={`phrase-book__speak${speakingKey === item.es ? ' is-speaking' : ''}`}
                onClick={() => handleSpeak(item)}
                aria-label={`Escuchar "${item.local}"`}
              >
                🔊
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PhraseBook
