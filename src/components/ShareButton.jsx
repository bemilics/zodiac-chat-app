import { useState } from 'react'
import { captureForInstagram } from '../utils/screenshotUtils'

function ShareButton({ chatContainerRef }) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [error, setError] = useState(null)

  const handleShare = async () => {
    if (!chatContainerRef?.current) {
      setError('No se encontró el chat para capturar')
      return
    }

    setIsCapturing(true)
    setError(null)

    try {
      await captureForInstagram(chatContainerRef.current)
    } catch (err) {
      setError(err.message)
      console.error('Error al compartir:', err)
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={handleShare}
        disabled={isCapturing}
        className={`
          px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
          flex items-center gap-3 mx-auto
          ${isCapturing
            ? 'bg-mystic-surface text-mystic-cream/40 cursor-wait'
            : 'bg-gradient-to-r from-mystic-accent to-mystic-burgundy text-mystic-cream hover:shadow-xl hover:shadow-mystic-accent/30 hover:scale-105'
          }
        `}
      >
        {isCapturing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-mystic-cream/40 border-t-mystic-cream"></div>
            Preparando imagen...
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Compartir en Instagram Stories
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-3">
          Error: {error}
        </p>
      )}

      <p className="text-mystic-cream/50 text-xs mt-4">
        Se descargará una imagen optimizada para Instagram Stories
      </p>
    </div>
  )
}

export default ShareButton
