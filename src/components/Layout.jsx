import { useEffect } from 'react'
import { Outlet, matchPath, useLocation } from 'react-router-dom'
import { itinerary } from '../data/itinerary'
import { bump } from '../game/store'
import { listenForShake } from '../game/snowstorm'
import Snowfall from './Snowfall.jsx'
import ChristmasLights from './ChristmasLights.jsx'
import HiddenSticker from './game/HiddenSticker.jsx'
import Mascot from './game/Mascot.jsx'
import Toaster from './game/Toaster.jsx'

// Va antes del <Outlet> a propósito: los efectos de hermanos corren en orden,
// así una página puede hacer su propio scroll (ej. al día de hoy) después.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function cityFromPath(pathname) {
  const match = matchPath('/destino/:slug', pathname)
  return match ? itinerary.find((stop) => stop.slug === match.params.slug)?.city : undefined
}

// Nieve y luces viven acá (y no en cada página) para que no se re-sorteen ni
// "salten" al navegar. Las sorpresas sí se re-sortean en cada página: por eso
// van dentro del bloque con key={pathname}.
function Layout() {
  const { pathname } = useLocation()
  const city = cityFromPath(pathname)
  const isAlbum = pathname === '/album'

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 4 && hour < 7) bump('earlyBird')
    else if (hour < 4) bump('nightOwl')
    return listenForShake()
  }, [])

  return (
    <>
      <ScrollToTop />
      <Snowfall />
      <Toaster />
      <div className="page-chrome">
        <ChristmasLights />
      </div>
      <div className="page" key={pathname}>
        <Outlet />
        {!isAlbum && <HiddenSticker city={city} />}
      </div>
      {/* fuera de .page: su animación con transform rompería el position: fixed */}
      <Mascot key={pathname} city={city} />
    </>
  )
}

export default Layout
