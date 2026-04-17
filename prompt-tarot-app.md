# PROMPT PARA CLAUDE CODE — APP DE TAROT CON CHAT GRUPAL

## CONTEXTO DEL PROYECTO

Estoy construyendo una web app shareable y viral llamada (nombre pendiente de definir). Es una app de tarot interactiva donde el usuario hace una tirada de 3 cartas y los Arcanos Mayores del tarot debaten sobre él/ella en un chat grupal estilo WhatsApp. El stack es React + Vite, Claude API (claude-sonnet-4-20250514), deploy en Vercel.

El proyecto sigue el patrón de otras apps virales que he hecho: Roastbeat (roast de personalidad basado en screenshot de Spotify), CINEMATCH (perfil de citas basado en Letterboxd), Iconic Duo (análisis de compatibilidad). La clave es: **input superficial y de bajo riesgo → output personalizado, inesperado y shareable.**

---

## FLUJO COMPLETO DE LA APP

### PASO 1 — Elegir tema de la tirada
El usuario elige qué quiere consultar. Opciones predefinidas (con posibilidad de escribir tema libre):
- Amor
- Una decisión que debo tomar
- Introspección / conocerme mejor
- Trabajo / proyectos
- Tema libre (input de texto)

Según el tema elegido, las 3 posiciones de la tirada tendrán nombres narrativos distintos. Ejemplos:
- **Amor** → "Lo que sientes / Lo que bloquea / Lo que viene"
- **Decisión** → "Lo que sabes / Lo que temes / Lo que deberías escuchar"
- **Introspección** → "Quién eres / Quién te escondes / Quién podrías ser"
- **Trabajo** → "Tu energía actual / El obstáculo / El camino"

### PASO 2 — Barajado ritual
Animación visual de cartas mezclándose (efecto de barajado). Botón "Las cartas están listas" para continuar. Este paso es puramente ritual/atmosférico — la aleatorización ocurre en este momento bajo el capó.

### PASO 3 — Elegir 3 cartas
Aparecen múltiples cartas boca abajo en un spread visual (mostrar al menos 7-10 cartas). El usuario hace click en 3 cartas que le "llamen". Cada click voltea la carta con animación de reveal (efecto flip 3D) mostrando:
- Número romano del arcano
- Nombre de la carta
- Ilustración o representación visual (puede ser con CSS/SVG estilizado si no hay assets)
- A qué posición de la tirada corresponde (primera, segunda, tercera elegida)

Las cartas son de los **22 Arcanos Mayores** del tarot:
0-El Loco, I-El Mago, II-La Sacerdotisa, III-La Emperatriz, IV-El Emperador, V-El Hierofante, VI-Los Enamorados, VII-El Carro, VIII-La Fuerza, IX-El Ermitaño, X-La Rueda de la Fortuna, XI-La Justicia, XII-El Colgado, XIII-La Muerte, XIV-La Templanza, XV-El Diablo, XVI-La Torre, XVII-La Estrella, XVIII-La Luna, XIX-El Sol, XX-El Juicio, XXI-El Mundo

### PASO 4 — Input opcional del usuario
Pregunta breve y de bajo riesgo: *"¿Hay algo específico que quieras que las cartas consideren? (opcional)"*
Campo de texto libre, máximo ~200 caracteres. Este input enriquece el resultado sin ser invasivo.

### PASO 5 — Generación del chat grupal (Claude API)
Se hace un llamado a la Claude API con toda la información recopilada. El resultado es un **chat grupal estilo WhatsApp** donde las 3 cartas sorteadas son los participantes. 

**Reglas del chat:**
- Cada carta tiene su nombre como username en el chat
- Cada carta habla desde su personalidad arquetípica canónica del tarot
- Cada carta también habla desde su posición en la tirada (su "rol" narrativo según el tema)
- Las cartas **interactúan entre sí** — se responden, se contradicen, se complementan, se interrumpen
- El tono es misterioso, profundo, a veces irónico, nunca genérico
- Los mensajes son cortos como WhatsApp real (1-3 líneas por mensaje)
- Total de mensajes: entre 15-22
- Al final del chat, una de las cartas hace un cierre/síntesis potente

**Personalidades de referencia por carta (para el prompt):**
- El Loco: caótico, libre, impredecible, habla en fragmentos
- El Mago: inteligente, directo, un poco arrogante, manipulador benigno
- La Sacerdotisa: críptica, habla poco pero cuando habla es demoledor, pregunta en vez de afirmar
- La Emperatriz: sensual, abundante, maternal pero con dientes
- El Emperador: autoritario, sentencioso, no pide permiso para opinar
- El Hierofante: formal, citador de tradiciones, a veces molesto
- Los Enamorados: indeciso, relacional, siempre hablando de "el otro"
- El Carro: competitivo, impaciente, orientado a resultados
- La Fuerza: calmada, compasiva, habla suave pero firme
- El Ermitaño: responde tarde, solitario, sabiduría lacónica
- La Rueda: fatalista, habla de ciclos, nunca se alarma por nada
- La Justicia: fría, precisa, imparcial, no tiene favoritos
- El Colgado: resignado pero en paz, perspectiva invertida, hace las pausas más largas
- La Muerte: directa, incomprendida, transformadora, harta de que la malinterpreten
- La Templanza: mediadora, equilibrada, la que calma los ánimos
- El Diablo: tentador, oscuro, dice las verdades incómodas con placer
- La Torre: caótica, reveladora, la que rompe la conversación cuando está demasiado cómoda
- La Estrella: esperanzadora, vulnerable, la más humana de todas
- La Luna: ansiosa, ilusoria, ve cosas que los demás no ven
- El Sol: optimista, infantil, le cae bien a todos pero a veces molesta
- El Juicio: crítico, severo, hace preguntas que duelen
- El Mundo: integrado, sabio, habla poco y siempre cierra bien

### PASO 6 — Display del resultado
El chat grupal se muestra en un componente visual estilo WhatsApp:
- Nombre del grupo: algo atmosférico generado o fijo (ej: "✦ Tirada del [fecha]" o nombre según el tema)
- Cada participante tiene color de burbuja distinto
- Timestamps sutiles entre mensajes
- Animación de los mensajes apareciendo uno a uno (typing effect o stagger)
- Botón de **compartir / screenshot** prominente al final

---

## STACK TÉCNICO

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (solo clases core, sin compiler custom)
- **API:** Claude API — `claude-sonnet-4-20250514`, max_tokens: 1500
- **Deploy:** Vercel
- **Sin backend propio** — todo client-side excepto el llamado a Claude API
- **La API key de Claude se maneja por variable de entorno** (`VITE_ANTHROPIC_API_KEY`)

---

## DISEÑO VISUAL

La app debe tener una estética **oscura, mística y sofisticada** — no genérica, no purple-gradient-on-white. Referencias de tono: tarot artesanal, cartas antiguas, tinta y oro, misterio elegante. 

Tipografía: una display font con carácter (serif antigua, uncial, o algo con personalidad) para títulos y nombres de cartas. Body en algo legible pero con personalidad.

Paleta: fondos oscuros (negro, azul muy oscuro, verde bosque oscuro), acentos en dorado, crema, o burdeos. Las burbujas del chat deben tener colores distintos pero dentro de la paleta.

Las cartas boca abajo deben tener un diseño de dorso atractivo (patrón geométrico, mandala, estrella — hecho en CSS/SVG).

**IMPORTANTE:** Evitar el aesthetic genérico de IA. Esta app debe verse como algo que alguien diseñó con intención.

---

## LO QUE ESTÁ PENDIENTE DE DEFINIR (no bloquea el desarrollo inicial)

- **Nombre de la app** — pendiente
- **Ilustraciones de las cartas** — por ahora usar representación tipográfica/CSS estilizada, con espacio para agregar imágenes después
- **Idioma del chat** — ¿español neutro? ¿español con más personalidad? ¿opción de idioma?
- **Compartir resultado** — ¿screenshot automático con html2canvas? ¿link único? ¿imagen generada?

---

## INSTRUCCIONES ADICIONALES PARA CLAUDE CODE

1. Construir primero el flujo completo funcional, luego pulir el diseño
2. El prompt a Claude API debe ser muy específico sobre las personalidades de cada carta y la interacción entre ellas — es el corazón de la app
3. El componente del chat grupal debe ser reutilizable y visualmente cuidado
4. Manejar bien los estados de carga (el llamado a la API puede tardar)
5. La experiencia mobile-first es importante — esta app se va a compartir desde el celular
6. Código limpio y comentado, pensando en que voy a iterar sobre esto
