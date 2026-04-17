// Vercel Serverless Function - Proxy para Claude API
// Soluciona el problema de CORS al hacer las llamadas desde el servidor

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY

  if (!API_KEY) {
    return res.status(500).json({
      error: 'API key no configurada en el servidor',
      details: 'Configura ANTHROPIC_API_KEY en las variables de entorno de Vercel'
    })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt es requerido' })
    }

    // Llamar a Claude API desde el servidor
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
      return res.status(response.status).json({
        error: `Error de Claude API: ${response.status}`,
        details: errorData.error?.message || 'Error desconocido'
      })
    }

    const data = await response.json()

    // Devolver la respuesta completa de Claude
    return res.status(200).json(data)

  } catch (error) {
    console.error('Error en serverless function:', error)
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    })
  }
}
