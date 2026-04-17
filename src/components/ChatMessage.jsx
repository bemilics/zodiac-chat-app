import { getZodiacByName, getZodiacNickname } from '../utils/zodiacData'

function ChatMessage({ message, isUser, userSigns }) {
  const zodiac = !isUser ? getZodiacByName(message.sender) : null

  // Obtener apodo único del signo basado en su posición astrológica
  let nickname = ''
  if (!isUser && userSigns && zodiac) {
    if (userSigns.sol === zodiac.name) {
      nickname = getZodiacNickname(zodiac.name, 'sol')
    } else if (userSigns.luna === zodiac.name) {
      nickname = getZodiacNickname(zodiac.name, 'luna')
    } else if (userSigns.ascendente === zodiac.name) {
      nickname = getZodiacNickname(zodiac.name, 'ascendente')
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slideIn`}>
      <div className={`max-w-[75%] ${isUser ? 'ml-12' : 'mr-12'}`}>
        {/* Nombre del sender (solo para signos) */}
        {!isUser && zodiac && (
          <div className="text-xs text-mystic-cream/60 mb-1 px-3 font-semibold">
            {zodiac.symbol} {zodiac.name}
            {nickname && <span className="text-mystic-accent/80 ml-2">· {nickname}</span>}
          </div>
        )}

        {/* Burbuja del mensaje */}
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-md
            ${isUser
              ? 'bg-mystic-accent text-mystic-bg rounded-br-sm'
              : 'rounded-bl-sm'
            }
          `}
          style={{
            backgroundColor: isUser ? undefined : `${zodiac?.color}40`,
            borderLeft: !isUser ? `3px solid ${zodiac?.color}` : undefined,
          }}
        >
          <p className={`text-sm leading-relaxed ${isUser ? 'text-mystic-bg' : 'text-mystic-cream'}`}>
            {message.text}
          </p>
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-mystic-cream/40 mt-1 px-3 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp || new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
