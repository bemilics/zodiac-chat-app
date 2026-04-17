import { useState } from 'react'
import { calculateSigns } from '../utils/zodiacCalculator'
import { geocodeCity, searchCities } from '../utils/locationService'
import { getZodiacByName } from '../utils/zodiacData'

function BirthDataInput({ onSignsCalculated }) {
  const [birthData, setBirthData] = useState({
    date: '',
    hour: '',
    minute: '',
    city: ''
  })

  const [citySuggestions, setCitySuggestions] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [calculatedSigns, setCalculatedSigns] = useState(null)
  const [warnings, setWarnings] = useState([])

  const handleCitySearch = async (query) => {
    setBirthData(prev => ({ ...prev, city: query }))
    setSelectedLocation(null)

    if (query.length >= 3) {
      try {
        const results = await searchCities(query)
        setCitySuggestions(results)
      } catch (err) {
        console.error('Error searching cities:', err)
      }
    } else {
      setCitySuggestions([])
    }
  }

  const handleCitySelect = (suggestion) => {
    setBirthData(prev => ({ ...prev, city: suggestion.displayName }))
    setSelectedLocation({
      latitude: suggestion.latitude,
      longitude: suggestion.longitude
    })
    setCitySuggestions([])
  }

  const validateDate = (date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const minDate = new Date('1900-01-01')

    if (birthDate > today) {
      return 'La fecha de nacimiento no puede estar en el futuro'
    }
    if (birthDate < minDate) {
      return 'La fecha de nacimiento debe ser posterior a 1900'
    }
    return null
  }

  const handleCalculate = async () => {
    setError('')
    setWarnings([])

    // Validar fecha (obligatoria)
    if (!birthData.date) {
      setError('La fecha de nacimiento es obligatoria')
      return
    }

    const dateError = validateDate(birthData.date)
    if (dateError) {
      setError(dateError)
      return
    }

    setLoading(true)

    try {
      // Si ingresó ciudad pero no seleccionó de la lista, hacer geocoding
      let location = selectedLocation
      if (birthData.city && !selectedLocation) {
        try {
          const geocoded = await geocodeCity(birthData.city)
          location = {
            latitude: geocoded.latitude,
            longitude: geocoded.longitude
          }
        } catch (err) {
          // No bloquear si falla geocoding, usar coordenadas 0,0
          console.warn('Geocoding failed, using default coordinates')
        }
      }

      // Preparar datos para cálculo
      const calculationData = {
        date: new Date(birthData.date),
        time: birthData.hour ? {
          hour: parseInt(birthData.hour),
          minute: parseInt(birthData.minute || '0')
        } : undefined,
        latitude: location?.latitude,
        longitude: location?.longitude
      }

      // Calcular signos
      const result = await calculateSigns(calculationData)

      setCalculatedSigns({
        sol: result.sol,
        luna: result.luna,
        ascendente: result.ascendente
      })
      setWarnings(result.warnings || [])

    } catch (err) {
      setError(err.message || 'Error al calcular los signos')
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (calculatedSigns) {
      onSignsCalculated(calculatedSigns)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-semibold text-mystic-accent mb-3">
          Datos de nacimiento
        </h2>
        <p className="text-mystic-cream/70">
          Ingresa tu información para calcular tus signos
        </p>
      </div>

      {!calculatedSigns ? (
        <>
          {/* Formulario */}
          <div className="space-y-6 mb-8">
            {/* Fecha (obligatorio) */}
            <div className="bg-mystic-surface/50 rounded-lg p-6 border-2 border-mystic-accent/20">
              <label htmlFor="date" className="block mb-3">
                <span className="font-display font-semibold text-mystic-cream text-lg">
                  Fecha de nacimiento
                </span>
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                id="date"
                type="date"
                value={birthData.date}
                onChange={(e) => setBirthData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                         text-mystic-cream focus:outline-none focus:border-mystic-accent
                         transition-colors"
                max={new Date().toISOString().split('T')[0]}
                min="1900-01-01"
              />
            </div>

            {/* Hora (opcional) */}
            <div className="bg-mystic-surface/50 rounded-lg p-6 border-2 border-mystic-accent/20">
              <label className="block mb-3">
                <span className="font-display font-semibold text-mystic-cream text-lg">
                  Hora de nacimiento
                </span>
                <span className="text-mystic-cream/60 text-sm ml-2">(opcional)</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hour" className="text-sm text-mystic-cream/70 mb-1 block">
                    Hora
                  </label>
                  <input
                    id="hour"
                    type="number"
                    value={birthData.hour}
                    onChange={(e) => setBirthData(prev => ({ ...prev, hour: e.target.value }))}
                    placeholder="HH"
                    min="0"
                    max="23"
                    className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                             text-mystic-cream focus:outline-none focus:border-mystic-accent
                             transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="minute" className="text-sm text-mystic-cream/70 mb-1 block">
                    Minutos
                  </label>
                  <input
                    id="minute"
                    type="number"
                    value={birthData.minute}
                    onChange={(e) => setBirthData(prev => ({ ...prev, minute: e.target.value }))}
                    placeholder="MM"
                    min="0"
                    max="59"
                    className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                             text-mystic-cream focus:outline-none focus:border-mystic-accent
                             transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Ciudad (opcional con autocomplete) */}
            <div className="bg-mystic-surface/50 rounded-lg p-6 border-2 border-mystic-accent/20">
              <label htmlFor="city" className="block mb-3">
                <span className="font-display font-semibold text-mystic-cream text-lg">
                  Ciudad de nacimiento
                </span>
                <span className="text-mystic-cream/60 text-sm ml-2">(opcional)</span>
              </label>
              <div className="relative">
                <input
                  id="city"
                  type="text"
                  value={birthData.city}
                  onChange={(e) => handleCitySearch(e.target.value)}
                  placeholder="Ej: Buenos Aires, Argentina"
                  className="w-full px-4 py-3 rounded-lg bg-mystic-bg border-2 border-mystic-accent/30
                           text-mystic-cream placeholder-mystic-cream/40
                           focus:outline-none focus:border-mystic-accent transition-colors"
                />
                {citySuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-mystic-surface border-2 border-mystic-accent/40
                                rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {citySuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCitySelect(suggestion)}
                        className="w-full px-4 py-2 text-left text-mystic-cream hover:bg-mystic-accent/20
                                 transition-colors text-sm"
                      >
                        {suggestion.displayName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Botón calcular */}
          <div className="text-center">
            <button
              onClick={handleCalculate}
              disabled={loading || !birthData.date}
              className={`
                px-8 py-3 rounded-lg font-semibold transition-all duration-300
                ${loading || !birthData.date
                  ? 'bg-mystic-surface text-mystic-cream/40 cursor-not-allowed'
                  : 'bg-mystic-accent text-mystic-bg hover:bg-mystic-accent/90 shadow-lg shadow-mystic-accent/30'
                }
              `}
            >
              {loading ? 'Calculando...' : 'Calcular signos'}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Resultados */}
          <div className="space-y-4 mb-8">
            {/* Warnings si los hay */}
            {warnings.length > 0 && (
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-lg">
                <p className="text-yellow-300 text-sm font-semibold mb-2">⚠️ Nota:</p>
                {warnings.map((warning, idx) => (
                  <p key={idx} className="text-yellow-200 text-sm">• {warning}</p>
                ))}
              </div>
            )}

            {/* Signos calculados */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-semibold text-mystic-accent mb-6">
                Tus signos calculados
              </h3>

              <div className="space-y-4">
                {['sol', 'luna', 'ascendente'].map((position) => {
                  const sign = calculatedSigns[position]
                  const zodiac = getZodiacByName(sign)
                  const symbol = position === 'sol' ? '☉' : position === 'luna' ? '☽' : '↗'
                  const label = position.charAt(0).toUpperCase() + position.slice(1)

                  return (
                    <div key={position}
                         className="bg-mystic-surface/50 rounded-lg p-4 border-2"
                         style={{ borderColor: zodiac.color + '40' }}>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{symbol}</span>
                        <span className="font-display text-mystic-cream/70">{label}:</span>
                        <span className="text-2xl">{zodiac.symbol}</span>
                        <span className="font-display font-semibold text-lg"
                              style={{ color: zodiac.color }}>
                          {zodiac.name}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Botón continuar */}
          <div className="text-center space-y-4">
            <button
              onClick={handleContinue}
              className="px-8 py-3 rounded-lg font-semibold bg-mystic-accent text-mystic-bg
                       hover:bg-mystic-accent/90 shadow-lg shadow-mystic-accent/30
                       transition-all duration-300"
            >
              Continuar
            </button>
            <button
              onClick={() => setCalculatedSigns(null)}
              className="block mx-auto text-mystic-cream/60 hover:text-mystic-cream text-sm
                       transition-colors"
            >
              Recalcular
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default BirthDataInput
