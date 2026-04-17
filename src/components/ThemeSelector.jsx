import { useState } from 'react'
import { ZODIAC_THEMES } from '../utils/zodiacData'

function ThemeSelector({ onThemeSelect }) {
  const [selected, setSelected] = useState(null)
  const [customTheme, setCustomTheme] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleThemeClick = (themeKey) => {
    if (themeKey === 'libre') {
      setShowCustomInput(true)
      setSelected(themeKey)
    } else {
      setSelected(themeKey)
      setShowCustomInput(false)
    }
  }

  const handleContinue = () => {
    if (selected === 'libre' && customTheme.trim()) {
      onThemeSelect(selected, customTheme.trim())
    } else if (selected && selected !== 'libre') {
      onThemeSelect(selected)
    }
  }

  const canContinue = () => {
    if (!selected) return false
    if (selected === 'libre') return customTheme.trim().length > 0
    return true
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-3">
          ¿Qué quieres consultar?
        </h2>
        <p className="text-mystic-cream/70">
          Elige el tema de tu consulta astrológica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(ZODIAC_THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => handleThemeClick(key)}
            className={`
              p-6 rounded-lg border-2 transition-all duration-300
              ${selected === key
                ? 'border-mystic-accent bg-mystic-accent/10 shadow-lg shadow-mystic-accent/20'
                : 'border-mystic-surface hover:border-mystic-accent/50 bg-mystic-surface/50'
              }
            `}
          >
            <div className="text-4xl mb-2">{theme.emoji}</div>
            <h3 className="text-xl font-display font-semibold text-mystic-cream mb-2">
              {theme.label}
            </h3>
            <p className="text-sm text-mystic-cream/60">
              {theme.description}
            </p>
          </button>
        ))}
      </div>

      {/* Input para tema libre */}
      {showCustomInput && (
        <div className="mb-6 animate-fadeIn">
          <label htmlFor="custom-theme" className="block text-sm text-mystic-cream/80 mb-2">
            Cuéntanos qué quieres consultar:
          </label>
          <input
            id="custom-theme"
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Ej: Mi próximo viaje, una amistad complicada..."
            className="w-full px-4 py-3 rounded-lg bg-mystic-surface border-2 border-mystic-accent/30
                     text-mystic-cream placeholder-mystic-cream/40
                     focus:outline-none focus:border-mystic-accent transition-colors"
            maxLength={100}
            autoFocus
          />
          <div className="text-xs text-mystic-cream/50 mt-1 text-right">
            {customTheme.length}/100
          </div>
        </div>
      )}

      {/* Botón continuar */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!canContinue()}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-300
            ${canContinue()
              ? 'bg-mystic-accent text-mystic-bg hover:bg-mystic-accent/90 shadow-lg shadow-mystic-accent/30'
              : 'bg-mystic-surface text-mystic-cream/40 cursor-not-allowed'
            }
          `}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default ThemeSelector
