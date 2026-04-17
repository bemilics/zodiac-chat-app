import { useState } from 'react'

function Card({ card, position, positionName, onSelect, isSelected, selectionOrder }) {
  const handleClick = () => {
    if (!isSelected) {
      onSelect(card)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Carta siempre boca abajo */}
      <div
        className={`
          relative w-32 h-48 transition-all duration-300
          ${!isSelected ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : 'scale-105'}
          ${isSelected ? 'ring-4 ring-mystic-accent shadow-2xl shadow-mystic-accent/50' : ''}
        `}
        onClick={handleClick}
      >
        {/* Dorso de la carta */}
        <div className="w-full h-full bg-gradient-to-br from-mystic-surface to-mystic-bg
                      border-2 border-mystic-accent/40 rounded-lg p-4
                      flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
            <defs>
              <pattern id={`dot-pattern-${position}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" className="text-mystic-accent/60" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#dot-pattern-${position})`} />

            {/* Mandala central */}
            <g className="text-mystic-accent">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />

              {/* Estrellas en los puntos cardinales */}
              {[0, 90, 180, 270].map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                const x = 50 + 30 * Math.cos(rad)
                const y = 50 + 30 * Math.sin(rad)
                return (
                  <circle key={i} cx={x} cy={y} r="2" fill="currentColor" />
                )
              })}
            </g>
          </svg>
        </div>

        {/* Indicador de selección con número */}
        {isSelected && (
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-mystic-accent rounded-full
                        flex items-center justify-center shadow-lg animate-fadeIn
                        border-2 border-mystic-bg">
            <span className="text-mystic-bg font-display font-bold text-lg">
              {selectionOrder}
            </span>
          </div>
        )}
      </div>

      {/* Indicador de posición si está seleccionada */}
      {isSelected && (
        <div className="text-center animate-fadeIn">
          <div className="text-mystic-accent font-semibold text-sm">
            {selectionOrder}ª carta
          </div>
          <div className="text-mystic-cream/70 text-xs">
            {positionName}
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
