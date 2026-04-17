// Google Analytics 4 - Event Tracking

/**
 * Envía un evento a Google Analytics
 * @param {string} eventName - Nombre del evento
 * @param {Object} params - Parámetros adicionales del evento
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Eventos específicos de Zodiac Chat

export function trackThemeSelected(theme) {
  trackEvent('theme_selected', {
    theme_name: theme
  })
}

export function trackInputMethodSelected(method) {
  trackEvent('input_method_selected', {
    method: method // 'manual' o 'calculate'
  })
}

export function trackSignsSelected(signs) {
  trackEvent('signs_selected', {
    sol: signs.sol,
    luna: signs.luna,
    ascendente: signs.ascendente
  })
}

export function trackChatStarted(userSigns, theme) {
  trackEvent('chat_started', {
    sol: userSigns.sol,
    luna: userSigns.luna,
    ascendente: userSigns.ascendente,
    theme: theme
  })
}

export function trackMessageSent() {
  trackEvent('user_message_sent')
}

export function trackNewChatCreated() {
  trackEvent('new_chat_created')
}

export function trackChatDeleted() {
  trackEvent('chat_deleted')
}

export function trackChatSwitched() {
  trackEvent('chat_switched')
}

export function trackShareButtonClicked() {
  trackEvent('share_button_clicked')
}

export function trackScreenshotGenerated() {
  trackEvent('screenshot_generated')
}
