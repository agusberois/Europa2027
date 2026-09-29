// Emojis interactivos por ciudad: se muestran en cada destino y al tocarlos
// cuentan un dato curioso. Van por ciudad (no por país) para que Madrid y
// Barcelona tengan cada una lo suyo.
export const cityEmojis = {
  Montevideo: [
    { emoji: '🧉', text: 'El mate no se negocia: que no falte en la valija.' },
    { emoji: '🏖️', text: 'Más de 20 km de rambla para despedirse del verano.' },
    { emoji: '🥩', text: 'El último asado antes de un mes entero sin asado.' },
    { emoji: '⚽', text: 'Dos veces campeones del mundo, que no se olvide en Europa.' },
  ],
  Madrid: [
    { emoji: '🍇', text: '12 uvas, una por campanada, en la Puerta del Sol a medianoche.' },
    { emoji: '🍫', text: 'Churros con chocolate en San Ginés, abierta desde 1894.' },
    { emoji: '🐻', text: 'El Oso y el Madroño: el símbolo de Madrid, en la Puerta del Sol.' },
    { emoji: '🎨', text: 'El Prado guarda Las Meninas de Velázquez.' },
    { emoji: '🥪', text: 'Bocadillo de calamares: el clásico madrileño de la Plaza Mayor.' },
    { emoji: '💃', text: 'Tablao flamenco para cerrar la noche. ¡Olé!' },
  ],
  Budapest: [
    { emoji: '♨️', text: 'Baños termales humeando en pleno invierno: Széchenyi y Rudas.' },
    { emoji: '🍲', text: 'Goulash: sopa, no guiso. Y con mucha paprika.' },
    { emoji: '🌶️', text: 'La paprika es orgullo nacional; está en todo.' },
    { emoji: '🌉', text: 'El Puente de las Cadenas une Buda y Pest desde 1849.' },
    { emoji: '🍰', text: 'Kürtőskalács: el "pastel chimenea" que se come caliente.' },
    { emoji: '🍻', text: 'Ruin bars: bares en edificios abandonados, como Szimpla Kert.' },
  ],
  Salzburgo: [
    { emoji: '🎼', text: 'Mozart nació acá, en la Getreidegasse 9.' },
    { emoji: '🎶', text: 'The Sound of Music se filmó en Salzburgo y alrededores.' },
    { emoji: '🍫', text: 'Mozartkugel: el bombón de pistacho y mazapán con cara de Mozart.' },
    { emoji: '🏞️', text: 'Hallstatt: el pueblo de postal a orillas del lago.' },
    { emoji: '🏔️', text: 'Los Alpes de fondo, desde la Fortaleza Hohensalzburg.' },
    { emoji: '🥨', text: 'Brezel recién horneado para el camino.' },
  ],
  Praga: [
    { emoji: '🍺', text: 'Los checos son los que más cerveza toman por persona en el mundo.' },
    { emoji: '🕰️', text: 'El Reloj Astronómico funciona desde 1410. ¡Mirá el show en punto!' },
    { emoji: '🏰', text: 'El Castillo de Praga es el complejo de castillo antiguo más grande del mundo.' },
    { emoji: '🌉', text: 'Tocá la estatua de San Juan Nepomuceno en el Puente de Carlos: da suerte.' },
    { emoji: '🥐', text: 'Trdelník: rico y turístico, aunque de checo tiene poco.' },
    { emoji: '👻', text: 'Ciudad de leyendas: el Golem, alquimistas y fantasmas.' },
  ],
  Rovaniemi: [
    { emoji: '🎅', text: 'Papá Noel vive acá, oficialmente, en el Círculo Polar Ártico.' },
    { emoji: '🦌', text: 'En Laponia hay casi tantos renos como personas.' },
    { emoji: '🌌', text: 'Con cielo despejado y Kp 3+, hay chances de aurora boreal.' },
    { emoji: '🧖', text: 'Finlandia tiene unos 3 millones de saunas. Hay que probar.' },
    { emoji: '⛄', text: 'Snowman World: todo hecho de hielo y nieve, ¡hasta la disco!' },
    { emoji: '🛷', text: 'Trineo de huskies por el bosque nevado.' },
  ],
  Barcelona: [
    { emoji: '⛪', text: 'La Sagrada Familia está en obra desde 1882.' },
    { emoji: '🦎', text: 'El dragón de mosaicos de Gaudí te espera en el Park Güell.' },
    { emoji: '⚽', text: 'Més que un club: el Barça y el Spotify Camp Nou.' },
    { emoji: '🥖', text: 'Pa amb tomàquet: pan con tomate y aceite, simple y perfecto.' },
    { emoji: '🏖️', text: 'Playa en plena ciudad: la Barceloneta.' },
    { emoji: '🌹', text: 'Paseo por La Rambla hasta el mar.' },
  ],
}

export function getCityEmojis(city) {
  return cityEmojis[city] ?? []
}
