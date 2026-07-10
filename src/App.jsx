import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import CityDetail from './pages/CityDetail.jsx'
import Tools from './pages/Tools.jsx'
import CurrencyConverterPage from './pages/CurrencyConverterPage.jsx'
import RouteMapPage from './pages/RouteMapPage.jsx'
import PhraseBookPage from './pages/PhraseBookPage.jsx'
import WorldClockPage from './pages/WorldClockPage.jsx'
import TipCalculatorPage from './pages/TipCalculatorPage.jsx'
import ClothingAdvisorPage from './pages/ClothingAdvisorPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/destino/:slug" element={<CityDetail />} />
      <Route path="/herramientas" element={<Tools />} />
      <Route path="/herramientas/conversor" element={<CurrencyConverterPage />} />
      <Route path="/herramientas/mapa" element={<RouteMapPage />} />
      <Route path="/herramientas/frases" element={<PhraseBookPage />} />
      <Route path="/herramientas/reloj" element={<WorldClockPage />} />
      <Route path="/herramientas/propinas" element={<TipCalculatorPage />} />
      <Route path="/herramientas/abrigo" element={<ClothingAdvisorPage />} />
    </Routes>
  )
}

export default App
