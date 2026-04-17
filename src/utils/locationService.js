/**
 * Servicio de geocoding usando Nominatim de OpenStreetMap (gratis, sin API key)
 */

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org'
const USER_AGENT = 'ZodiacChatApp/1.0' // Required by Nominatim

/**
 * Convierte nombre de ciudad a coordenadas lat/lon
 * @param {string} cityName - Nombre de la ciudad
 * @returns {Promise<Object>} - { latitude, longitude, displayName }
 */
export async function geocodeCity(cityName) {
  const url = `${NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT }
    })

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor de geocoding')
    }

    const data = await response.json()

    if (data.length === 0) {
      throw new Error('Ciudad no encontrada')
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name
    }
  } catch (error) {
    console.error('Error en geocoding:', error)
    throw new Error('No se pudo encontrar la ubicación. Verifica el nombre de la ciudad.')
  }
}

/**
 * Busca ciudades para autocomplete
 * @param {string} query - Query de búsqueda (mínimo 3 caracteres)
 * @returns {Promise<Array>} - Array de resultados con formato { displayName, lat, lon }
 */
export async function searchCities(query) {
  if (query.length < 3) return []

  const url = `${NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT }
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    return data.map(item => ({
      displayName: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      // Información adicional para mejor UX
      city: item.address?.city || item.address?.town || item.address?.village || '',
      country: item.address?.country || ''
    }))
  } catch (error) {
    console.error('Error buscando ciudades:', error)
    return []
  }
}
