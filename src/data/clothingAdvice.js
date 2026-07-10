// Recomendaciones de abrigo según la temperatura actual, pensadas para el
// rango de este viaje (de +25°C en Montevideo a -20°C en Rovaniemi).
export const clothingBands = [
  {
    code: 'extreme',
    max: -15,
    label: 'Frío extremo',
    advice:
      'Térmica + polar + campera de pluma, gorro, bufanda que tape la cara y guantes gruesos. Botas impermeables. Minimizá la piel expuesta.',
  },
  {
    code: 'very-cold',
    max: -5,
    label: 'Mucho frío',
    advice: 'Térmica, sweater y campera de invierno bien abrigada, gorro y guantes.',
  },
  {
    code: 'cold',
    max: 5,
    label: 'Frío',
    advice: 'Campera abrigada, bufanda y gorro liviano.',
  },
  {
    code: 'cool',
    max: 12,
    label: 'Fresco',
    advice: 'Campera media o piloto, con alguna capa liviana debajo.',
  },
  {
    code: 'mild',
    max: 18,
    label: 'Templado',
    advice: 'Buzo o campera liviana alcanza.',
  },
  {
    code: 'pleasant',
    max: 25,
    label: 'Agradable',
    advice: 'Remera y poco abrigo, quizás una camperita liviana para la noche.',
  },
  {
    code: 'hot',
    max: Infinity,
    label: 'Calor',
    advice: 'Ropa liviana, protección solar y agua a mano.',
  },
]

export function getClothingAdvice(tempC) {
  return clothingBands.find((band) => tempC <= band.max) ?? clothingBands[clothingBands.length - 1]
}

const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86])
const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82])

export function precipitationHint(code) {
  if (SNOW_CODES.has(code)) return '❄️ Puede nevar: calzado con buena suela, antideslizante.'
  if (RAIN_CODES.has(code)) return '🌧️ Puede llover: llevá paraguas o campera impermeable.'
  return null
}
