// Fotos por parada (slug del itinerario). Se completa durante/después del
// viaje: alcanza con poner los archivos en public/photos/<slug>/ y agregar
// el nombre de archivo acá.
const photos = {
  // madrid: ['plaza-mayor.jpg', 'gran-via.jpg'],
}

export function getPhotos(slug) {
  const files = photos[slug] ?? []
  return files.map((file) => `/photos/${slug}/${file}`)
}
