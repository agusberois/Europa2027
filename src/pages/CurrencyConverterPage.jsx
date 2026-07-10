import { Link } from 'react-router-dom'
import CurrencyConverter from '../components/CurrencyConverter.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './CurrencyConverterPage.css'

function CurrencyConverterPage() {
  return (
    <div className="container currency-converter-page">
      <Snowfall />
      <ChristmasLights />
      <Link to="/herramientas" className="currency-converter-page__back">
        ‹ Herramientas
      </Link>

      <header>
        <h1>💱 Conversor de moneda</h1>
      </header>

      <CurrencyConverter />
    </div>
  )
}

export default CurrencyConverterPage
