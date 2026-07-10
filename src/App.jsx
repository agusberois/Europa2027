import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import CityDetail from './pages/CityDetail.jsx'
import Tools from './pages/Tools.jsx'
import CurrencyConverterPage from './pages/CurrencyConverterPage.jsx'
import RouteMapPage from './pages/RouteMapPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/destino/:slug" element={<CityDetail />} />
      <Route path="/herramientas" element={<Tools />} />
      <Route path="/herramientas/conversor" element={<CurrencyConverterPage />} />
      <Route path="/herramientas/mapa" element={<RouteMapPage />} />
    </Routes>
  )
}

export default App
