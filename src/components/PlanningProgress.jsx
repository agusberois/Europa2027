import './PlanningProgress.css'

function PlanningProgress({ percent, startLabel, endLabel, elapsedDays, totalDays }) {
  const remainingDays = totalDays - elapsedDays

  return (
    <div className="planning-progress">
      <p className="planning-progress__title">Organizando el viaje</p>
      <div className="planning-progress__runway">
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Avance de la organización del viaje"
        >
          <div className="progress__fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="planning-progress__plane" style={{ left: `${percent}%` }} aria-hidden="true">
          ✈️
        </span>
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
