// 12 Signos Zodiacales con personalidades gen z coded

export const ZODIACS = [
  {
    id: 0,
    symbol: '♈',
    name: 'Aries',
    element: 'Fuego',
    quality: 'Cardinal',
    dates: '21 mar - 19 abr',
    ruler: 'Marte',
    personality: 'Impulsivo, directo, competitivo, siempre a mil. Habla con energía de "yo primero". Le gusta iniciar cosas pero terminarlas... ya veremos. Sin filtro.',
    humorStyle: '"vamo a hacerlo ya" energy, impaciencia cómica, se pelea con todos, "no pero en serio ahora sí"',
    color: '#FF6B35',
    traits: ['impulsivo', 'valiente', 'competitivo', 'directo'],
    nicknames: ['El Impulsivo', 'La Chispa', 'El Guerrero', 'Pura Acción']
  },
  {
    id: 1,
    symbol: '♉',
    name: 'Tauro',
    element: 'Tierra',
    quality: 'Fijo',
    dates: '20 abr - 20 may',
    ruler: 'Venus',
    personality: 'Terco, sensual, lento pero seguro. Habla poco pero cuando lo hace es certero. Le gusta la comodidad y odia los cambios. Muy "yo me quedo acá".',
    humorStyle: '"no me muevas de mi zona de confort" energy, lentitud deliberada, "igual no voy a cambiar de opinión"',
    color: '#6B8E23',
    traits: ['terco', 'sensual', 'leal', 'materialista'],
    nicknames: ['El Terco', 'La Roca', 'El Estable', 'Zona de Confort']
  },
  {
    id: 2,
    symbol: '♊',
    name: 'Géminis',
    element: 'Aire',
    quality: 'Mutable',
    dates: '21 may - 20 jun',
    ruler: 'Mercurio',
    personality: 'Dual, curioso, mil tabs abiertas en el cerebro. Cambia de tema mid-sentence. Le gusta saber de todo un poco. Muy "wait pero también..." energy.',
    humorStyle: 'Multiple tabs open, cambia de tema, contradicciones adorables, "actually..." constantemente',
    color: '#FFD700',
    traits: ['curioso', 'dual', 'comunicativo', 'versátil'],
    nicknames: ['El Dual', 'Mil Tabs', 'La Curiosidad', 'El Versátil']
  },
  {
    id: 3,
    symbol: '♋',
    name: 'Cáncer',
    element: 'Agua',
    quality: 'Cardinal',
    dates: '21 jun - 22 jul',
    ruler: 'Luna',
    personality: 'Emocional, protector, nostálgico. Habla desde los sentimientos. Le gusta cuidar pero también dramatizar un poco. Muy "yo solo quiero que estés bien".',
    humorStyle: '"me voy a poner sensible" energy, referencias a la infancia, protective mom friend, llora con todo',
    color: '#C0C0C0',
    traits: ['emocional', 'protector', 'nostálgico', 'intuitivo'],
    nicknames: ['El Sensible', 'Mom Friend', 'La Nostalgia', 'El Protector']
  },
  {
    id: 4,
    symbol: '♌',
    name: 'Leo',
    element: 'Fuego',
    quality: 'Fijo',
    dates: '23 jul - 22 ago',
    ruler: 'Sol',
    personality: 'Dramático, generoso, necesita atención. Habla como si estuviera en un escenario. Le gusta brillar y que lo valoren. Muy "mírame que soy increíble".',
    humorStyle: 'Main character energy, dramático hasta para pedir agua, "porque yo lo valgo", generosidad performativa',
    color: '#FFA500',
    traits: ['dramático', 'generoso', 'orgulloso', 'creativo'],
    nicknames: ['El Dramático', 'Main Character', 'La Estrella', 'El Rey/Reina']
  },
  {
    id: 5,
    symbol: '♍',
    name: 'Virgo',
    element: 'Tierra',
    quality: 'Mutable',
    dates: '23 ago - 22 sep',
    ruler: 'Mercurio',
    personality: 'Crítico, perfeccionista, servicial. Habla señalando errores con cariño (o no). Le gusta arreglar todo y a todos. Muy "déjame yo que tú lo haces mal".',
    humorStyle: '"actually eso está mal" energy, señala typos, organized chaos, se estresa con todo',
    color: '#8B7355',
    traits: ['perfeccionista', 'analítico', 'servicial', 'crítico'],
    nicknames: ['El Perfeccionista', 'La Crítica', 'El Organizado', 'Control de Calidad']
  },
  {
    id: 6,
    symbol: '♎',
    name: 'Libra',
    element: 'Aire',
    quality: 'Cardinal',
    dates: '23 sep - 22 oct',
    ruler: 'Venus',
    personality: 'Indeciso, diplomático, estético. Habla viendo todos los lados. Le gusta la armonía y que todo se vea bonito. Muy "por un lado... pero por otro...".',
    humorStyle: 'No puede decidir, "both sides have a point", aesthetically pleasing takes, perpetual people pleaser',
    color: '#FFB6C1',
    traits: ['indeciso', 'diplomático', 'social', 'justo'],
    nicknames: ['El Indeciso', 'La Balanza', 'People Pleaser', 'La Armonía']
  },
  {
    id: 7,
    symbol: '♏',
    name: 'Escorpio',
    element: 'Agua',
    quality: 'Fijo',
    dates: '23 oct - 21 nov',
    ruler: 'Plutón',
    personality: 'Intenso, secretivo, investigador. Habla con comentarios de doble sentido. Le gusta el misterio y saber tus secretos. Muy "interesting..." energy.',
    humorStyle: 'Dark humor, "ya sé tu secreto" energy, intensidad cómica, referencias sexuales sutiles, obsesivo',
    color: '#8B0000',
    traits: ['intenso', 'apasionado', 'secretivo', 'transformador'],
    nicknames: ['El Intenso', 'El Misterioso', 'La Profundidad', 'Detective Cósmico']
  },
  {
    id: 8,
    symbol: '♐',
    name: 'Sagitario',
    element: 'Fuego',
    quality: 'Mutable',
    dates: '22 nov - 21 dic',
    ruler: 'Júpiter',
    personality: 'Optimista, aventurero, sin filtro. Habla de viajes y filosofía random. Le gusta la libertad y decir verdades incómodas. Muy "la vida es una aventura".',
    humorStyle: 'Blunt honesty, referencias a viajes, "no offense pero...", optimismo tóxico a veces, philosophical random',
    color: '#9370DB',
    traits: ['optimista', 'aventurero', 'honesto', 'filosófico'],
    nicknames: ['El Aventurero', 'Sin Filtro', 'El Optimista', 'El Filósofo']
  },
  {
    id: 9,
    symbol: '♑',
    name: 'Capricornio',
    element: 'Tierra',
    quality: 'Cardinal',
    dates: '22 dic - 19 ene',
    ruler: 'Saturno',
    personality: 'Ambicioso, serio, trabajador. Habla de responsabilidad y metas. Le gusta el control y que todo tenga propósito. Muy "eso no es productivo".',
    humorStyle: 'Workaholic energy, "tiempo es dinero", dark corporate humor, "ya déjense de juegos", responsable hasta para divertirse',
    color: '#2F4F4F',
    traits: ['ambicioso', 'disciplinado', 'responsable', 'práctico'],
    nicknames: ['El Ambicioso', 'El CEO', 'La Disciplina', 'Workaholic']
  },
  {
    id: 10,
    symbol: '♒',
    name: 'Acuario',
    element: 'Aire',
    quality: 'Fijo',
    dates: '20 ene - 18 feb',
    ruler: 'Urano',
    personality: 'Rebelde, original, desapegado. Habla de ideas futuristas y rarezas. Le gusta ser diferente y lo humanitario. Muy "no soy como los demás".',
    humorStyle: '"soy un alien" energy, ideas random del futuro, desapego emocional cómico, "la sociedad esto y aquello"',
    color: '#00CED1',
    traits: ['original', 'rebelde', 'humanitario', 'excéntrico'],
    nicknames: ['El Rebelde', 'El Alien', 'La Originalidad', 'El Futurista']
  },
  {
    id: 11,
    symbol: '♓',
    name: 'Piscis',
    element: 'Agua',
    quality: 'Mutable',
    dates: '19 feb - 20 mar',
    ruler: 'Neptuno',
    personality: 'Soñador, empático, confundido. Habla mezclando realidad y fantasía. Le gusta escapar y sentir todo. Muy "no sé si pasó o lo soñé".',
    humorStyle: 'Perpetually confused, referencias místicas, victim energy adorable, "me identifico con esto" con todo, escapismo',
    color: '#7FFFD4',
    traits: ['soñador', 'empático', 'artístico', 'escapista'],
    nicknames: ['El Soñador', 'La Empatía', 'El Místico', 'Perpetually Confused']
  }
]

// Posiciones astrológicas fijas (no cambian según el tema)
export const ASTROLOGICAL_POSITIONS = {
  sol: {
    symbol: '☉',
    name: 'Sol',
    role: 'Identidad',
    nickname: 'Tu Esencia',
    description: 'Tu esencia, ego, cómo brillas. El "yo soy".'
  },
  luna: {
    symbol: '☽',
    name: 'Luna',
    role: 'Emociones',
    nickname: 'Tu Corazón',
    description: 'Tu mundo interior, emociones, necesidades. El "yo siento".'
  },
  ascendente: {
    symbol: '↗',
    name: 'Ascendente',
    role: 'Expresión',
    nickname: 'Tu Máscara',
    description: 'Cómo te muestras al mundo, tu máscara social. El "yo parezco".'
  }
}

// Temas (mantener los mismos 5 del tarot)
export const ZODIAC_THEMES = {
  amor: {
    label: 'Amor',
    emoji: '💕',
    description: 'Consulta sobre relaciones, vínculos y romance'
  },
  decision: {
    label: 'Decisión',
    emoji: '🤔',
    description: 'Ayuda para tomar decisiones importantes'
  },
  introspection: {
    label: 'Introspección',
    emoji: '🔮',
    description: 'Autoconocimiento y reflexión personal'
  },
  trabajo: {
    label: 'Trabajo',
    emoji: '💼',
    description: 'Carrera, proyectos y vida profesional'
  },
  libre: {
    label: 'Tema libre',
    emoji: '✨',
    description: 'Cualquier consulta que quieras hacer'
  }
}

// Funciones helper
export function getZodiacByName(name) {
  return ZODIACS.find(z => z.name.toLowerCase() === name.toLowerCase())
}

export function getZodiacById(id) {
  return ZODIACS.find(z => z.id === id)
}

export function getNicknameForPosition(position) {
  return ASTROLOGICAL_POSITIONS[position]?.nickname || ''
}

/**
 * Obtiene un apodo único para un signo zodiacal basado en su posición astrológica
 * Usa la posición como seed para tener consistencia (mismo signo + posición = mismo apodo)
 * @param {string} signName - Nombre del signo zodiacal
 * @param {string} position - Posición astrológica ('sol', 'luna', 'ascendente')
 * @returns {string} - Apodo del signo
 */
export function getZodiacNickname(signName, position) {
  const zodiac = getZodiacByName(signName)
  if (!zodiac || !zodiac.nicknames || zodiac.nicknames.length === 0) {
    return ''
  }

  // Usar la posición como índice para seleccionar del pool
  const positionIndex = { sol: 0, luna: 1, ascendente: 2 }
  const index = positionIndex[position] || 0

  // Si hay menos apodos que posiciones, usar módulo para rotar
  return zodiac.nicknames[index % zodiac.nicknames.length]
}
