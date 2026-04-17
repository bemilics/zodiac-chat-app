import { Origin, Horoscope } from 'circular-natal-horoscope-js'

/**
 * Calcula los signos astrológicos (Sol, Luna, Ascendente) a partir de datos de nacimiento
 * @param {Object} birthData - Datos de nacimiento
 * @param {Date} birthData.date - Fecha de nacimiento
 * @param {Object} birthData.time - Hora de nacimiento (opcional)
 * @param {number} birthData.time.hour - Hora (0-23)
 * @param {number} birthData.time.minute - Minutos (0-59)
 * @param {number} birthData.latitude - Latitud del lugar de nacimiento
 * @param {number} birthData.longitude - Longitud del lugar de nacimiento
 * @returns {Object} - { sol, luna, ascendente, warnings }
 */
export async function calculateSigns(birthData) {
  const { date, time, latitude, longitude } = birthData
  const warnings = []

  // Valores por default si faltan datos
  const hour = time?.hour ?? 12
  const minute = time?.minute ?? 0
  const lat = latitude ?? 0
  const lon = longitude ?? 0

  // Agregar warnings si se aproximaron valores
  if (!time || time.hour === undefined) {
    warnings.push('Sin hora exacta, el Ascendente será aproximado (usando 12:00 mediodía)')
  }
  if (!latitude || !longitude) {
    warnings.push('Sin lugar exacto, el Ascendente será aproximado (usando coordenadas 0,0)')
  }

  try {
    const origin = new Origin({
      year: date.getFullYear(),
      month: date.getMonth(), // 0-11 (0 = January, 11 = December)
      date: date.getDate(),
      hour: hour,
      minute: minute,
      latitude: lat,
      longitude: lon
    })

    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor"],
      customOrbs: {},
      language: 'en'
    })

    return {
      sol: getZodiacNameFromDegrees(horoscope.CelestialBodies.sun.ChartPosition.Ecliptic.DecimalDegrees),
      luna: getZodiacNameFromDegrees(horoscope.CelestialBodies.moon.ChartPosition.Ecliptic.DecimalDegrees),
      ascendente: getZodiacNameFromDegrees(horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees),
      warnings
    }
  } catch (error) {
    console.error('Error calculando signos:', error)
    throw new Error('No se pudieron calcular los signos astrológicos. Por favor verifica los datos ingresados.')
  }
}

/**
 * Convierte grados eclípticos a nombre de signo zodiacal
 * @param {number} degrees - Grados eclípticos (0-360)
 * @returns {string} - Nombre del signo zodiacal
 */
function getZodiacNameFromDegrees(degrees) {
  // Normalizar a 0-360
  const normalizedDegrees = ((degrees % 360) + 360) % 360

  // 0-30: Aries, 30-60: Tauro, etc.
  const signs = [
    'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
    'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
  ]

  const index = Math.floor(normalizedDegrees / 30)
  return signs[index]
}
