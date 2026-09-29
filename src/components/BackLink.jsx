import { Link } from 'react-router-dom'

function BackLink({ to, children }) {
  return (
    <Link to={to} className="back-link">
      <span aria-hidden="true">‹</span> {children}
    </Link>
  )
}

export default BackLink
