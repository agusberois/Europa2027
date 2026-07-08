import { useAuroraStatus } from '../hooks/useAuroraStatus'
import './AuroraStatus.css'

function formatUpdatedAt(timeTag) {
  return new Date(`${timeTag}Z`).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function AuroraStatus() {
  const { loading, error, data } = useAuroraStatus()

  return (
    <div className="card aurora-status">
      <span className="text-muted aurora-status__title">🌌 Estado de auroras (índice Kp)</span>

      {loading && <p className="text-muted aurora-status__message">Cargando…</p>}
      {error && (
        <p className="text-muted aurora-status__message">No se pudo cargar el pronóstico.</p>
      )}

      {data && (
        <>
          <div className="aurora-status__value">
            <span className="aurora-status__kp">Kp {data.kp.toFixed(1)}</span>
            <span className={`badge aurora-status__level aurora-status__level--${data.level}`}>
              {data.label}
            </span>
          </div>
          <p className="text-muted aurora-status__updated">
            Actualizado {formatUpdatedAt(data.time)}
          </p>
        </>
      )}
    </div>
  )
}

export default AuroraStatus
