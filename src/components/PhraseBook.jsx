import { useState } from 'react'
import { phraseBooks } from '../data/phrases'
import './PhraseBook.css'

function PhraseBook() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = phraseBooks[activeIndex]

  return (
    <div className="phrase-book">
      <div className="phrase-book__tabs">
        {phraseBooks.map((book, index) => (
          <button
            key={book.code}
            type="button"
            className={`phrase-book__tab${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {book.flag} {book.language}
          </button>
        ))}
      </div>

      <p className="text-muted phrase-book__hint">
        Útil en {active.city} · pronunciación aproximada
      </p>

      <ul className="card phrase-book__list">
        {active.items.map((item) => (
          <li key={item.es}>
            <span className="text-muted phrase-book__es">{item.es}</span>
            <span className="phrase-book__local">{item.local}</span>
            <span className="text-muted phrase-book__pron">[{item.pron}]</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PhraseBook
