import './PhotoGallery.css'

function PhotoGallery({ photos }) {
  if (!photos.length) {
    return (
      <div className="card photo-gallery-empty">
        <span className="text-muted">📷 Todavía no hay fotos cargadas de este destino</span>
      </div>
    )
  }

  return (
    <div className="photo-gallery">
      {photos.map((src) => (
        <img key={src} src={src} alt="" className="photo-gallery__photo" loading="lazy" />
      ))}
    </div>
  )
}

export default PhotoGallery
