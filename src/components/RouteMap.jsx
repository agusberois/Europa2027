import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { itinerary } from '../data/itinerary'
import { cityCoordinates } from '../data/coordinates'
import { formatShortDate, getCurrentStop } from '../utils/trip'
import './RouteMap.css'

function buildPopupHtml(city, stops) {
  const { country, flag } = stops[0]
  const visits = stops
    .map(
      (stop) =>
        `<div class="route-map__popup-visit">
          <span>${formatShortDate(stop.startDate)} – ${formatShortDate(stop.endDate)}</span>
          <a href="/destino/${stop.slug}" data-spa-link>Ver plan ›</a>
        </div>`,
    )
    .join('')

  return `
    <strong>${flag} ${city}</strong>
    <div class="route-map__popup-country">${country}</div>
    ${visits}
  `
}

function RouteMap() {
  const containerRef = useRef(null)
  const navigate = useNavigate()

  // Los popups de Leaflet son HTML plano: interceptamos sus links para
  // navegar dentro de la app en vez de recargar la página entera.
  useEffect(() => {
    const container = containerRef.current

    function handleClick(event) {
      const link = event.target.closest('a[data-spa-link]')
      if (!link) return
      event.preventDefault()
      navigate(link.getAttribute('href'))
    }

    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [navigate])

  useEffect(() => {
    const currentCity = getCurrentStop()?.city

    const styles = getComputedStyle(document.documentElement)
    const routeColor = styles.getPropertyValue('--color-primary').trim() || '#2b6cb8'

    const map = L.map(containerRef.current, { scrollWheelZoom: false })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    const routePoints = itinerary
      .map((stop) => cityCoordinates[stop.city])
      .filter(Boolean)
      .map((coord) => [coord.lat, coord.lon])

    L.polyline(routePoints, { color: routeColor, weight: 3, dashArray: '6 8' }).addTo(map)

    const stopsByCity = new Map()
    itinerary.forEach((stop) => {
      if (!stopsByCity.has(stop.city)) stopsByCity.set(stop.city, [])
      stopsByCity.get(stop.city).push(stop)
    })

    stopsByCity.forEach((stops, city) => {
      const coord = cityCoordinates[city]
      if (!coord) return

      const isCurrent = city === currentCity
      const icon = L.divIcon({
        html: `<span class="route-map__marker${isCurrent ? ' route-map__marker--current' : ''}">${stops[0].flag}</span>`,
        className: 'route-map__marker-wrapper',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      })

      L.marker([coord.lat, coord.lon], { icon }).addTo(map).bindPopup(buildPopupHtml(city, stops))
    })

    if (routePoints.length > 0) {
      map.fitBounds(routePoints, { padding: [24, 24] })
    }

    return () => {
      map.remove()
    }
  }, [])

  return <div ref={containerRef} className="route-map" />
}

export default RouteMap
