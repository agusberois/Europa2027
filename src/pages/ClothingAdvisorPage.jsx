import { Link } from 'react-router-dom'
import ClothingAdvisor from '../components/ClothingAdvisor.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './ClothingAdvisorPage.css'

function ClothingAdvisorPage() {
  return (
    <div className="container clothing-advisor-page">
      <Snowfall />
      <ChristmasLights />
      <Link to="/herramientas" className="clothing-advisor-page__back">
        ‹ Herramientas
      </Link>

      <header>
        <h1>🧥 Qué ponerte hoy</h1>
      </header>

      <ClothingAdvisor />
    </div>
  )
}

export default ClothingAdvisorPage
