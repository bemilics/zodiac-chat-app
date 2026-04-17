import { useState } from 'react'
import ThemeSelector from './components/ThemeSelector'
import SignInputMethod from './components/SignInputMethod'
import ZodiacManualInput from './components/ZodiacManualInput'
import BirthDataInput from './components/BirthDataInput'
import ConstellationAnimation from './components/ConstellationAnimation'
import OptionalInput from './components/OptionalInput'
import ChatGroup from './components/ChatGroup'

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

  // Paso 1: Handler para cuando el usuario selecciona un tema
  const handleThemeSelect = (themeKey, customTheme = '') => {
    setSelectedTheme(customTheme || themeKey)
    setCurrentStep(2)
  }

  // Paso 2: Handler para cuando el usuario elige el método de input
  const handleMethodSelect = (method) => {
    setInputMethod(method)
    setCurrentStep(3)
  }

  // Paso 3: Handler para cuando el usuario tiene sus signos listos (manual o calculados)
  const handleSignsReady = (signs) => {
    setUserSigns(signs)
    setCurrentStep(4) // ConstellationAnimation
  }

  // Paso 4: Handler para cuando termina la animación de constelaciones
  const handleAnimationComplete = () => {
    setCurrentStep(5)
  }

  // Paso 5: Handler para cuando el usuario completa el input opcional
  const handleContextSubmit = (context) => {
    setUserContext(context)
    setCurrentStep(6)
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

          {/* Paso 6: Chat grupal con los 3 signos */}
          {currentStep === 6 && (
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
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-mystic-cream/50 text-xs">
          <p>Hecho con ✦ y código</p>
        </footer>
      </div>
    </div>
  )
}

export default App
