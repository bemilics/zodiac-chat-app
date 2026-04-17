# 🚀 Inicio Rápido - Tarot Chat App

## Configuración en 3 pasos

### 1. Configura tu API Key

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` y agrega tu API key de Anthropic:

```
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui
```

Obtén tu API key en: https://console.anthropic.com/

### 2. Ejecuta el servidor de desarrollo

```bash
npm run dev
```

Este comando ejecuta automáticamente:
- ✅ Servidor de API en `http://localhost:3001` (proxy para Claude API)
- ✅ Frontend Vite en `http://localhost:5173`
- ✅ Proxy configurado para evitar CORS

### 3. Abre la app

La app estará disponible en: **http://localhost:5173**

## Cómo funciona

```
Navegador
    ↓
    http://localhost:5173 (Frontend React)
    ↓
    llama a /api/chat
    ↓
Vite proxy redirige a http://localhost:3001/api/chat
    ↓
Servidor Express (server-dev.js)
    ↓
    llama a Claude API con tu API key
    ↓
    responde al navegador
```

**Ventajas de esta solución**:
- ✅ No más errores de CORS
- ✅ Un solo comando: `npm run dev`
- ✅ Tu API key está segura (no se expone en el navegador)
- ✅ Funciona perfecto en desarrollo local

## Troubleshooting

### Error: "API key no configurada"
→ Verifica que tu archivo `.env` exista en la raíz del proyecto y tenga `ANTHROPIC_API_KEY=...`

### Puerto 3001 o 5173 ocupado
→ Cierra otros procesos en esos puertos o modifica los puertos en `server-dev.js` y `vite.config.js`

### Error 404 en /api/chat
→ Asegúrate de que ambos servidores estén corriendo (verás logs de "API" y "VITE" en la terminal)

## Deploy a producción

Para producción en Vercel, las serverless functions en `/api` se usan automáticamente. Ver `README.md` para instrucciones completas de deploy.
