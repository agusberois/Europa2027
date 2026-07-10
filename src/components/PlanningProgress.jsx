import './PlanningProgress.css'

function PlanningProgress({ percent, startLabel, endLabel, elapsedDays, totalDays }) {
  const remainingDays = totalDays - elapsedDays

  return (
    <div className="planning-progress">
      <div className="planning-progress__track">
        <div className="planning-progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="planning-progress__labels">
        <span className="text-muted">{startLabel}</span>
        <span className="planning-progress__percent">{percent}%</span>
        <span className="text-muted">{endLabel}</span>
      </div>
      <p className="text-muted planning-progress__days">
        {elapsedDays} {elapsedDays === 1 ? 'día pasado' : 'días pasados'} · {remainingDays}{' '}
        {remainingDays === 1 ? 'día restante' : 'días restantes'}
      </p>
    </div>
  )
}

export default PlanningProgress
