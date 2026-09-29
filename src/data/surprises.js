import { phraseBooks } from './phrases'

// Preguntas de trivia por ciudad. La primera opción es la correcta (se
// mezclan al mostrarlas).
export const trivia = {
  Montevideo: [
    { q: '¿Cuántos países visitamos, sin contar Uruguay?', options: ['5', '4', '6'] },
    { q: '¿Cuál es la ciudad más al norte del viaje?', options: ['Rovaniemi', 'Praga', 'Salzburgo'] },
    { q: '¿Qué moneda se usa en Hungría?', options: ['Forint', 'Euro', 'Corona'] },
    { q: '¿Y en República Checa?', options: ['Corona checa', 'Euro', 'Zloty'] },
  ],
  Madrid: [
    { q: '¿Qué se come en la Puerta del Sol con las campanadas del 31?', options: ['12 uvas', '12 aceitunas', '12 churros'] },
    { q: '¿Qué animal acompaña al madroño en el símbolo de Madrid?', options: ['Un oso', 'Un toro', 'Un águila'] },
    { q: '¿Quién pintó Las Meninas?', options: ['Velázquez', 'Goya', 'El Greco'] },
  ],
  Budapest: [
    { q: 'Budapest nació en 1873 de la unión de…', options: ['Buda, Pest y Óbuda', 'Buda y Viena', 'Pest y Bratislava'] },
    { q: '¿Qué río cruza Budapest?', options: ['Danubio', 'Rin', 'Moldava'] },
    { q: '¿Qué especia es el orgullo húngaro?', options: ['Paprika', 'Azafrán', 'Canela'] },
  ],
  Salzburgo: [
    { q: '¿Qué compositor nació en Salzburgo?', options: ['Mozart', 'Beethoven', 'Vivaldi'] },
    { q: '¿Qué película se filmó en Salzburgo?', options: ['La novicia rebelde', 'Amadeus', 'Frozen'] },
    { q: '"Salzburg" significa…', options: ['Castillo de la sal', 'Ciudad del río', 'Montaña blanca'] },
  ],
  Praga: [
    { q: '¿Qué río cruza Praga?', options: ['Moldava', 'Danubio', 'Sena'] },
    { q: '¿Desde qué siglo funciona el Reloj Astronómico?', options: ['Siglo XV', 'Siglo XVIII', 'Siglo XX'] },
    { q: '¿Qué escritor nació en Praga?', options: ['Franz Kafka', 'Tolstói', 'Víctor Hugo'] },
  ],
  Rovaniemi: [
    { q: '¿Qué línea imaginaria pasa por Rovaniemi?', options: ['Círculo Polar Ártico', 'Trópico de Cáncer', 'Meridiano de Greenwich'] },
    { q: '¿En qué región queda Rovaniemi?', options: ['Laponia', 'Siberia', 'Groenlandia'] },
    { q: '¿Qué índice se mira para saber si habrá auroras?', options: ['Kp', 'UV', 'pH'] },
  ],
  Barcelona: [
    { q: '¿Qué arquitecto diseñó la Sagrada Familia?', options: ['Gaudí', 'Calatrava', 'Niemeyer'] },
    { q: '¿Qué idioma se habla en Barcelona además del castellano?', options: ['Catalán', 'Gallego', 'Euskera'] },
    { q: '¿Cuál es el barrio playero de Barcelona?', options: ['La Barceloneta', 'Gràcia', 'El Born'] },
  ],
}

export const foods = {
  Montevideo: ['Chivito', 'Asado', 'Milanesa', 'Tortas fritas', 'Fainá', 'Choripán'],
  Madrid: ['Bocadillo de calamares', 'Churros', 'Cocido madrileño', 'Tortilla de papas', 'Huevos rotos', 'Callos'],
  Budapest: ['Goulash', 'Lángos', 'Kürtőskalács', 'Pollo al paprika', 'Rétes', 'Dobos torta'],
  Salzburgo: ['Schnitzel', 'Salzburger Nockerl', 'Brezel', 'Apfelstrudel', 'Kasnocken', 'Mozartkugel'],
  Praga: ['Svíčková', 'Trdelník', 'Goulash con knedlíky', 'Codillo', 'Queso frito', 'Pilsner'],
  Rovaniemi: ['Reno salteado', 'Sopa de salmón', 'Leipäjuusto', 'Korvapuusti', 'Pan de centeno', 'Salmón ahumado'],
  Barcelona: ['Pan con tomate', 'Paella', 'Crema catalana', 'Bombas', 'Fideuá', 'Calçots'],
}

export const scratchPrizes = [
  'Vale por un churro con chocolate 🍫',
  'Hoy elegís vos la cena 🍽️',
  'Vale por una siesta sin culpa 😴',
  'Vale por un souvenir de hasta 10 € 🎁',
  'Vale por un "te lo dije" 😏',
  'Pasás al frente en la próxima foto 📸',
  'Vale por una cerveza checa 🍺',
  'Hoy no cargás la valija 🧳',
  'Vale por un masaje de pies 🦶',
  'Elegís la música del próximo traslado 🎵',
  'Comodín: salteás una actividad 🃏',
  'Vale por un helado aunque haga -10° 🍦',
]

export const fortunes = [
  'Una aurora te espera cuando menos la busques.',
  'Perderás un guante, pero ganarás una anécdota.',
  'El próximo café será el mejor del viaje.',
  'Alguien te hablará en húngaro. Sonreí y decí «köszönöm».',
  'La valija cerrará… con esfuerzo.',
  'Un reno se cruzará en tu camino.',
  'Tu mejor foto del viaje todavía no la sacaste.',
  'Hoy es buen día para probar algo que no sabés pronunciar.',
  'Vas a caminar más de 20.000 pasos. Tus pies ya lo saben.',
  'Las 12 uvas traerán 12 deseos cumplidos.',
  'Un desconocido te recomendará el mejor lugar para cenar.',
  'Volverás con más fotos que memoria en el celular.',
]

// Palabras locales: los libros de frases + jerga española y catalán.
const extraWords = {
  Madrid: {
    speechLang: 'es-ES',
    items: [
      { es: 'Está buenísimo / genial', local: 'Mola', pron: 'MÓ-la' },
      { es: 'Genial, lindo', local: 'Guay', pron: 'guái' },
      { es: 'Dale, está bien', local: 'Vale', pron: 'BÁ-le' },
      { es: 'Encontrarse con alguien', local: 'Quedar', pron: 'ke-DÁR' },
    ],
  },
  Barcelona: {
    speechLang: 'ca-ES',
    items: [
      { es: 'Buen día', local: 'Bon dia', pron: 'bon DÍ-a' },
      { es: 'Gracias', local: 'Gràcies', pron: 'GRÁ-si-es' },
      { es: 'Por favor', local: 'Si us plau', pron: 'sius PLÁU' },
      { es: 'Chau', local: 'Adéu', pron: 'a-DÉU' },
    ],
  },
}

export function wordsFor(city) {
  const book = phraseBooks.find((entry) => entry.city === city) ?? extraWords[city]
  if (book) return { speechLang: book.speechLang, items: book.items }
  return null
}
