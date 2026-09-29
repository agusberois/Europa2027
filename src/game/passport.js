import { itinerary } from '../data/itinerary'

// Una página de pasaporte por ciudad (Madrid se visita 3 veces pero sella una).
export const passportCities = [...new Set(itinerary.map((stop) => stop.city))]

export function passportStop(city) {
  return itinerary.find((stop) => stop.city === city)
}
