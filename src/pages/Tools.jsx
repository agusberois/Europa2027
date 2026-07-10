import { Link } from 'react-router-dom'
import Snowfall from '../components/Snowfall.jsx'
import ChristmasLights from '../components/ChristmasLights.jsx'
import './Tools.css'

const tools = [
  { path: '/herramientas/conversor', icon: '💱', label: 'Conversor de moneda' },
  { path: '/herramientas/mapa', icon: '🗺️', label: 'Mapa de la ruta' },
]

function Tools() {
  return (
    <div className="container tools">
      <Snowfall />
      <ChristmasLights />
      <Link to="/" className="tools__back">
        ‹ Inicio
      </Link>

      <header className="tools__header">
        <h1>🧰 Herramientas</h1>
      </header>

      <ul className="tools__list">
        {tools.map((tool) => (
          <li key={tool.path}>
            <Link to={tool.path} className="card tools__item">
              <span className="tools__item-icon">{tool.icon}</span>
              <span className="tools__item-label">{tool.label}</span>
              <span className="tools__item-arrow" aria-hidden="true">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tools
