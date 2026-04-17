function CardShuffle({ onComplete }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-8">
        Barajando las cartas...
      </h2>

      {/* Animación de cartas mezclándose */}
      <div className="relative h-64 mb-12 flex items-center justify-center">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-48 rounded-lg shadow-xl animate-shuffle"
            style={{
              animationDelay: `${i * 0.15}s`,
              zIndex: i,
            }}
          >
            {/* Dorso de carta con patrón */}
            <div className="w-full h-full bg-gradient-to-br from-mystic-surface to-mystic-bg border-2 border-mystic-accent/30 rounded-lg p-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
                <defs>
                  <pattern id={`pattern-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" className="text-mystic-accent" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#pattern-${i})`} />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-mystic-accent" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-mystic-accent" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-mystic-accent" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <p className="text-mystic-cream/70 mb-8">
        Las cartas se están alineando con tu energía...
      </p>

      <button
        onClick={onComplete}
        className="px-8 py-3 rounded-lg font-semibold bg-mystic-accent text-mystic-bg
                 hover:bg-mystic-accent/90 transition-all duration-300
                 shadow-lg shadow-mystic-accent/30"
      >
        Terminar de barajar y continuar
      </button>

      <style>{`
        @keyframes shuffle {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-40px) translateY(-20px) rotate(-15deg);
          }
          50% {
            transform: translateX(40px) translateY(20px) rotate(15deg);
          }
          75% {
            transform: translateX(-20px) translateY(30px) rotate(-8deg);
          }
        }

        .animate-shuffle {
          animation: shuffle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default CardShuffle
