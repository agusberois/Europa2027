import { useState } from 'react'
import { stickers, RARITY } from '../game/stickers'
import { achievements } from '../game/achievements'
import { passportCities, passportStop } from '../game/passport'
import { useGame } from '../game/store'
import { formatShortDate } from '../utils/trip'
import BackLink from '../components/BackLink.jsx'
import PassportStamp from '../components/game/PassportStamp.jsx'
import './Album.css'

const TABS = [
  { id: 'stickers', label: '📒 Figuritas' },
  { id: 'passport', label: '🛂 Pasaporte' },
  { id: 'achievements', label: '🏅 Logros' },
]

function StickersTab({ owned }) {
  const count = Object.keys(owned).length
  const duplicates = Object.values(owned).reduce((sum, n) => sum + n - 1, 0)

  return (
    <>
      <p className="text-muted album__hint">
        {count}/{stickers.length} pegadas{duplicates > 0 && ` · ${duplicates} repetidas`}. Aparecen
        escondidas asomando por los bordes de cualquier página: ¡mirá bien!
      </p>
      <div className="progress">
        <div className="progress__fill" style={{ width: `${(count / stickers.length) * 100}%` }} />
      </div>
      <ul className="album__grid">
        {stickers.map((sticker) => {
          const times = owned[sticker.id]
          return (
            <li
              key={sticker.id}
              className={`album__sticker album__sticker--${sticker.rarity}${times ? ' is-owned' : ''}`}
            >
              <span className="album__sticker-number">#{String(sticker.number).padStart(2, '0')}</span>
              <span className="album__sticker-emoji">{times ? sticker.emoji : '?'}</span>
              <span className="album__sticker-name">{times ? sticker.name : sticker.city ?? '???'}</span>
              {times > 1 && <span className="album__sticker-dupes">×{times}</span>}
              {sticker.rarity !== 'common' && (
                <span className="album__sticker-rarity">{RARITY[sticker.rarity].label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

function PassportTab({ stamps }) {
  return (
    <>
      <p className="text-muted album__hint">
        Abrí cada destino para sellarlo. Si lo abrís estando ahí de verdad, el sello sale dorado ✨
      </p>
      <div className="passport">
        {passportCities.map((city) => {
          const stamp = stamps[city]
          const stop = passportStop(city)
          return (
            <div key={city} className="passport__page">
              {stamp ? (
                <PassportStamp city={city} flag={stop.flag} date={stamp.date} real={stamp.real} />
              ) : (
                <span className="passport__empty">
                  {stop.flag}
                  <span>{city}</span>
                </span>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

function AchievementsTab({ unlocked }) {
  const count = Object.keys(unlocked).length
  return (
    <>
      <p className="text-muted album__hint">
        {count}/{achievements.length} desbloqueados. Algunos son secretos… o casi.
      </p>
      <ul className="achievements">
        {achievements.map((achievement) => {
          const date = unlocked[achievement.id]
          return (
            <li key={achievement.id} className={`card achievements__item${date ? ' is-unlocked' : ''}`}>
              <span className="achievements__icon">{date ? achievement.icon : '🔒'}</span>
              <div>
                <strong>{achievement.name}</strong>
                <span className="text-muted achievements__description">
                  {achievement.description}
                  {date && ` · ${formatShortDate(date)}`}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function Album() {
  const game = useGame()
  const [tab, setTab] = useState('stickers')

  return (
    <div className="container stack">
      <BackLink to="/">Inicio</BackLink>

      <header className="page-header">
        <span className="page-header__icon">📒</span>
        <div>
          <h1>Mi álbum de viaje</h1>
          <p className="text-muted">Figuritas, sellos y logros</p>
        </div>
      </header>

      <div className="album__tabs" role="tablist">
        {TABS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            className={`album__tab${tab === entry.id ? ' is-active' : ''}`}
            onClick={() => setTab(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <section className="album__panel" key={tab}>
        {tab === 'stickers' && <StickersTab owned={game.stickers} />}
        {tab === 'passport' && <PassportTab stamps={game.stamps} />}
        {tab === 'achievements' && <AchievementsTab unlocked={game.achievements} />}
      </section>
    </div>
  )
}

export default Album
