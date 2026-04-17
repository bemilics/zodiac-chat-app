// Construcción de prompts para Claude API

export function buildInitialPrompt(selectedCards, themePositions, selectedTheme, optionalContext) {
  const cardsInfo = selectedCards.map((card, idx) => `
  ${idx + 1}. ${card.name} (Posición: "${themePositions[idx]}")
     Personalidad: ${card.personality}
     Estilo de humor: ${card.humorStyle}
  `).join('\n')

  return `Eres un generador de conversaciones para una app de tarot interactiva y humorística.

CONTEXTO DE LA TIRADA:
- Tema elegido: ${selectedTheme}
- Posiciones narrativas: ${themePositions.join(' / ')}
- Cartas sorteadas:
${cardsInfo}
${optionalContext ? `\n- Contexto adicional del usuario: "${optionalContext}"` : ''}

INSTRUCCIONES:
Genera un chat grupal estilo WhatsApp donde estas 3 cartas debaten sobre el usuario basándose en el tema de la tirada y sus posiciones.

REGLAS ESTRICTAS:
1. Tono IRÓNICO-HUMORÍSTICO, gen z coded
2. Usar emojis estratégicamente (no en todos los mensajes)
3. Slang neutro en español + 1-2 anglicismos sutiles por carta (ej: "literally", "mood", "cringe")
4. Las cartas se responden entre sí, se contradicen, se complementan, se burlan sutilmente
5. Mensajes CORTOS: 1-3 líneas máximo por mensaje (estilo WhatsApp real)
6. Cada carta habla desde:
   - Su personalidad arquetípica (ver arriba)
   - Su posición en la tirada
   - Su estilo de humor único
7. Total: 8-12 mensajes
8. SIN cierre definitivo - la conversación debe poder continuar
9. Las cartas deben hacer comentarios SOBRE EL USUARIO basados en el tema (no hablar en abstracto)
10. Algunos mensajes pueden ser reacciones cortas tipo "jaja no", "literal", "ok pero...", "👀"

IMPORTANTE: Las cartas NO conocen al usuario personalmente, pero hacen observaciones basadas en:
- El tema que eligió consultar
- Su posición en la tirada
- El contexto opcional si lo dio

FORMATO DE RESPUESTA:
Devuelve SOLO un array JSON válido con esta estructura exacta:
[
  {"sender": "El Loco", "text": "mensaje aquí", "timestamp": "12:34"},
  {"sender": "La Muerte", "text": "otro mensaje", "timestamp": "12:34"},
  ...
]

CRÍTICO:
- NO incluyas ningún texto antes o después del JSON. SOLO el array.
- Los nombres en "sender" deben ser EXACTAMENTE como aparecen arriba
- Los timestamps pueden variar en minutos para simular conversación natural
- Mínimo 8 mensajes, máximo 12 mensajes

Genera el chat ahora:`
}

export function buildContinuationPrompt(selectedCards, themePositions, chatHistory, userMessage) {
  const cardsInfo = selectedCards.map((card, idx) => `
  ${idx + 1}. ${card.name} (Posición: "${themePositions[idx]}")
     Personalidad: ${card.personality}
     Estilo de humor: ${card.humorStyle}
  `).join('\n')

  const historyText = chatHistory.map(msg => {
    const sender = msg.sender === 'user' ? 'USUARIO' : msg.sender
    return `${sender}: ${msg.text}`
  }).join('\n')

  return `Contexto: Eres parte de un chat grupal de tarot donde estas 3 cartas están conversando con un usuario.

CARTAS EN EL CHAT:
${cardsInfo}

HISTORIAL PREVIO DEL CHAT:
${historyText}

NUEVO MENSAJE DEL USUARIO:
USUARIO: "${userMessage}"

INSTRUCCIONES:
Las 3 cartas (${selectedCards.map(c => c.name).join(', ')}) responden a este nuevo mensaje del usuario.

REGLAS:
- Cada carta envía 1 mensaje (total: 3 mensajes)
- Mantener el mismo tono irónico-humorístico del chat
- Mensajes cortos (1-3 líneas máx)
- Las cartas pueden:
  * Responder directamente al usuario
  * Reaccionar al comentario entre ellas
  * Hacer chistes o burlas ligeras
  * Dar consejos desde su perspectiva
- Usar emojis estratégicamente
- Mantener coherencia con sus personalidades y el historial previo

FORMATO DE RESPUESTA:
[
  {"sender": "${selectedCards[0].name}", "text": "respuesta carta 1", "timestamp": "12:35"},
  {"sender": "${selectedCards[1].name}", "text": "respuesta carta 2", "timestamp": "12:35"},
  {"sender": "${selectedCards[2].name}", "text": "respuesta carta 3", "timestamp": "12:36"}
]

CRÍTICO: SOLO devuelve el array JSON, sin texto adicional.

Genera las 3 respuestas ahora:`
}
