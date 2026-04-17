// Llamadas a Claude API a través de nuestro serverless function (para evitar CORS)

// En desarrollo usa el endpoint local de Vercel dev
// En producción usa el endpoint deployado
const API_ENDPOINT = import.meta.env.DEV
  ? '/api/chat'  // Desarrollo local con Vercel dev
  : '/api/chat'  // Producción (Vercel automáticamente maneja /api/*)

export async function generateChatMessages(prompt) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Mensaje de error más específico
      if (response.status === 500 && errorData.details?.includes('API key no configurada')) {
        throw new Error('⚠️ API key no configurada. Por favor configura ANTHROPIC_API_KEY en Vercel o en tu archivo .env')
      }

      throw new Error(errorData.error || `Error del servidor: ${response.status}`)
    }

    const data = await response.json()

    // Extraer el contenido de texto de la respuesta
    const textContent = data.content[0].text

    // Intentar parsear el JSON
    // Claude a veces incluye markdown, así que buscamos el JSON array
    const jsonMatch = textContent.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('Respuesta de Claude:', textContent)
      throw new Error('La respuesta de Claude no contiene un array JSON válido')
    }

    const messages = JSON.parse(jsonMatch[0])

    // Validar que sea un array y tenga mensajes
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('La respuesta no es un array válido de mensajes')
    }

    // Validar estructura de cada mensaje
    messages.forEach((msg, idx) => {
      if (!msg.sender || !msg.text) {
        throw new Error(`Mensaje ${idx} inválido: falta sender o text`)
      }
    })

    return messages

  } catch (error) {
    console.error('Error en generateChatMessages:', error)
    throw error
  }
}

// Función helper para generar timestamp actual
export function getCurrentTimestamp() {
  return new Date().toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
