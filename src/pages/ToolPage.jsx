import { useParams } from 'react-router-dom'
import { tools } from '../data/tools'
import BackLink from '../components/BackLink.jsx'

function ToolPage() {
  const { slug } = useParams()
  const tool = tools.find((entry) => entry.slug === slug)

  if (!tool) {
    return (
      <div className="container stack">
        <BackLink to="/herramientas">Herramientas</BackLink>
        <div className="card empty-state">
          <span className="empty-state__icon">🧭</span>
          <p>Esa herramienta se perdió en el equipaje.</p>
        </div>
      </div>
    )
  }

  const { Component } = tool

  return (
    <div className="container stack">
      <BackLink to="/herramientas">Herramientas</BackLink>
      <header className="page-header">
        <span className="page-header__icon">{tool.icon}</span>
        <div>
          <h1>{tool.label}</h1>
          <p className="text-muted">{tool.description}</p>
        </div>
      </header>
      <Component />
    </div>
  )
}

export default ToolPage
