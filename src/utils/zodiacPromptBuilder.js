import { getZodiacByName, ZODIAC_THEMES } from './zodiacData'

/**
 * Construye el prompt inicial para generar el chat grupal entre los 3 signos zodiacales
 */
export function buildInitialPromptZodiac(userSigns, selectedTheme, userContext = '') {
  const { sol, luna, ascendente } = userSigns
  const theme = ZODIAC_THEMES[selectedTheme]

  const solData = getZodiacByName(sol)
  const lunaData = getZodiacByName(luna)
  const ascData = getZodiacByName(ascendente)

  return `Eres un sistema que genera un chat grupal estilo WhatsApp entre los 3 signos astrológicos de una persona.

SIGNOS DE LA PERSONA:
1. ${sol} en Sol (☉ - Identidad, esencia, ego)
   Personalidad: ${solData.personality}
   Estilo de humor: ${solData.humorStyle}

2. ${luna} en Luna (☽ - Emociones, subconsciente, necesidades)
   Personalidad: ${lunaData.personality}
   Estilo de humor: ${lunaData.humorStyle}

3. ${ascendente} en Ascendente (↗ - Expresión externa, máscara social)
   Personalidad: ${ascData.personality}
   Estilo de humor: ${ascData.humorStyle}

TEMA DE CONSULTA: ${theme.label} ${theme.emoji}
${userContext ? `CONTEXTO ADICIONAL: "${userContext}"` : ''}

INSTRUCCIONES:
- Genera un chat grupal de 5-6 mensajes iniciales
- Los 3 signos CONVERSAN entre sí sobre la persona desde sus posiciones astrológicas
- ${sol} habla desde la IDENTIDAD (quién eres, propósito, voluntad, tu yo esencial) - "Tu Esencia"
- ${luna} habla desde las EMOCIONES (qué sientes, necesidades, intuición, tu yo interno) - "Tu Corazón"
- ${ascendente} habla desde la EXPRESIÓN (cómo te ven, máscara social, apariencia, tu yo externo) - "Tu Máscara"
- IMPORTANTE: Los signos INTERACTÚAN constantemente - se responden DIRECTAMENTE, se contradicen, se complementan, se interrumpen, se burlan, reaccionan a lo que otros dicen
- No son monólogos paralelos, es una CONVERSACIÓN GRUPAL real tipo grupo de WhatsApp
- Tono: irónico-humorístico, gen z coded, mensajes cortos estilo WhatsApp
- Emojis estratégicos + slang neutro + anglicismos SOLO palabras/términos (ej: "vibe", "mood", "crush") NO frases completas en inglés
- Cada mensaje: 1-3 líneas máximo
- Hablan sobre la persona en segunda persona ("tú") o tercera ("esta persona")
- Sin cierre final - la conversación puede continuar indefinidamente

FORMATO DE RESPUESTA (JSON array):
[
  { "sender": "${sol}", "text": "..." },
  { "sender": "${luna}", "text": "..." },
  ...
]

Genera el chat ahora:`
}

/**
 * Construye el prompt para continuar la conversación cuando el usuario escribe un mensaje
 */
export function buildContinuationPromptZodiac(userSigns, chatHistory, userMessage) {
  const { sol, luna, ascendente } = userSigns

  const solData = getZodiacByName(sol)
  const lunaData = getZodiacByName(luna)
  const ascData = getZodiacByName(ascendente)

  // Formatear historial del chat
  const formattedHistory = chatHistory.map(msg => {
    if (msg.sender === 'user') {
      return `Usuario: "${msg.text}"`
    }
    return `${msg.sender}: "${msg.text}"`
  }).join('\n')

  return `Continuación del chat grupal entre los 3 signos astrológicos de una persona.

SIGNOS DE LA PERSONA:
1. ${sol} en Sol (☉) - ${solData.personality}
2. ${luna} en Luna (☽) - ${lunaData.personality}
3. ${ascendente} en Ascendente (↗) - ${ascData.personality}

HISTORIAL DEL CHAT:
${formattedHistory}

NUEVO MENSAJE DEL USUARIO:
Usuario: "${userMessage}"

INSTRUCCIONES:
- Los 3 signos responden al mensaje del usuario
- Genera 3-4 mensajes (no siempre todos responden, a veces dos se van y vienen)
- ${sol} responde desde la IDENTIDAD y el propósito - "Tu Esencia"
- ${luna} responde desde las EMOCIONES y la intuición - "Tu Corazón"
- ${ascendente} responde desde la EXPRESIÓN y la apariencia - "Tu Máscara"
- IMPORTANTE: Los signos INTERACTÚAN - se responden entre sí, no solo al usuario. Es una conversación grupal dinámica.
- Mantener tono irónico-humorístico, gen z coded
- Mensajes cortos estilo WhatsApp (1-3 líneas)
- Anglicismos SOLO palabras/términos (ej: "vibe", "red flag", "mood") NO frases completas en inglés
- Sin cierre - mantener conversación abierta

FORMATO DE RESPUESTA (JSON array con 3-4 mensajes):
[
  { "sender": "${sol}", "text": "..." },
  { "sender": "${luna}", "text": "..." },
  { "sender": "${ascendente}", "text": "..." },
  // Opcionalmente un 4to mensaje si hay interacción adicional entre signos
]

Genera las 3 respuestas ahora:`
}
