import { useState, useEffect } from 'react'
import ThemeSelector from './components/ThemeSelector'
import SignInputMethod from './components/SignInputMethod'
import ZodiacManualInput from './components/ZodiacManualInput'
import BirthDataInput from './components/BirthDataInput'
import ConstellationAnimation from './components/ConstellationAnimation'
import OptionalInput from './components/OptionalInput'
import ChatGroup from './components/ChatGroup'
import ChatHistory from './components/ChatHistory'
import {
  createNewChat,
  saveChat,
  loadChat,
  getCurrentChatId,
  setCurrentChatId
} from './utils/chatStorage'
import {
  trackThemeSelected,
  trackInputMethodSelected,
  trackSignsSelected,
  trackChatStarted,
  trackNewChatCreated,
  trackChatDeleted,
  trackChatSwitched
} from './utils/analytics'

function App() {
  // State management para el flujo completo (6 pasos)
  const [currentStep, setCurrentStep] = useState(1) // 1-6
  const [selectedTheme, setSelectedTheme] = useState('') // 'amor', 'decision', etc.
  const [inputMethod, setInputMethod] = useState('') // 'manual' | 'calculate'
  const [userSigns, setUserSigns] = useState(null) // { sol, luna, ascendente }
  const [userContext, setUserContext] = useState('') // Contexto adicional del usuario
  const [chatMessages, setChatMessages] = useState([]) // Historial completo del chat
  const [isGenerating, setIsGenerating] = useState(false) // Loading state para API calls
  const [typingCard, setTypingCard] = useState(null) // Nombre del signo que está "escribiendo"
  const [currentChatId, setCurrentChatIdState] = useState(null) // ID del chat actual

  // useEffect: Cargar chat al montar el componente
  useEffect(() => {
    const savedChatId = getCurrentChatId()
    if (savedChatId) {
      const chat = loadChat(savedChatId)
      if (chat && chat.userSigns) {
        // Restaurar estado del chat guardado
        setCurrentChatIdState(savedChatId)
        setCurrentStep(6) // Ir directo al chat
        setSelectedTheme(chat.selectedTheme || '')
        setUserSigns(chat.userSigns)
        setUserContext(chat.userContext || '')
        setChatMessages(chat.messages || [])
      }
    }
  }, [])

  // useEffect: Auto-guardar cuando cambia el estado del chat
  useEffect(() => {
    if (currentChatId && userSigns) {
      const chatData = {
        currentStep,
        selectedTheme,
        inputMethod,
        userSigns,
        userContext,
        messages: chatMessages,
        createdAt: Date.now()
      }
      saveChat(currentChatId, chatData)
    }
  }, [currentChatId, currentStep, selectedTheme, inputMethod, userSigns, userContext, chatMessages])

  // Handler: Crear nuevo chat
  const handleNewChat = () => {
    const newChatId = createNewChat()
    setCurrentChatIdState(newChatId)

    // Resetear todo el estado
    setCurrentStep(1)
    setSelectedTheme('')
    setInputMethod('')
    setUserSigns(null)
    setUserContext('')
    setChatMessages([])
    setIsGenerating(false)
    setTypingCard(null)

    // Analytics
    trackNewChatCreated()
  }

  // Handler: Seleccionar chat existente
  const handleSelectChat = (chatId) => {
    const chat = loadChat(chatId)
    if (chat) {
      setCurrentChatIdState(chatId)
      setCurrentChatId(chatId)

      // Si el chat tiene datos, ir al chat. Si no, empezar desde cero
      if (chat.userSigns) {
        setCurrentStep(6)
        setSelectedTheme(chat.selectedTheme || '')
        setUserSigns(chat.userSigns)
        setUserContext(chat.userContext || '')
        setChatMessages(chat.messages || [])
      } else {
        setCurrentStep(1)
        setSelectedTheme('')
        setInputMethod('')
        setUserSigns(null)
        setUserContext('')
        setChatMessages([])
      }

      setIsGenerating(false)
      setTypingCard(null)

      // Analytics
      trackChatSwitched()
    }
  }

  // Handler: Eliminar chat
  const handleDeleteChat = (deletedChatId) => {
    // Analytics
    trackChatDeleted()

    if (deletedChatId === currentChatId) {
      // Si eliminamos el chat actual, crear uno nuevo
      handleNewChat()
    }
  }

  // Paso 1: Handler para cuando el usuario selecciona un tema
  const handleThemeSelect = (themeKey, customTheme = '') => {
    // Si no hay chat actual, crear uno nuevo
    if (!currentChatId) {
      const newChatId = createNewChat()
      setCurrentChatIdState(newChatId)
    }

    const theme = customTheme || themeKey
    setSelectedTheme(theme)
    setCurrentStep(2)

    // Analytics
    trackThemeSelected(theme)
  }

  // Paso 2: Handler para cuando el usuario elige el método de input
  const handleMethodSelect = (method) => {
    setInputMethod(method)
    setCurrentStep(3)

    // Analytics
    trackInputMethodSelected(method)
  }

  // Paso 3: Handler para cuando el usuario tiene sus signos listos (manual o calculados)
  const handleSignsReady = (signs) => {
    setUserSigns(signs)
    setCurrentStep(4) // ConstellationAnimation

    // Analytics
    trackSignsSelected(signs)
  }

  // Paso 4: Handler para cuando termina la animación de constelaciones
  const handleAnimationComplete = () => {
    setCurrentStep(5)
  }

  // Paso 5: Handler para cuando el usuario completa el input opcional
  const handleContextSubmit = (context) => {
    setUserContext(context)
    setCurrentStep(6)

    // Analytics: Chat iniciado
    trackChatStarted(userSigns, selectedTheme)
  }

  // Handlers para el chat
  const addChatMessages = (messages) => {
    setChatMessages(prev => [...prev, ...messages])
  }

  const setGenerating = (value) => {
    setIsGenerating(value)
  }

  const setTyping = (signName) => {
    setTypingCard(signName)
  }

  return (
    <div className="min-h-screen bg-mystic-bg text-mystic-cream">
      {/* Layout con sidebar solo en paso 6 (chat) */}
      {currentStep === 6 ? (
        <div className="flex h-screen">
          {/* Sidebar de historial */}
          <ChatHistory
            currentChatId={currentChatId}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
          />

          {/* Área principal del chat */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <ChatGroup
                userSigns={userSigns}
                selectedTheme={selectedTheme}
                userContext={userContext}
                chatMessages={chatMessages}
                addChatMessages={addChatMessages}
                isGenerating={isGenerating}
                setIsGenerating={setGenerating}
                typingCard={typingCard}
                setTypingCard={setTyping}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header de la app */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-mystic-accent mb-2">
              ✦ Zodiac Chat ✦
            </h1>
            <p className="text-mystic-cream/70 font-body text-sm md:text-base">
              Tus signos tienen mucho que decir sobre ti
            </p>
          </header>

          {/* Renderizar el componente correcto según el step actual */}
          <main>
          {/* Paso 1: Selección de tema */}
          {currentStep === 1 && (
            <ThemeSelector onThemeSelect={handleThemeSelect} />
          )}

          {/* Paso 2: Método de input (manual o calculado) */}
          {currentStep === 2 && (
            <SignInputMethod onMethodSelect={handleMethodSelect} />
          )}

          {/* Paso 3a: Input manual de signos */}
          {currentStep === 3 && inputMethod === 'manual' && (
            <ZodiacManualInput onSignsSelect={handleSignsReady} />
          )}

          {/* Paso 3b: Cálculo de signos por fecha/hora/lugar */}
          {currentStep === 3 && inputMethod === 'calculate' && (
            <BirthDataInput onSignsCalculated={handleSignsReady} />
          )}

          {/* Paso 4: Animación de constelaciones (loading) */}
          {currentStep === 4 && (
            <ConstellationAnimation onComplete={handleAnimationComplete} />
          )}

          {/* Paso 5: Input opcional de contexto */}
          {currentStep === 5 && (
            <OptionalInput onContinue={handleContextSubmit} />
          )}
        </main>

          {/* Footer */}
          <footer className="mt-16 text-center text-mystic-cream/50 text-xs">
            <p>Hecho con ✦ y código</p>
          </footer>
        </div>
      )}
    </div>
  )
}

export default App
