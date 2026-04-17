import { useState } from 'react'
import { ZODIACS } from '../utils/zodiacData'

function ZodiacManualInput({ onSignsSelect }) {
  const [signs, setSigns] = useState({
    sol: '',
    luna: '',
    ascendente: ''
  })

  const handleSignChange = (position, value) => {
    setSigns(prev => ({
      ...prev,
      [position]: value
    }))
  }

  const handleContinue = () => {
    if (signs.sol && signs.luna && signs.ascendente) {
      onSignsSelect(signs)
    }
  }

  const canContinue = signs.sol && signs.luna && signs.ascendente

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-3">
          Selecciona tus signos
        </h2>
        <p className="text-mystic-cream/70">
          Elige tu Sol, Luna y Ascendente
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Sol */}
        <div className="bg-mystic-surface/50 rounded-lg p-6 border-2 border-mystic-accent/20">
          <label htmlFor="sol" className="block mb-3">
            <span className="text-2xl mr-2">☉</span>
            <span className="font-display font-semibold text-mystic-cream text-lg">
              Sol
            </span>
            <span className="text-mystic-cream/60 text-sm ml-2">
              (Identidad, esencia)
            </span>
          </label>
          <select
            id="sol"
            value={signs.sol}
            onChange={(e) => handleSignChange('sol', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                     text-mystic-cream focus:outline-none focus:border-mystic-accent
                     transition-colors cursor-pointer"
          >
            <option value="">Selecciona tu signo solar</option>
            {ZODIACS.map(zodiac => (
              <option key={zodiac.id} value={zodiac.name}>
                {zodiac.symbol} {zodiac.name} ({zodiac.dates})
              </option>
            ))}
          </select>
        </div>

        {/* Luna */}
        <div className="bg-mystic-surface/50 rounded-lg p-6 border-2 border-mystic-accent/20">
          <label htmlFor="luna" className="block mb-3">
            <span className="text-2xl mr-2">☽</span>
            <span className="font-display font-semibold text-mystic-cream text-lg">
              Luna
            </span>
            <span className="text-mystic-cream/60 text-sm ml-2">
              (Emociones, subconsciente)
            </span>
          </label>
          <select
            id="luna"
            value={signs.luna}
            onChange={(e) => handleSignChange('luna', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                     text-mystic-cream focus:outline-none focus:border-mystic-accent
                     transition-colors cursor-pointer"
          >
            <option value="">Selecciona tu signo lunar</option>
            {ZODIACS.map(zodiac => (
              <option key={zodiac.id} value={zodiac.name}>
                {zodiac.symbol} {zodiac.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ascendente */}
        <div className="bg-mystic-surface/50 rounded-lg p-6 border-2 border-mystic-accent/20">
          <label htmlFor="ascendente" className="block mb-3">
            <span className="text-2xl mr-2">↗</span>
            <span className="font-display font-semibold text-mystic-cream text-lg">
              Ascendente
            </span>
            <span className="text-mystic-cream/60 text-sm ml-2">
              (Expresión externa, máscara)
            </span>
          </label>
          <select
            id="ascendente"
            value={signs.ascendente}
            onChange={(e) => handleSignChange('ascendente', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                     text-mystic-cream focus:outline-none focus:border-mystic-accent
                     transition-colors cursor-pointer"
          >
            <option value="">Selecciona tu ascendente</option>
            {ZODIACS.map(zodiac => (
              <option key={zodiac.id} value={zodiac.name}>
                {zodiac.symbol} {zodiac.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón continuar */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-300
            ${canContinue
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

export default ZodiacManualInput
