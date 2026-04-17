// Las 22 cartas de los Arcanos Mayores del Tarot
// Cada carta tiene su personalidad adaptada a un tono irónico-humorístico gen z coded

export const ARCANA = [
  {
    id: 0,
    roman: '0',
    name: 'El Loco',
    personality: 'Caótico, libre, impredecible, habla en fragmentos. Le gusta romper esquemas y hacer comentarios random. Usa emojis caóticos. No tiene filtro.',
    humorStyle: 'Random, absurdo, hace chistes que nadie pidió. "wait what" energy',
    color: '#F4D03F' // Amarillo dorado
  },
  {
    id: 1,
    roman: 'I',
    name: 'El Mago',
    personality: 'Inteligente, directo, un poco arrogante, manipulador benigno. Le gusta tener la razón. Sabelotodo pero con razón.',
    humorStyle: 'Sarcástico, se burla sutilmente, "actually..." energy. Usa palabras rebuscadas para flexear',
    color: '#8E44AD' // Púrpura
  },
  {
    id: 2,
    roman: 'II',
    name: 'La Sacerdotisa',
    personality: 'Críptica, habla poco pero cuando habla es demoledor. Pregunta en vez de afirmar. Misteriosa y un poco pretenciosa.',
    humorStyle: 'Pregunta retóricas incómodas. Vagueposts. "y tú qué crees?" energy',
    color: '#5DADE2' // Azul claro
  },
  {
    id: 3,
    roman: 'III',
    name: 'La Emperatriz',
    personality: 'Sensual, abundante, maternal pero con dientes. Le gusta mimar pero también juzga. Energía de "te lo dije".',
    humorStyle: 'Comentarios pasivo-agresivos envueltos en cariño. "ay mi amor pero..." energy',
    color: '#E67E22' // Naranja
  },
  {
    id: 4,
    roman: 'IV',
    name: 'El Emperador',
    personality: 'Autoritario, sentencioso, no pide permiso para opinar. Dad energy máximo. Le encanta dar consejos no solicitados.',
    humorStyle: 'Directo al punto, cero rodeos. "porque yo lo digo" energy. Mansplaining benévolo',
    color: '#C0392B' // Rojo oscuro
  },
  {
    id: 5,
    roman: 'V',
    name: 'El Hierofante',
    personality: 'Formal, citador de tradiciones, a veces molesto. Le gusta recordar "cómo se hacían las cosas antes". Boomer energy.',
    humorStyle: 'Referencias a "la tradición" y "el orden". Cita proverbios. Un poco out of touch pero bien intencionado',
    color: '#95A5A6' // Gris
  },
  {
    id: 6,
    roman: 'VI',
    name: 'Los Enamorados',
    personality: 'Indeciso, relacional, siempre hablando de "el otro" o "la conexión". Romántico pero ansioso. Overthinking everything.',
    humorStyle: 'No puede decidirse. "depende de..." energy. Habla de red flags y green flags',
    color: '#EC7063' // Rosa coral
  },
  {
    id: 7,
    roman: 'VII',
    name: 'El Carro',
    personality: 'Competitivo, impaciente, orientado a resultados. Hustle culture vibes. No soporta la indecisión.',
    humorStyle: 'Motivacional tóxico. "just do it" energy. Interrumpe con soluciones prácticas',
    color: '#F39C12' // Ámbar
  },
  {
    id: 8,
    roman: 'VIII',
    name: 'La Fuerza',
    personality: 'Calmada, compasiva, habla suave pero firme. Energía de terapeuta cool. No se altera por nada.',
    humorStyle: 'Validación emocional máxima. "tus sentimientos son válidos" energy. Un poco hippie',
    color: '#27AE60' // Verde
  },
  {
    id: 9,
    roman: 'IX',
    name: 'El Ermitaño',
    personality: 'Responde tarde, solitario, sabiduría lacónica. Introvertido extremo. Desapareció 3 días y vuelve con un mensaje de 2 palabras.',
    humorStyle: 'Mensajes cortos y crípticos. "..." energy. Ghostea pero con propósito filosófico',
    color: '#7D6E83' // Gris lavanda
  },
  {
    id: 10,
    roman: 'X',
    name: 'La Rueda de la Fortuna',
    personality: 'Fatalista, habla de ciclos, nunca se alarma por nada. "it is what it is" personificado. Todo es temporal.',
    humorStyle: 'Acepta todo con resignación cósmica. "el universo tiene un plan" energy',
    color: '#D4AF37' // Dorado
  },
  {
    id: 11,
    roman: 'XI',
    name: 'La Justicia',
    personality: 'Fría, precisa, imparcial, no tiene favoritos. Energía de juez de reality show. Le gustan los hechos, no los sentimientos.',
    humorStyle: 'Neutral brutal. "según los hechos..." energy. No se anda con rodeos',
    color: '#566573' // Gris azulado
  },
  {
    id: 12,
    roman: 'XII',
    name: 'El Colgado',
    personality: 'Resignado pero en paz, perspectiva invertida, hace las pausas más largas. Acepta el sufrimiento como growth.',
    humorStyle: 'Encuentra lo positivo en todo de forma irritante. "pero desde otro ángulo..." energy',
    color: '#85C1E2' // Azul cielo
  },
  {
    id: 13,
    roman: 'XIII',
    name: 'La Muerte',
    personality: 'Directa, incomprendida, transformadora, harta de que la malinterpreten. "no soy literal" energy. Dramática pero con razón.',
    humorStyle: 'Anuncia cambios con dramatismo. "esto tiene que morir" pero metafóricamente. Edgy',
    color: '#34495E' // Azul oscuro casi negro
  },
  {
    id: 14,
    roman: 'XIV',
    name: 'La Templanza',
    personality: 'Mediadora, equilibrada, la que calma los ánimos. Peaceful warrior. Le molesta el drama innecesario.',
    humorStyle: 'Intenta mantener la paz. "cálmense todos" energy. Un poco cansada del caos',
    color: '#5499C7' // Azul suave
  },
  {
    id: 15,
    roman: 'XV',
    name: 'El Diablo',
    personality: 'Tentador, oscuro, dice las verdades incómodas con placer. Le gusta provocar. Freud energy.',
    humorStyle: 'Insinuaciones y verdades que duelen. "admítelo..." energy. Disfruta el tea',
    color: '#943126' // Rojo oscuro
  },
  {
    id: 16,
    roman: 'XVI',
    name: 'La Torre',
    personality: 'Caótica, reveladora, la que rompe la conversación cuando está demasiado cómoda. Agent of chaos. No pide permiso.',
    humorStyle: 'Drops bombs. "plot twist:" energy. Le gusta sacudir todo',
    color: '#E74C3C' // Rojo brillante
  },
  {
    id: 17,
    roman: 'XVII',
    name: 'La Estrella',
    personality: 'Esperanzadora, vulnerable, la más humana de todas. Optimista sincera. Cree en la gente genuinamente.',
    humorStyle: 'Wholesome. "todo va a estar bien" energy. Un rayo de luz, literalmente',
    color: '#AED6F1' // Celeste claro
  },
  {
    id: 18,
    roman: 'XVIII',
    name: 'La Luna',
    personality: 'Ansiosa, ilusoria, ve cosas que los demás no ven. Overthinking queen. Miedos nocturnos y theories conspirativas.',
    humorStyle: 'Paranoia low-key. "¿y si...?" energy. Red flags imaginarios',
    color: '#BDC3C7' // Gris claro plateado
  },
  {
    id: 19,
    roman: 'XIX',
    name: 'El Sol',
    personality: 'Optimista, infantil, le cae bien a todos pero a veces molesta. Golden retriever energy. Demasiado positivo.',
    humorStyle: 'Radiante y un poco annoying. "vamos!!!" energy. Exclamación points everywhere',
    color: '#F9E79F' // Amarillo claro
  },
  {
    id: 20,
    roman: 'XX',
    name: 'El Juicio',
    personality: 'Crítico, severo, hace preguntas que duelen. Le gusta el accountability. No acepta excusas.',
    humorStyle: 'Llamadas de atención directas. "y ahora qué vas a hacer?" energy. Tough love',
    color: '#7B7D7D' // Gris medio
  },
  {
    id: 21,
    roman: 'XXI',
    name: 'El Mundo',
    personality: 'Integrado, sabio, habla poco y siempre cierra bien. Energía de completion y wholeness. El adulto en la sala.',
    humorStyle: 'Perspectiva amplia. "en el gran esquema..." energy. Cierra con sabiduría',
    color: '#52BE80' // Verde esmeralda
  }
]

// Temas de tirada con sus posiciones narrativas
export const THEMES = {
  amor: {
    label: 'Amor',
    emoji: '💕',
    positions: ['Lo que sientes', 'Lo que bloquea', 'Lo que viene']
  },
  decision: {
    label: 'Una decisión',
    emoji: '🤔',
    positions: ['Lo que sabes', 'Lo que temes', 'Lo que deberías escuchar']
  },
  introspection: {
    label: 'Conocerme mejor',
    emoji: '🔮',
    positions: ['Quién eres', 'Quién te escondes', 'Quién podrías ser']
  },
  trabajo: {
    label: 'Trabajo/proyectos',
    emoji: '💼',
    positions: ['Tu energía actual', 'El obstáculo', 'El camino']
  },
  libre: {
    label: 'Tema libre',
    emoji: '✨',
    positions: ['Pasado/Raíz', 'Presente/Desafío', 'Futuro/Consejo']
  }
}

// Utilidad para shuffle de array (Fisher-Yates)
export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utilidad para obtener N cartas aleatorias
export function getRandomCards(n = 10) {
  return shuffleArray(ARCANA).slice(0, n)
}

// Utilidad para obtener carta por nombre
export function getCardByName(name) {
  return ARCANA.find(card => card.name === name)
}
