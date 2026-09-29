import './PhotoGallery.css'

function PhotoGallery({ photos }) {
  if (!photos.length) {
    return (
      <div className="card empty-state">
        <span className="empty-state__icon">📷</span>
        <p className="text-muted">Acá van a ir las mejores fotos… ¡a sacar muchas!</p>
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
