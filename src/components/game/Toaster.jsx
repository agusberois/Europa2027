import { useEffect, useState } from 'react'
import { onToast } from '../../game/toast'
import './Toaster.css'

const TOAST_DURATION = 3800

function Toaster() {
  const [toasts, setToasts] = useState([])

  useEffect(
    () =>
      onToast((toast) => {
        setToasts((list) => [...list, toast])
        setTimeout(() => setToasts((list) => list.filter((t) => t.id !== toast.id)), TOAST_DURATION)
      }),
    [],
  )

  return (
    <div className="toaster" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toaster__toast" key={toast.id}>
          <span className="toaster__icon">{toast.icon}</span>
          <div>
            <strong className="toaster__title">{toast.title}</strong>
            {toast.text && <span className="toaster__text">{toast.text}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toaster
