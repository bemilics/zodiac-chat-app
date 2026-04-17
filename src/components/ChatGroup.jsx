import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import ShareButton from './ShareButton'
import useChatScroll from '../hooks/useChatScroll'
import { buildInitialPromptZodiac, buildContinuationPromptZodiac } from '../utils/zodiacPromptBuilder'
import { generateChatMessages, getCurrentTimestamp } from '../utils/claudeAPI'
import { trackMessageSent } from '../utils/analytics'

function ChatGroup({
  userSigns,
  selectedTheme,
  userContext,
  chatMessages,
  addChatMessages,
  isGenerating,
  setIsGenerating,
  typingCard,
  setTypingCard
}) {
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState(null)
  const [hasGeneratedInitial, setHasGeneratedInitial] = useState(false)
  const { messagesEndRef, containerRef, handleScroll } = useChatScroll(chatMessages)
  const chatContainerRef = useRef(null)

  // Generar chat inicial cuando el componente se monta
  useEffect(() => {
    if (!hasGeneratedInitial) {
      generateInitialChat()
    }
  }, [hasGeneratedInitial])

  const generateInitialChat = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const prompt = buildInitialPromptZodiac(
        userSigns,
        selectedTheme,
        userContext
      )

      const messages = await generateChatMessages(prompt)

      // Mostrar mensajes con stagger animation
      for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        addChatMessages([messages[i]])
      }

      setHasGeneratedInitial(true)
    } catch (err) {
      setError(err.message)
      console.error('Error generando chat inicial:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUserMessage = async () => {
    if (!userInput.trim() || isGenerating) return

    const userMessage = {
      sender: 'user',
      text: userInput.trim(),
      timestamp: getCurrentTimestamp()
    }

    // Agregar mensaje del usuario al chat
    addChatMessages([userMessage])
    setUserInput('')
    setIsGenerating(true)
    setError(null)

    // Analytics
    trackMessageSent()

    try {
      const prompt = buildContinuationPromptZodiac(
        userSigns,
        [...chatMessages, userMessage],
        userMessage.text
      )

      const cardResponses = await generateChatMessages(prompt)

      // Mostrar respuestas con typing indicators
      for (let i = 0; i < cardResponses.length; i++) {
        const response = cardResponses[i]

        // Mostrar typing indicator
        setTypingCard(response.sender)
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Quitar typing y agregar mensaje
        setTypingCard(null)
        addChatMessages([response])

        // Delay entre mensajes
        if (i < cardResponses.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
    } catch (err) {
      setError(err.message)
      console.error('Error generando respuestas:', err)
    } finally {
      setIsGenerating(false)
      setTypingCard(null)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleUserMessage()
    }
  }

  const handleRetry = () => {
    setError(null)
    if (!hasGeneratedInitial) {
      generateInitialChat()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header del chat */}
      <div className="bg-mystic-surface rounded-t-2xl p-4 border-b-2 border-mystic-bg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg text-mystic-accent">
              ✦ Tu carta astral
            </h3>
            <p className="text-xs text-mystic-cream/60">
              ☉ {userSigns.sol} · ☽ {userSigns.luna} · ↗ {userSigns.ascendente}
            </p>
          </div>
          <div className="text-xs text-mystic-cream/50">
            {new Date().toLocaleDateString('es', { day: 'numeric', month: 'short' })}
          </div>
        </div>
      </div>

      {/* Área de mensajes */}
      <div
        ref={(el) => {
          containerRef.current = el
          chatContainerRef.current = el
        }}
        onScroll={handleScroll}
        className="bg-mystic-bg/50 p-4 h-[500px] overflow-y-auto scroll-smooth scroll-custom"
        id="chat-messages-container"
      >
        {chatMessages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg}
            isUser={msg.sender === 'user'}
            userSigns={userSigns}
          />
        ))}

        {/* Typing indicator */}
        {typingCard && <TypingIndicator cardName={typingCard} userSigns={userSigns} />}

        {/* Error display */}
        {error && (
          <div className="my-4 p-4 bg-red-900/20 border-2 border-red-500/50 rounded-lg text-center">
            <p className="text-red-400 text-sm mb-2">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm text-red-300 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Loading inicial */}
        {!hasGeneratedInitial && !error && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-mystic-accent border-t-transparent"></div>
            <p className="text-mystic-cream/60 mt-4 text-sm">
              Tus signos están conversando...
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input del usuario */}
      <div className="bg-mystic-surface rounded-b-2xl p-4 shadow-lg">
        <div className="flex gap-3 items-end">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isGenerating ? "Tus signos están respondiendo..." : "Escribe un mensaje..."}
            disabled={isGenerating}
            className="flex-1 px-4 py-3 rounded-xl bg-mystic-bg border-2 border-mystic-accent/30
                     text-mystic-cream placeholder-mystic-cream/40 resize-none h-12
                     focus:outline-none focus:border-mystic-accent transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
            maxLength={300}
            rows={1}
          />
          <button
            onClick={handleUserMessage}
            disabled={!userInput.trim() || isGenerating}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-300
              ${userInput.trim() && !isGenerating
                ? 'bg-mystic-accent text-mystic-bg hover:bg-mystic-accent/90 shadow-lg shadow-mystic-accent/30'
                : 'bg-mystic-bg text-mystic-cream/40 cursor-not-allowed'
              }
            `}
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Share button */}
      {chatMessages.length > 0 && (
        <div className="mt-6">
          <ShareButton chatContainerRef={chatContainerRef} />
        </div>
      )}
    </div>
  )
}

export default ChatGroup
