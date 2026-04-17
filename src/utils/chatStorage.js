// Sistema de almacenamiento local para múltiples chats de zodiac

const STORAGE_KEY = 'zodiac-chats'

/**
 * Genera un ID único para un chat
 */
function generateChatId() {
  return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Obtiene todos los datos de localStorage
 */
function getStorageData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { chats: {}, currentChatId: null }
  } catch (error) {
    console.error('Error leyendo localStorage:', error)
    return { chats: {}, currentChatId: null }
  }
}

/**
 * Guarda datos en localStorage
 */
function setStorageData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error guardando en localStorage:', error)
  }
}

/**
 * Crea un nuevo chat vacío
 * @returns {string} - ID del nuevo chat
 */
export function createNewChat() {
  const chatId = generateChatId()
  const data = getStorageData()

  data.chats[chatId] = {
    id: chatId,
    userSigns: null,
    selectedTheme: '',
    userContext: '',
    messages: [],
    createdAt: Date.now(),
    lastUpdated: Date.now()
  }

  data.currentChatId = chatId
  setStorageData(data)

  return chatId
}

/**
 * Guarda un chat completo
 * @param {string} chatId - ID del chat
 * @param {Object} chatData - Datos del chat
 */
export function saveChat(chatId, chatData) {
  const data = getStorageData()

  data.chats[chatId] = {
    ...chatData,
    id: chatId,
    lastUpdated: Date.now()
  }

  setStorageData(data)
}

/**
 * Carga un chat por ID
 * @param {string} chatId - ID del chat
 * @returns {Object|null} - Datos del chat o null si no existe
 */
export function loadChat(chatId) {
  const data = getStorageData()
  return data.chats[chatId] || null
}

/**
 * Obtiene todos los chats guardados
 * @returns {Array} - Array de chats ordenados por última actualización
 */
export function getAllChats() {
  const data = getStorageData()
  const chats = Object.values(data.chats)

  // Ordenar por última actualización (más reciente primero)
  return chats.sort((a, b) => b.lastUpdated - a.lastUpdated)
}

/**
 * Elimina un chat
 * @param {string} chatId - ID del chat a eliminar
 */
export function deleteChat(chatId) {
  const data = getStorageData()
  delete data.chats[chatId]

  // Si eliminamos el chat actual, seleccionar otro o null
  if (data.currentChatId === chatId) {
    const remainingChats = Object.keys(data.chats)
    data.currentChatId = remainingChats.length > 0 ? remainingChats[0] : null
  }

  setStorageData(data)
}

/**
 * Obtiene el ID del chat actual
 * @returns {string|null} - ID del chat actual
 */
export function getCurrentChatId() {
  const data = getStorageData()
  return data.currentChatId
}

/**
 * Establece el chat actual
 * @param {string} chatId - ID del chat
 */
export function setCurrentChatId(chatId) {
  const data = getStorageData()
  data.currentChatId = chatId
  setStorageData(data)
}

/**
 * Limpia todos los chats guardados
 */
export function clearAllChats() {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Genera un nombre descriptivo para el chat basado en sus datos
 * @param {Object} chat - Datos del chat
 * @returns {string} - Nombre descriptivo
 */
export function getChatDisplayName(chat) {
  if (!chat.userSigns) {
    return 'Nuevo chat'
  }

  const { sol, luna, ascendente } = chat.userSigns
  const theme = chat.selectedTheme || 'consulta'

  return `${sol}/${luna}/${ascendente} - ${theme}`
}

/**
 * Formatea la fecha de un chat
 * @param {number} timestamp - Timestamp del chat
 * @returns {string} - Fecha formateada
 */
export function formatChatDate(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  // Menos de 1 minuto
  if (diff < 60000) {
    return 'Hace un momento'
  }

  // Menos de 1 hora
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `Hace ${minutes} min`
  }

  // Menos de 24 horas
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `Hace ${hours}h`
  }

  // Mismo año
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString('es', { day: 'numeric', month: 'short' })
  }

  // Otro año
  return date.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
}
