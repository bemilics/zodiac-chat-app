import { useState, useEffect } from 'react'
import { getRandomCards } from '../utils/tarotData'
import Card from './Card'

function CardSpread({ themePositions, onCardsSelected }) {
  const [spreadCards, setSpreadCards] = useState([])
  const [selectedCards, setSelectedCards] = useState([])

  useEffect(() => {
    // Obtener 10 cartas aleatorias cuando el componente se monta
    setSpreadCards(getRandomCards(10))
  }, [])

  const handleCardSelect = (card) => {
    const newSelected = [...selectedCards, card]
    setSelectedCards(newSelected)

    // Si ya se seleccionaron 3 cartas, notificar al padre
    if (newSelected.length === 3) {
      onCardsSelected(newSelected)
    }
  }

  const isCardSelected = (card) => {
    return selectedCards.some(c => c.id === card.id)
  }

  const getSelectionOrder = (card) => {
    const index = selectedCards.findIndex(c => c.id === card.id)
    return index >= 0 ? index + 1 : null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-3">
          Elige 3 cartas
        </h2>
        <p className="text-mystic-cream/70 mb-2">
          Selecciona las cartas que te llamen
        </p>
        <div className="text-sm text-mystic-accent font-semibold">
          {selectedCards.length}/3 cartas elegidas
        </div>
      </div>

      {/* Spread de cartas */}
      <div className="overflow-x-auto pb-6 px-4">
        <div className="flex gap-6 justify-center min-w-min">
          {spreadCards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              position={index}
              positionName={themePositions[selectedCards.length] || themePositions[2]}
              onSelect={handleCardSelect}
              isSelected={isCardSelected(card)}
              selectionOrder={getSelectionOrder(card)}
            />
          ))}
        </div>
      </div>

      {/* Indicador de progreso */}
      {selectedCards.length > 0 && (
        <div className="mt-8 max-w-md mx-auto">
          <div className="space-y-3">
            {themePositions.map((position, idx) => (
              <div
                key={idx}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300
                  ${idx < selectedCards.length
                    ? 'border-mystic-accent bg-mystic-accent/10'
                    : 'border-mystic-surface/50 bg-mystic-surface/20'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${idx < selectedCards.length
                    ? 'bg-mystic-accent text-mystic-bg'
                    : 'bg-mystic-surface text-mystic-cream/40'
                  }
                `}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${idx < selectedCards.length ? 'text-mystic-cream' : 'text-mystic-cream/50'}`}>
                    {position}
                  </div>
                  {selectedCards[idx] && (
                    <div className="text-xs text-mystic-accent/70 font-semibold mt-1">
                      Carta seleccionada ✓
                    </div>
                  )}
                </div>
                {idx < selectedCards.length && (
                  <div className="text-mystic-accent">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardSpread
