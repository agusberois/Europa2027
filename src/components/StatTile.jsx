import './StatTile.css'

function StatTile({ label, value }) {
  return (
    <div className="card stat-tile">
      <span className="stat-tile__value">{value}</span>
      <span className="stat-tile__label text-muted">{label}</span>
    </div>
  )
}

export default StatTile
