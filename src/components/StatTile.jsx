import './StatTile.css'

function StatTile({ icon, label, value, hint }) {
  return (
    <div className="card stat-tile">
      {icon && (
        <span className="stat-tile__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="stat-tile__value">{value}</span>
      <span className="stat-tile__label text-muted">{label}</span>
      {hint && <span className="stat-tile__hint">{hint}</span>}
    </div>
  )
}

export default StatTile
