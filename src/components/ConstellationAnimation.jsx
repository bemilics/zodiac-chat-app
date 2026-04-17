import { useEffect } from 'react'

function ConstellationAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500) // 2.5 segundos

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-mystic-bg flex flex-col items-center justify-center p-4">
      <div className="constellation-container mb-8">
        {/* SVG con animación de constelaciones */}
        <svg className="w-64 h-64 constellation-svg" viewBox="0 0 200 200">
          {/* Constelación central - círculo zodiacal */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#C9A86A" strokeWidth="1" opacity="0.3"
                  className="animate-[spin_20s_linear_infinite]" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#C9A86A" strokeWidth="1" opacity="0.2"
                  className="animate-[spin_15s_linear_infinite_reverse]" />

          {/* Estrellas principales (12 signos del zodíaco en círculo) */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const x = 100 + 80 * Math.cos(angle)
            const y = 100 + 80 * Math.sin(angle)
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#C9A86A"
                  className="star-bg"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                {/* Líneas conectando estrellas */}
                {i < 11 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={100 + 80 * Math.cos(((i + 1) * 30 - 90) * (Math.PI / 180))}
                    y2={100 + 80 * Math.sin(((i + 1) * 30 - 90) * (Math.PI / 180))}
                    stroke="#C9A86A"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                )}
              </g>
            )
          })}

          {/* Estrellas internas flotantes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180)
            const radius = 40 + (i % 2) * 15
            const x = 100 + radius * Math.cos(angle)
            const y = 100 + radius * Math.sin(angle)
            return (
              <circle
                key={`inner-${i}`}
                cx={x}
                cy={y}
                r="2"
                fill="#F4EAD5"
                className="floating-star"
                style={{ animationDelay: `${i * 0.15}s` }}
                opacity="0.6"
              />
            )
          })}

          {/* Centro - símbolo místico */}
          <circle cx="100" cy="100" r="5" fill="#C9A86A" opacity="0.8" className="animate-pulse" />
          <circle cx="100" cy="100" r="8" fill="none" stroke="#C9A86A" strokeWidth="1" opacity="0.5" className="animate-pulse" />
        </svg>
      </div>

      <h2 className="font-display text-2xl text-mystic-cream animate-pulse">
        Alineando tu carta astral...
      </h2>

      <div className="mt-4 flex gap-2">
        <div className="w-2 h-2 bg-mystic-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-mystic-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-mystic-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  )
}

export default ConstellationAnimation
