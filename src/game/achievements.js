import { stickers, stickerById } from './stickers'
import { passportCities } from './passport'

const ownedCount = (state) => Object.keys(state.stickers).length
const counter = (state, name) => state.counters[name] ?? 0

// Cada logro se evalúa solo después de cualquier cambio en el progreso
// (ver store.js); alcanza con agregar una entrada acá.
export const achievements = [
  { id: 'primera-figurita', icon: '🌟', name: 'Primera figurita', description: 'Encontraste tu primera figurita', check: (s) => ownedCount(s) >= 1 },
  { id: 'coleccionista', icon: '📒', name: 'Coleccionista', description: 'Juntaste 15 figuritas', check: (s) => ownedCount(s) >= 15 },
  { id: 'album-lleno', icon: '🏆', name: '¡Álbum lleno!', description: 'Completaste el álbum entero', check: (s) => ownedCount(s) === stickers.length },
  { id: 'legendaria', icon: '🦄', name: 'Figurita difícil', description: 'Encontraste una legendaria', check: (s) => Object.keys(s.stickers).some((id) => stickerById[id]?.rarity === 'legendary') },
  { id: 'repetida', icon: '🔁', name: 'Tengo, tengo, falta', description: 'Te salió una repetida', check: (s) => counter(s, 'duplicates') >= 1 },
  { id: 'primer-sello', icon: '🛂', name: 'Primer sello', description: 'Estrenaste el pasaporte', check: (s) => Object.keys(s.stamps).length >= 1 },
  { id: 'trotamundos', icon: '🌍', name: 'Trotamundos', description: 'Sellaste todas las ciudades', check: (s) => passportCities.every((city) => s.stamps[city]) },
  { id: 'estuve-aca', icon: '📍', name: 'Estuve acá', description: 'Conseguiste un sello dorado estando en la ciudad', check: (s) => Object.values(s.stamps).some((stamp) => stamp.real) },
  { id: 'poliglota', icon: '🗣️', name: 'Políglota', description: 'Escuchaste 15 frases', check: (s) => counter(s, 'phrasesHeard') >= 15 },
  { id: 'sabelotodo', icon: '🧠', name: 'Sabelotodo', description: 'Acertaste 10 preguntas de trivia', check: (s) => counter(s, 'triviaCorrect') >= 10 },
  { id: 'suertudo', icon: '🍀', name: 'Suertudo', description: 'Rascaste 5 tarjetas', check: (s) => counter(s, 'scratches') >= 5 },
  { id: 'goloso', icon: '🍽️', name: 'Goloso', description: 'Giraste la ruleta de comida 5 veces', check: (s) => counter(s, 'spins') >= 5 },
  { id: 'vidente', icon: '🥠', name: 'Vidente', description: 'Abriste 5 galletas de la fortuna', check: (s) => counter(s, 'fortunes') >= 5 },
  { id: 'amigo-copito', icon: '🐧', name: 'Amigo de Copito', description: 'Saludaste a Copito 5 veces', check: (s) => counter(s, 'mascotTaps') >= 5 },
  { id: 'tormenta', icon: '🌨️', name: 'Tormenta perfecta', description: 'Desataste una tormenta de nieve', check: (s) => counter(s, 'storms') >= 1 },
  { id: 'festejador', icon: '🎉', name: 'Festejador', description: 'Tocaste 30 emojis de destinos', check: (s) => counter(s, 'emojiTaps') >= 30 },
  { id: 'madrugador', icon: '🌅', name: 'Madrugador', description: 'Abriste la app antes de las 7', check: (s) => counter(s, 'earlyBird') >= 1 },
  { id: 'noctambulo', icon: '🦉', name: 'Noctámbulo', description: 'Abriste la app después de medianoche', check: (s) => counter(s, 'nightOwl') >= 1 },
]
