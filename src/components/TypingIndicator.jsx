import { getZodiacByName, getZodiacNickname } from '../utils/zodiacData'

function TypingIndicator({ cardName, userSigns }) {
  const zodiac = getZodiacByName(cardName)

  if (!zodiac) return null

  // Obtener apodo único del signo basado en su posición astrológica
  let nickname = ''
  if (userSigns) {
    if (userSigns.sol === zodiac.name) {
      nickname = getZodiacNickname(zodiac.name, 'sol')
    } else if (userSigns.luna === zodiac.name) {
      nickname = getZodiacNickname(zodiac.name, 'luna')
    } else if (userSigns.ascendente === zodiac.name) {
      nickname = getZodiacNickname(zodiac.name, 'ascendente')
    }
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[75%] mr-12">
        {/* Nombre del signo */}
        <div className="text-xs text-mystic-cream/60 mb-1 px-3 font-semibold">
          {zodiac.symbol} {zodiac.name}
          {nickname && <span className="text-mystic-accent/80 ml-2">· {nickname}</span>}
        </div>

        {/* Burbuja con indicador de typing */}
        <div
          className="px-4 py-3 rounded-2xl shadow-md rounded-bl-sm flex items-center gap-1"
          style={{
            backgroundColor: `${zodiac.color}40`,
            borderLeft: `3px solid ${zodiac.color}`,
          }}
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-mystic-cream/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-mystic-cream/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-mystic-cream/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
