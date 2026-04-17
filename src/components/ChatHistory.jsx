import { useState } from 'react'
import { getAllChats, deleteChat, getChatDisplayName, formatChatDate } from '../utils/chatStorage'

function ChatHistory({ currentChatId, onSelectChat, onNewChat, onDeleteChat }) {
  const [isOpen, setIsOpen] = useState(false)
  const chats = getAllChats()

  const handleSelectChat = (chatId) => {
    onSelectChat(chatId)
    setIsOpen(false) // Cerrar sidebar en móvil después de seleccionar
  }

  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation() // Evitar que se seleccione el chat al eliminar

    if (window.confirm('¿Seguro que quieres eliminar este chat?')) {
      deleteChat(chatId)
      onDeleteChat(chatId)
    }
  }

  const handleNewChat = () => {
    onNewChat()
    setIsOpen(false) // Cerrar sidebar en móvil después de crear nuevo
  }

  return (
    <>
      {/* Botón toggle para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-mystic-surface p-3 rounded-xl shadow-lg border-2 border-mystic-accent/30 hover:border-mystic-accent transition-all"
        aria-label="Toggle chat history"
      >
        <svg
          className="w-6 h-6 text-mystic-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 left-0 h-screen w-80 bg-mystic-surface border-r-2 border-mystic-accent/20
          flex flex-col z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-mystic-accent/20">
          <h2 className="text-xl font-display font-bold text-mystic-accent mb-3">
            ✦ Tus Chats
          </h2>
          <button
            onClick={handleNewChat}
            className="w-full px-4 py-3 bg-mystic-accent text-mystic-bg rounded-xl font-semibold
                     hover:bg-mystic-accent/90 transition-all shadow-lg shadow-mystic-accent/30
                     flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Chat
          </button>
        </div>

        {/* Lista de chats */}
        <div className="flex-1 overflow-y-auto scroll-custom p-2">
          {chats.length === 0 ? (
            <div className="text-center py-8 px-4">
              <p className="text-mystic-cream/50 text-sm">
                No hay chats guardados aún
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`
                    group relative p-3 rounded-xl cursor-pointer transition-all
                    ${currentChatId === chat.id
                      ? 'bg-mystic-accent/20 border-2 border-mystic-accent'
                      : 'bg-mystic-bg/50 border-2 border-mystic-bg hover:border-mystic-accent/30'
                    }
                  `}
                >
                  {/* Nombre del chat */}
                  <div className="pr-8">
                    <h3 className="text-sm font-semibold text-mystic-cream truncate">
                      {getChatDisplayName(chat)}
                    </h3>
                    <p className="text-xs text-mystic-cream/50 mt-1">
                      {formatChatDate(chat.lastUpdated)}
                    </p>
                    {chat.messages.length > 0 && (
                      <p className="text-xs text-mystic-cream/40 mt-1">
                        {chat.messages.length} mensajes
                      </p>
                    )}
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-mystic-bg/80
                             opacity-0 group-hover:opacity-100 transition-opacity
                             hover:bg-red-500/20 hover:text-red-400"
                    aria-label="Eliminar chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-mystic-accent/20">
          <p className="text-xs text-mystic-cream/40 text-center">
            Tus chats se guardan localmente
          </p>
        </div>
      </div>
    </>
  )
}

export default ChatHistory
