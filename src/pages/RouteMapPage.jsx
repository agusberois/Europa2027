import { Link } from 'react-router-dom'
import RouteMap from '../components/RouteMap.jsx'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './RouteMapPage.css'

function RouteMapPage() {
  return (
    <div className="container route-map-page">
      <Snowfall />
      <ChristmasLights />
      <Link to="/herramientas" className="route-map-page__back">
        ‹ Herramientas
      </Link>

      <header>
        <h1>🗺️ Mapa de la ruta</h1>
      </header>

      <RouteMap />
    </div>
  )
}

export default RouteMapPage
