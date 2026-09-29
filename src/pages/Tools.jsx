import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import BackLink from '../components/BackLink.jsx'
import './Tools.css'

function Tools() {
  return (
    <div className="container stack">
      <BackLink to="/">Inicio</BackLink>

      <header className="page-header">
        <span className="page-header__icon">🧰</span>
        <div>
          <h1>Herramientas</h1>
          <p className="text-muted">La navaja suiza del viajero</p>
        </div>
      </header>

      <ul className="tools__grid">
        {tools.map((tool, index) => (
          <li key={tool.slug} style={{ '--i': index }}>
            <Link to={`/herramientas/${tool.slug}`} className="card card-link tools__tile">
              <span className="tools__tile-icon">{tool.icon}</span>
              <span className="tools__tile-label">{tool.label}</span>
              <span className="text-muted tools__tile-description">{tool.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tools
