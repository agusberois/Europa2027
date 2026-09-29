// Álbum de figuritas. Aparecen escondidas en las páginas; las "difíciles"
// (legendarias) salen muy de vez en cuando, como en el álbum del Mundial.
export const RARITY = {
  common: { label: 'Común', weight: 10 },
  rare: { label: 'Rara', weight: 4 },
  legendary: { label: 'Legendaria', weight: 1 },
}

const raw = [
  // De viaje (salen en cualquier página)
  { id: 'avion', emoji: '✈️', name: 'Avión', rarity: 'common' },
  { id: 'valija', emoji: '🧳', name: 'Valija', rarity: 'common' },
  { id: 'mapa', emoji: '🗺️', name: 'Mapa', rarity: 'common' },
  { id: 'camara', emoji: '📸', name: 'Cámara', rarity: 'common' },
  { id: 'bufanda', emoji: '🧣', name: 'Bufanda', rarity: 'common' },
  { id: 'guantes', emoji: '🧤', name: 'Guantes perdidos', rarity: 'rare' },
  { id: 'pasaporte', emoji: '🛂', name: 'Pasaporte', rarity: 'rare' },

  { id: 'mate', emoji: '🧉', name: 'Mate', city: 'Montevideo', rarity: 'common' },
  { id: 'rambla', emoji: '🏖️', name: 'Rambla', city: 'Montevideo', rarity: 'common' },
  { id: 'asado', emoji: '🥩', name: 'Asado', city: 'Montevideo', rarity: 'common' },
  { id: 'chivito', emoji: '🥪', name: 'Chivito', city: 'Montevideo', rarity: 'rare' },

  { id: 'uvas', emoji: '🍇', name: '12 uvas', city: 'Madrid', rarity: 'common' },
  { id: 'oso', emoji: '🐻', name: 'Oso y Madroño', city: 'Madrid', rarity: 'common' },
  { id: 'churros', emoji: '🍫', name: 'Churros con chocolate', city: 'Madrid', rarity: 'common' },
  { id: 'flamenco', emoji: '💃', name: 'Flamenco', city: 'Madrid', rarity: 'common' },
  { id: 'meninas', emoji: '🎨', name: 'Las Meninas', city: 'Madrid', rarity: 'rare' },

  { id: 'termas', emoji: '♨️', name: 'Termas', city: 'Budapest', rarity: 'common' },
  { id: 'goulash', emoji: '🍲', name: 'Goulash', city: 'Budapest', rarity: 'common' },
  { id: 'paprika', emoji: '🌶️', name: 'Paprika', city: 'Budapest', rarity: 'common' },
  { id: 'cadenas', emoji: '🌉', name: 'Puente de las Cadenas', city: 'Budapest', rarity: 'rare' },
  { id: 'corona', emoji: '👑', name: 'Santa Corona húngara', city: 'Budapest', rarity: 'legendary' },

  { id: 'mozart', emoji: '🎼', name: 'Mozart', city: 'Salzburgo', rarity: 'common' },
  { id: 'violin', emoji: '🎻', name: 'Violín', city: 'Salzburgo', rarity: 'common' },
  { id: 'brezel', emoji: '🥨', name: 'Brezel', city: 'Salzburgo', rarity: 'common' },
  { id: 'novicia', emoji: '🎶', name: 'La novicia rebelde', city: 'Salzburgo', rarity: 'common' },
  { id: 'hallstatt', emoji: '🏞️', name: 'Hallstatt', city: 'Salzburgo', rarity: 'rare' },

  { id: 'pilsner', emoji: '🍺', name: 'Pilsner', city: 'Praga', rarity: 'common' },
  { id: 'reloj', emoji: '🕰️', name: 'Reloj Astronómico', city: 'Praga', rarity: 'common' },
  { id: 'castillo', emoji: '🏰', name: 'Castillo de Praga', city: 'Praga', rarity: 'common' },
  { id: 'marionetas', emoji: '🎭', name: 'Marionetas', city: 'Praga', rarity: 'common' },
  { id: 'kafka', emoji: '🪲', name: 'La metamorfosis', city: 'Praga', rarity: 'rare' },

  { id: 'reno', emoji: '🦌', name: 'Reno', city: 'Rovaniemi', rarity: 'common' },
  { id: 'muneco', emoji: '⛄', name: 'Muñeco de nieve', city: 'Rovaniemi', rarity: 'common' },
  { id: 'sauna', emoji: '🧖', name: 'Sauna', city: 'Rovaniemi', rarity: 'common' },
  { id: 'huskies', emoji: '🛷', name: 'Trineo de huskies', city: 'Rovaniemi', rarity: 'rare' },
  { id: 'papa-noel', emoji: '🎅', name: 'Papá Noel en persona', city: 'Rovaniemi', rarity: 'legendary' },
  { id: 'aurora', emoji: '🌌', name: 'Aurora perfecta', city: 'Rovaniemi', rarity: 'legendary' },

  { id: 'sagrada', emoji: '⛪', name: 'Sagrada Familia', city: 'Barcelona', rarity: 'common' },
  { id: 'dragon', emoji: '🦎', name: 'Dragón de Gaudí', city: 'Barcelona', rarity: 'common' },
  { id: 'barca', emoji: '⚽', name: 'Barça', city: 'Barcelona', rarity: 'common' },
  { id: 'pan-tomate', emoji: '🥖', name: 'Pan con tomate', city: 'Barcelona', rarity: 'common' },
  { id: 'sant-jordi', emoji: '🌹', name: 'Sant Jordi', city: 'Barcelona', rarity: 'rare' },
]

export const stickers = raw.map((sticker, index) => ({ ...sticker, number: index + 1 }))

export const stickerById = Object.fromEntries(stickers.map((sticker) => [sticker.id, sticker]))

function weightedPick(pool, weightOf) {
  const total = pool.reduce((sum, item) => sum + weightOf(item), 0)
  let roll = Math.random() * total
  for (const item of pool) {
    roll -= weightOf(item)
    if (roll <= 0) return item
  }
  return pool[pool.length - 1]
}

// En una ciudad, lo más probable es encontrar figuritas de esa ciudad. Las
// que todavía no tenés pesan el triple, para que casi siempre haya algo nuevo.
export function pickSticker({ city, owned }) {
  const local = stickers.filter((sticker) => sticker.city === city)
  const pool = local.length > 0 && Math.random() < 0.6 ? local : stickers
  return weightedPick(pool, (sticker) => RARITY[sticker.rarity].weight * (owned[sticker.id] ? 1 : 3))
}
