import { Link } from 'react-router-dom'
import TipCalculator from '../components/TipCalculator.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './TipCalculatorPage.css'

function TipCalculatorPage() {
  return (
    <div className="container tip-calculator-page">
      <Snowfall />
      <ChristmasLights />
      <Link to="/herramientas" className="tip-calculator-page__back">
        ‹ Herramientas
      </Link>

      <header>
        <h1>🧮 Calculadora de propinas</h1>
      </header>

      <TipCalculator />
    </div>
  )
}

export default TipCalculatorPage
