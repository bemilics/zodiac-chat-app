import { useState } from 'react'

function OptionalInput({ onContinue }) {
  const [text, setText] = useState('')
  const maxLength = 200

  const handleContinue = () => {
    onContinue(text.trim())
  }

  const handleSkip = () => {
    onContinue('')
  }

  return (
    <div className="max-w-2xl mx-auto stars-background-container relative">
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-3">
          Un último detalle...
        </h2>
        <p className="text-mystic-cream/70">
          ¿Hay algo específico que quieras que tus signos consideren?
        </p>
      </div>

      <div className="mb-6 relative z-10">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ej: Estoy en una situación complicada con mi trabajo, no sé si quedarme o buscar algo nuevo..."
          className="w-full h-32 px-4 py-3 rounded-lg bg-mystic-surface/90 border-2 border-mystic-accent/30
                   text-mystic-cream placeholder-mystic-cream/40 resize-none
                   focus:outline-none focus:border-mystic-accent transition-colors backdrop-blur-sm"
          maxLength={maxLength}
        />
        <div className="flex justify-between items-center mt-2 text-xs">
          <span className="text-mystic-cream/50">
            Esto es totalmente opcional
          </span>
          <span className="text-mystic-cream/50">
            {text.length}/{maxLength}
          </span>
        </div>
      </div>

      <div className="flex gap-4 justify-center relative z-10">
        <button
          onClick={handleSkip}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-mystic-accent/30
                   text-mystic-cream hover:border-mystic-accent/60
                   transition-all duration-300"
        >
          Saltar
        </button>
        <button
          onClick={handleContinue}
          className="px-8 py-3 rounded-lg font-semibold bg-mystic-accent text-mystic-bg
                   hover:bg-mystic-accent/90 transition-all duration-300
                   shadow-lg shadow-mystic-accent/30"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default OptionalInput
