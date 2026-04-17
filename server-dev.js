// Servidor de desarrollo simple para manejar API calls
// Esto evita problemas de CORS en desarrollo local

import express from 'express'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = 3001

// Middleware para parsear JSON
app.use(express.json())

// CORS para desarrollo
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

// Endpoint de API que hace proxy a Claude
app.post('/api/chat', async (req, res) => {
  const API_KEY = process.env.ANTHROPIC_API_KEY

  if (!API_KEY) {
    console.error('❌ API key no encontrada en .env')
    return res.status(500).json({
      error: 'API key no configurada',
      details: 'Asegúrate de tener ANTHROPIC_API_KEY en tu archivo .env'
    })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt es requerido' })
    }

    console.log('📤 Llamando a Claude API...')

    // Llamar a Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Error de Claude API:', errorData)
      return res.status(response.status).json({
        error: `Error de Claude API: ${response.status}`,
        details: errorData.error?.message || 'Error desconocido'
      })
    }

    const data = await response.json()
    console.log('✅ Respuesta de Claude recibida')

    return res.status(200).json(data)

  } catch (error) {
    console.error('❌ Error en servidor de desarrollo:', error)
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor de API corriendo en http://localhost:${PORT}`)
  console.log(`📡 Endpoint: http://localhost:${PORT}/api/chat`)
  console.log(`🔑 API Key configurada: ${process.env.ANTHROPIC_API_KEY ? '✅ Sí' : '❌ No'}\n`)
})
