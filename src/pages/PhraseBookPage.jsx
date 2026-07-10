import { Link } from 'react-router-dom'
import PhraseBook from '../components/PhraseBook.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './PhraseBookPage.css'

function PhraseBookPage() {
  return (
    <div className="container phrase-book-page">
      <Snowfall />
      <ChristmasLights />
      <Link to="/herramientas" className="phrase-book-page__back">
        ‹ Herramientas
      </Link>

      <header>
        <h1>💬 Frases básicas</h1>
      </header>

      <PhraseBook />
    </div>
  )
}

export default PhraseBookPage
