# ✦ Tarot Chat App ✦

Una app de tarot interactiva donde las cartas de los Arcanos Mayores debaten sobre ti en un chat grupal estilo WhatsApp.

## Características

- **Tirada personalizada**: Elige entre 4 temas predefinidos o crea tu propio tema
- **22 Arcanos Mayores**: Cada carta con su personalidad única y humor característico
- **Chat interactivo**: Las 3 cartas sorteadas conversan entre ellas y responden a tus mensajes
- **Tono gen z coded**: Humor irónico, emojis estratégicos y slang neutro
- **Screenshot para Instagram Stories**: Comparte tu tirada en formato optimizado 9:16
- **Powered by Claude API**: Conversaciones generadas con claude-sonnet-4-20250514

## Stack Técnico

- React + Vite
- Tailwind CSS
- Claude API (Anthropic)
- html2canvas

## Instalación

Las dependencias ya están instaladas, pero si necesitas reinstalarlas:

```bash
npm install
```

## Configuración

**IMPORTANTE**: La app usa serverless functions para evitar problemas de CORS con la API de Claude.

### 1. Configurar API Key

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Abre el archivo `.env` y agrega tu API key de Anthropic:

```
ANTHROPIC_API_KEY=sk-ant-api03-tu-api-key-aqui
```

Para obtener tu API key, visita: https://console.anthropic.com/

**Nota**: La variable ya NO tiene el prefijo `VITE_` porque se usa en el servidor (serverless function), no en el cliente.

## Uso

### Desarrollo Local

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Este comando ejecuta automáticamente:
- ✅ Servidor Express en puerto 3001 (maneja las llamadas a Claude API)
- ✅ Vite en puerto 5173 (frontend de React)
- ✅ Proxy configurado entre ambos

La app estará disponible en `http://localhost:5173/`

**Arquitectura de desarrollo**:
```
localhost:5173 (Vite - Frontend)
     ↓ /api/chat
     ↓ (proxy)
localhost:3001 (Express - API)
     ↓
Claude API (Anthropic)
```

## Flujo de la App

1. **Elegir tema**: Amor, Decisión, Introspección, Trabajo o tema libre
2. **Barajado**: Animación de cartas mezclándose
3. **Elegir 3 cartas**: Selecciona las cartas que te llamen del spread
4. **Contexto opcional**: Agrega información adicional si quieres
5. **Chat grupal**: Las 3 cartas conversan sobre ti
6. **Interacción**: Escribe mensajes y las cartas responden
7. **Compartir**: Descarga un screenshot optimizado para Instagram Stories

## Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

## Deploy en Vercel

1. **Push tu código a GitHub**

2. **Conecta el repositorio a Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Import tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configura la variable de entorno**:
   - En el dashboard de Vercel, ve a Settings → Environment Variables
   - Agrega: `ANTHROPIC_API_KEY` = `tu-api-key-aqui`
   - Importante: Configurar para todos los entornos (Production, Preview, Development)

4. **Deploy**:
   - Vercel hará el deploy automáticamente
   - Las serverless functions en `/api` se deployarán automáticamente

**Nota**: Ahora la API key está segura en el servidor (serverless function), no expuesta en el cliente.

## Arquitectura de la API

La app resuelve el problema de CORS de dos formas:

**En desarrollo local**:
- Servidor Express (`server-dev.js`) maneja las API calls
- Vite hace proxy de `/api/*` al servidor Express
- Simple y rápido con `npm run dev`

**En producción (Vercel)**:
- Serverless Functions en `/api/chat.js`
- Deploy automático sin configuración extra

```
Desarrollo:
Cliente → Vite (5173) → [proxy] → Express (3001) → Claude API

Producción:
Cliente → Vercel Serverless Function → Claude API
```

**Ventajas**:
- ✅ Sin problemas de CORS
- ✅ API key segura (no expuesta en el cliente)
- ✅ Setup simple para desarrollo
- ✅ Deploy automático en Vercel

## Estructura del Proyecto

```
api/
└── chat.js              # Serverless function para producción (Vercel)

server-dev.js            # Servidor Express para desarrollo local

src/
├── components/          # Componentes React
│   ├── ThemeSelector.jsx
│   ├── CardShuffle.jsx
│   ├── CardSpread.jsx
│   ├── Card.jsx
│   ├── OptionalInput.jsx
│   ├── ChatGroup.jsx
│   ├── ChatMessage.jsx
│   ├── TypingIndicator.jsx
│   └── ShareButton.jsx
├── utils/              # Utilidades
│   ├── tarotData.js    # 22 cartas con personalidades
│   ├── claudeAPI.js    # Llamadas a Claude API
│   ├── promptBuilder.js # Construcción de prompts
│   └── screenshotUtils.js # Sistema de captura
├── hooks/              # React hooks custom
│   └── useChatScroll.jsx
├── App.jsx            # Componente principal
├── main.jsx           # Entry point
└── index.css          # Estilos globales + Tailwind

```

## Próximas Mejoras

- Ilustraciones custom para las cartas
- Persistencia de tiradas (localStorage)
- Links shareables únicos
- Analytics de cartas más frecuentes
- Más temas de tirada
- Sistema de rating de tiradas

## Documentación Adicional

Ver `CLAUDE.md` para la guía y bitácora del proyecto.
