import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Snowfall from './Snowfall.jsx'
import ChristmasLights from './ChristmasLights.jsx'

// Va antes del <Outlet> a propósito: los efectos de hermanos corren en orden,
// así una página puede hacer su propio scroll (ej. al día de hoy) después.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Nieve y luces viven acá (y no en cada página) para que no se re-sorteen ni
// "salten" al navegar.
function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />
      <Snowfall />
      <div className="page-chrome">
        <ChristmasLights />
      </div>
      <div className="page" key={pathname}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
