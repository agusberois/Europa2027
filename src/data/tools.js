import CurrencyConverter from '../components/CurrencyConverter.jsx'
import RouteMap from '../components/RouteMap.jsx'
import PhraseBook from '../components/PhraseBook.jsx'
import WorldClock from '../components/WorldClock.jsx'
import TipCalculator from '../components/TipCalculator.jsx'
import ClothingAdvisor from '../components/ClothingAdvisor.jsx'

// Cada herramienta vive en /herramientas/:slug. Agregar una nueva es sumar
// una entrada acá: la lista de Herramientas y la ruta salen de este array.
export const tools = [
  {
    slug: 'abrigo',
    icon: '🧥',
    label: 'Qué ponerte hoy',
    description: 'Del verano uruguayo a -20° en Laponia',
    Component: ClothingAdvisor,
  },
  {
    slug: 'mapa',
    icon: '🗺️',
    label: 'Mapa de la ruta',
    description: 'Todo el recorrido de un vistazo',
    Component: RouteMap,
  },
  {
    slug: 'conversor',
    icon: '💱',
    label: 'Conversor',
    description: 'Pesos, euros, forints y coronas',
    Component: CurrencyConverter,
  },
  {
    slug: 'frases',
    icon: '💬',
    label: 'Frases básicas',
    description: 'Köszönöm, Kiitos y compañía',
    Component: PhraseBook,
  },
  {
    slug: 'reloj',
    icon: '🕒',
    label: 'Reloj mundial',
    description: '¿Qué hora es en casa?',
    Component: WorldClock,
  },
  {
    slug: 'propinas',
    icon: '🧮',
    label: 'Propinas',
    description: 'Cuánto dejar en cada país',
    Component: TipCalculator,
  },
]
