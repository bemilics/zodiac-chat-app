import { useEffect, useRef, useState } from 'react'

function useChatScroll(messages) {
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)
  const [isNearBottom, setIsNearBottom] = useState(true)

  // Detectar si el usuario está cerca del bottom del chat
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight
      setIsNearBottom(distanceFromBottom < 100) // Considerar "near bottom" si está a menos de 100px
    }
  }

  // Auto-scroll cuando llegan mensajes nuevos (solo si está near bottom)
  useEffect(() => {
    if (isNearBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isNearBottom])

  return {
    messagesEndRef,
    containerRef,
    handleScroll,
  }
}

export default useChatScroll
