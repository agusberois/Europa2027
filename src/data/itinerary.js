const stops = [
  { city: 'Montevideo', country: 'Uruguay', countryCode: 'UY', startDate: '2026-12-28', endDate: '2026-12-28', isHome: true },
  {
    city: 'Madrid',
    country: 'España',
    countryCode: 'ES',
    startDate: '2026-12-29',
    endDate: '2027-01-04',
    transport: { emoji: '✈️', mode: 'Avión', detail: 'Escala en São Paulo' },
  },
  {
    city: 'Budapest',
    country: 'Hungría',
    countryCode: 'HU',
    startDate: '2027-01-04',
    endDate: '2027-01-07',
    transport: { emoji: '✈️', mode: 'Avión' },
  },
  {
    city: 'Salzburgo',
    country: 'Austria',
    countryCode: 'AT',
    startDate: '2027-01-08',
    endDate: '2027-01-10',
    transport: { emoji: '🚌', mode: 'Flixbus' },
  },
  {
    city: 'Praga',
    country: 'República Checa',
    countryCode: 'CZ',
    startDate: '2027-01-10',
    endDate: '2027-01-14',
    transport: { emoji: '🚌', mode: 'Flixbus' },
  },
  {
    city: 'Rovaniemi',
    country: 'Finlandia',
    countryCode: 'FI',
    startDate: '2027-01-14',
    endDate: '2027-01-21',
    transport: { emoji: '✈️', mode: 'Avión', detail: 'Escala en Varsovia' },
  },
  {
    city: 'Madrid',
    country: 'España',
    countryCode: 'ES',
    startDate: '2027-01-21',
    endDate: '2027-01-22',
    transport: { emoji: '✈️', mode: 'Avión', detail: 'Escala en Helsinki' },
  },
  {
    city: 'Barcelona',
    country: 'España',
    countryCode: 'ES',
    startDate: '2027-01-22',
    endDate: '2027-01-25',
    transport: { emoji: '🚄', mode: 'Tren' },
  },
  {
    city: 'Madrid',
    country: 'España',
    countryCode: 'ES',
    startDate: '2027-01-25',
    endDate: '2027-01-28',
    transport: { emoji: '🚄', mode: 'Tren' },
  },
  {
    city: 'Montevideo',
    country: 'Uruguay',
    countryCode: 'UY',
    startDate: '2027-01-28',
    endDate: '2027-01-28',
    isHome: true,
    transport: { emoji: '✈️', mode: 'Avión', detail: 'Escala en São Paulo' },
  },
]

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
}

function flagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

function daysBetween(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((new Date(b) - new Date(a)) / msPerDay)
}

const slugCount = {}

// slug, flag y noches se derivan de los datos de arriba para no duplicar
// información a mano (ej. Madrid aparece 3 veces con fechas distintas).
export const itinerary = stops.map((stop, index) => {
  const base = slugify(stop.city)
  slugCount[base] = (slugCount[base] || 0) + 1
  const slug = slugCount[base] > 1 ? `${base}-${slugCount[base]}` : base

  return {
    id: index + 1,
    slug,
    flag: flagEmoji(stop.countryCode),
    nights: daysBetween(stop.startDate, stop.endDate),
    ...stop,
  }
})

export const TRIP_START = itinerary[0].startDate
export const TRIP_END = itinerary[itinerary.length - 1].endDate
