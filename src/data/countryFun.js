// Emojis temáticos por país, para los easter eggs de confetti al tocar una
// bandera.
export const countryEmojis = {
  UY: ['🧉', '🏖️', '🏠'],
  ES: ['🥘', '💃', '🍷', '☀️'],
  HU: ['♨️', '🌶️', '🏰', '🌉'],
  AT: ['🎻', '🏔️', '🥨', '🎼'],
  CZ: ['🍺', '🏰', '🌉', '🕰️'],
  FI: ['🎅', '🦌', '🌌', '⛄'],
}

// Frases que rotan en la cuenta regresiva mientras esperamos el viaje.
export const waitingTaglines = [
  'Practicando «Köszönöm» frente al espejo 🇭🇺',
  'Buscando la bufanda más abrigada 🧣',
  'Haciendo lugar en la valija 🧳',
  'Soñando con auroras boreales 🌌',
  'Entrenando para las uvas de Año Nuevo 🍇',
  'Escribiéndole la carta a Papá Noel 🎅',
  'Calculando cuántas cervezas checas entran en 4 días 🍺',
  'Googleando «cómo no congelarse a -20°» 🥶',
  'Preparando el termo para el mate europeo 🧉',
]

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
