function SignInputMethod({ onMethodSelect }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-3">
          ¿Conoces tus signos astrológicos?
        </h2>
        <p className="text-mystic-cream/70">
          Para una lectura precisa, necesitamos tu Sol, Luna y Ascendente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opción A: Manual (DEFAULT) */}
        <button
          onClick={() => onMethodSelect('manual')}
          className="bg-mystic-surface border-2 border-mystic-accent/40
                     hover:border-mystic-accent hover:shadow-lg hover:shadow-mystic-accent/20
                     rounded-lg p-8 text-mystic-cream transition-all duration-300
                     flex flex-col items-center text-center"
        >
          <div className="text-5xl mb-4">✋</div>
          <div className="font-display font-semibold text-xl mb-2">
            Sí, los conozco
          </div>
          <div className="text-sm opacity-70">
            Los seleccionaré manualmente
          </div>
        </button>

        {/* Opción B: Calcular */}
        <button
          onClick={() => onMethodSelect('calculate')}
          className="bg-mystic-surface border-2 border-mystic-accent/40
                     hover:border-mystic-accent hover:shadow-lg hover:shadow-mystic-accent/20
                     rounded-lg p-8 text-mystic-cream transition-all duration-300
                     flex flex-col items-center text-center"
        >
          <div className="text-5xl mb-4">🔮</div>
          <div className="font-display font-semibold text-xl mb-2">
            No, calcúlalos
          </div>
          <div className="text-sm opacity-70">
            Con mi fecha, hora y lugar de nacimiento
          </div>
        </button>
      </div>

      {/* Info adicional */}
      <div className="mt-8 p-4 bg-mystic-surface/30 border border-mystic-accent/20 rounded-lg">
        <p className="text-sm text-mystic-cream/60 text-center">
          <span className="font-semibold text-mystic-accent">Tip:</span> Si no conoces tus signos,
          podemos calcularlos por ti. Solo necesitas tu fecha de nacimiento (hora y lugar opcionales para mayor precisión).
        </p>
      </div>
    </div>
  )
}

export default SignInputMethod
