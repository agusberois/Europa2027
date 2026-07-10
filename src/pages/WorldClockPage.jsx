import { Link } from 'react-router-dom'
import WorldClock from '../components/WorldClock.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './WorldClockPage.css'

function WorldClockPage() {
  return (
    <div className="container world-clock-page">
      <Snowfall />
      <ChristmasLights />
      <Link to="/herramientas" className="world-clock-page__back">
        ‹ Herramientas
      </Link>

      <header>
        <h1>🕒 Reloj mundial</h1>
      </header>

      <WorldClock />
    </div>
  )
}

export default WorldClockPage
