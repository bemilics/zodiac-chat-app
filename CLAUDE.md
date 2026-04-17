# TAROT CHAT APP - Guía y Bitácora del Proyecto

## CONCEPTO
App de tarot interactiva donde el usuario hace una tirada de 3 cartas y los Arcanos Mayores del tarot debaten sobre él/ella en un chat grupal estilo WhatsApp.

## STACK TÉCNICO
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (clases core + paleta custom)
- **API:** Claude API (`claude-sonnet-4-20250514`)
- **Servidor dev:** Express.js (desarrollo local)
- **Serverless:** Vercel Functions (producción)
- **Deploy:** Vercel
- **Screenshot:** html2canvas

## FLUJO DE LA APP
1. **Elegir tema de la tirada** - Amor, Decisión, Introspección, Trabajo, o tema libre
2. **Barajado ritual** - Animación CSS de cartas mezclándose
3. **Elegir 3 cartas** - De 10 cartas boca abajo, el usuario elige 3 que le llamen
4. **Input opcional** - Campo de texto libre (~200 chars) para contexto adicional
5. **Generación del chat** - Claude API genera 8-12 mensajes iniciales
6. **Chat interactivo** - Usuario puede seguir conversando, las 3 cartas responden
7. **Screenshot shareable** - Formato 9:16 optimizado para Instagram Stories

## CARTAS (22 Arcanos Mayores)
Cada carta tiene personalidad única con tono irónico-humorístico, gen z coded:
- 0-El Loco, I-El Mago, II-La Sacerdotisa, III-La Emperatriz, IV-El Emperador
- V-El Hierofante, VI-Los Enamorados, VII-El Carro, VIII-La Fuerza, IX-El Ermitaño
- X-La Rueda de la Fortuna, XI-La Justicia, XII-El Colgado, XIII-La Muerte
- XIV-La Templanza, XV-El Diablo, XVI-La Torre, XVII-La Estrella, XVIII-La Luna
- XIX-El Sol, XX-El Juicio, XXI-El Mundo

Ver `src/utils/tarotData.js` para personalidades completas.

## REGLAS DEL CHAT
- Tono **irónico-humorístico**, gen z coded
- Chat **interactivo** - 8-12 mensajes iniciales, luego el usuario puede continuar
- Las 3 cartas responden cada vez que el usuario escribe
- Emojis estratégicos + slang neutro + 1-2 anglicismos sutiles
- Cada carta habla desde su personalidad arquetípica + posición en la tirada
- Las cartas interactúan entre sí (se responden, contradicen, complementan, se burlan)
- Idioma: **español neutro, gen z coded**
- **Sin cierre** - la conversación puede continuar indefinidamente
- Mensajes cortos estilo WhatsApp (1-3 líneas)
- Efecto "escribiendo..." antes de cada respuesta

## DISEÑO VISUAL IMPLEMENTADO
- **Estética:** Oscura, mística, sofisticada
- **Paleta custom:**
  - `mystic-bg`: #0A0A0F (fondo principal)
  - `mystic-surface`: #1A1A2E (cards/surfaces)
  - `mystic-accent`: #C9A86A (dorado)
  - `mystic-cream`: #F4EAD5 (crema)
  - `mystic-burgundy`: #6B2D2D (burdeos)
- **Tipografía:**
  - Display: Cinzel (títulos místicos)
  - Body: Inter (legible)
- **Mobile-first:** Responsive desde el diseño
- **Cartas:** Dorso con patrón SVG de mandala geométrico
- **Animaciones:** Flip 3D, fade in, slide in, typing indicators

## ARQUITECTURA TÉCNICA

### Desarrollo Local
```
Cliente (navegador)
    ↓
Vite Dev Server (puerto 5173)
    ↓ [proxy /api/*]
Express Server (puerto 3001)
    ↓
Claude API (Anthropic)
```

**Comando:** `npm run dev` (ejecuta ambos servidores con concurrently)

### Producción (Vercel)
```
Cliente (navegador)
    ↓
Vercel Edge Network
    ↓
Serverless Function (/api/chat.js)
    ↓
Claude API (Anthropic)
```

**Ventajas:**
- ✅ Sin problemas de CORS
- ✅ API key segura (servidor-side)
- ✅ Setup simple con un comando
- ✅ Deploy automático

## ESTRUCTURA DE COMPONENTES IMPLEMENTADA

```
src/
├── App.jsx                      ✅ State management completo
├── main.jsx                     ✅ Entry point
├── index.css                    ✅ Tailwind + animaciones custom
├── components/
│   ├── ThemeSelector.jsx        ✅ Paso 1: Selección de tema
│   ├── CardShuffle.jsx          ✅ Paso 2: Animación de barajado
│   ├── CardSpread.jsx           ✅ Paso 3: Spread de 10 cartas
│   ├── Card.jsx                 ✅ Componente carta individual
│   ├── OptionalInput.jsx        ✅ Paso 4: Input opcional
│   ├── ChatGroup.jsx            ✅ Chat grupal principal
│   ├── ChatMessage.jsx          ✅ Mensaje individual
│   ├── TypingIndicator.jsx      ✅ Indicador "escribiendo..."
│   └── ShareButton.jsx          ✅ Botón de compartir
├── utils/
│   ├── tarotData.js             ✅ 22 cartas + personalidades
│   ├── claudeAPI.js             ✅ Llamadas a /api/chat
│   ├── promptBuilder.js         ✅ Construcción de prompts
│   └── screenshotUtils.js       ✅ Captura con html2canvas
└── hooks/
    └── useChatScroll.jsx        ✅ Auto-scroll del chat

api/
└── chat.js                      ✅ Serverless function (producción)

server-dev.js                    ✅ Express server (desarrollo)
```

## FEATURES IMPLEMENTADAS

### ✅ Flujo completo funcional
- Selección de tema (5 opciones)
- Animación de barajado
- Selección de 3 cartas boca abajo (sorpresa hasta el chat)
- Input opcional
- Generación de chat inicial (8-12 mensajes)
- Chat interactivo continuo
- Typing indicators
- Screenshot para Instagram Stories

### ✅ Mejoras de UX
- **Cartas boca abajo:** El usuario NO ve qué arcano eligió hasta que las cartas hablan
- **Feedback visual:** Anillo dorado + número en cartas seleccionadas
- **Botón de barajado:** Texto claro "Terminar de barajar y continuar"
- **Auto-scroll inteligente:** Solo si el usuario está near bottom
- **Scrollbar custom:** Estilizada con colores de la paleta
- **Responsive completo:** Mobile-first design

### ✅ Sistema de API
- Servidor Express para desarrollo local
- Proxy configurado en Vite
- Serverless function para producción
- Manejo de errores robusto
- Loading states y mensajes de error amigables

## ESTADO ACTUAL: COMPLETAMENTE FUNCIONAL ✅

**Última sesión (2026-04-13):**
- ✅ Proyecto completo implementado
- ✅ Todos los componentes funcionando
- ✅ Integración con Claude API operativa
- ✅ Servidor de desarrollo configurado
- ✅ Sistema de screenshot implementado
- ✅ Cartas permanecen boca abajo hasta el chat
- ✅ Animaciones y UX pulidos

**Ejecutar la app:**
```bash
# 1. Configurar API key
cp .env.example .env
# Editar .env y agregar: ANTHROPIC_API_KEY=tu-key-aqui

# 2. Iniciar servidor
npm run dev

# 3. Abrir navegador
http://localhost:5173
```

## PRÓXIMOS PASOS (FEEDBACK PENDIENTE)

### Para la próxima sesión:
- [ ] Revisar y aplicar feedback del flujo de usuario
- [ ] Ajustar tono del chat según resultados reales
- [ ] Optimizar prompts si es necesario
- [ ] Testear screenshot en Instagram Stories real
- [ ] Posibles ajustes de diseño/colores

### Features futuras (post-MVP):
- [ ] Ilustraciones custom para las cartas (en lugar de solo tipografía)
- [ ] Persistencia de tiradas en localStorage
- [ ] Links shareables únicos para cada tirada
- [ ] Analytics de qué cartas/temas son más populares
- [ ] Más temas de tirada
- [ ] Efectos de sonido sutiles
- [ ] Modo oscuro/claro toggle

## CONFIGURACIÓN Y ARCHIVOS IMPORTANTES

### Variables de entorno:
- `.env` - API key (git ignorado, crear manualmente)
- `.env.example` - Template para .env

### Configuración:
- `package.json` - Scripts y dependencias
- `vite.config.js` - Proxy para /api durante desarrollo
- `vercel.json` - Config para deploy en Vercel
- `tailwind.config.js` - Paleta custom y fonts

### Documentación:
- `README.md` - Documentación completa del proyecto
- `INICIO-RAPIDO.md` - Guía de inicio rápido
- `prompt-tarot-app.md` - Brief original del proyecto

## NOTAS DE DESARROLLO

### API de Claude:
- Modelo: `claude-sonnet-4-20250514`
- Max tokens: 1500
- Response format: JSON array de mensajes
- Prompts optimizados para personalidades y humor

### Límites y consideraciones:
- Sin límite aparente de interacciones (por decisión de diseño)
- API key expuesta solo en servidor (seguro)
- Screenshots capturan scroll actual (no todo el historial)
- Compatibilidad: navegadores modernos con ES6+ y fetch

### Git workflow:
- **NO hacer commits** a menos que se pida explícitamente
- Usuario maneja git con GitKraken
- `.gitignore` configurado (node_modules, .env, .vercel, etc.)

## RECURSOS Y LINKS

- Claude API: https://console.anthropic.com/
- Vercel Dashboard: https://vercel.com/
- Tailwind CSS: https://tailwindcss.com/
- React + Vite: https://vitejs.dev/

---
**Última actualización:** 2026-04-13
**Estado:** Funcional y listo para feedback
**Próxima sesión:** Aplicar mejoras según testing de usuario
