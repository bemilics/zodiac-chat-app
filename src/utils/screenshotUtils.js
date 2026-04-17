import html2canvas from 'html2canvas'

export async function captureForInstagram(chatElement) {
  if (!chatElement) {
    throw new Error('Elemento de chat no encontrado')
  }

  try {
    // Crear un contenedor temporal para el screenshot con dimensiones de IG Stories (9:16)
    const wrapper = document.createElement('div')
    wrapper.style.width = '1080px'
    wrapper.style.height = '1920px'
    wrapper.style.position = 'absolute'
    wrapper.style.left = '-9999px'
    wrapper.style.top = '0'
    wrapper.style.background = '#0A0A0F' // mystic-bg
    wrapper.style.overflow = 'hidden'
    wrapper.style.fontFamily = '"Inter", sans-serif'

    // Clonar el contenido del chat
    const chatClone = chatElement.cloneNode(true)
    chatClone.style.height = 'auto'
    chatClone.style.maxHeight = '1600px'
    chatClone.style.overflow = 'hidden'

    // Crear frame superior
    const topFrame = document.createElement('div')
    topFrame.style.cssText = `
      padding: 40px 60px;
      text-align: center;
      background: linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 100%);
      border-bottom: 2px solid #C9A86A;
    `
    topFrame.innerHTML = `
      <h1 style="
        font-family: 'Cinzel', serif;
        font-size: 48px;
        font-weight: 700;
        color: #C9A86A;
        margin: 0 0 10px 0;
        letter-spacing: 2px;
      ">✦ TAROT CHAT ✦</h1>
      <p style="
        font-size: 20px;
        color: #F4EAD5;
        opacity: 0.7;
        margin: 0;
      ">Mi tirada</p>
    `

    // Crear frame inferior
    const bottomFrame = document.createElement('div')
    bottomFrame.style.cssText = `
      padding: 40px 60px;
      text-align: center;
      background: linear-gradient(180deg, #1A1A2E 0%, #0A0A0F 100%);
      border-top: 2px solid #C9A86A;
      margin-top: auto;
    `
    bottomFrame.innerHTML = `
      <p style="
        font-size: 32px;
        color: #C9A86A;
        margin: 0 0 15px 0;
        font-weight: 600;
      ">tarotchat.app</p>
      <p style="
        font-size: 18px;
        color: #F4EAD5;
        opacity: 0.5;
        margin: 0;
      ">Haz tu propia tirada ✦</p>
    `

    // Ensamblar todo
    wrapper.appendChild(topFrame)

    const contentWrapper = document.createElement('div')
    contentWrapper.style.cssText = `
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 40px 60px;
      overflow: hidden;
    `
    contentWrapper.appendChild(chatClone)
    wrapper.appendChild(contentWrapper)

    wrapper.appendChild(bottomFrame)

    // Agregar al DOM temporalmente
    document.body.appendChild(wrapper)

    // Pequeño delay para asegurar que se renderice
    await new Promise(resolve => setTimeout(resolve, 100))

    // Capturar con html2canvas
    const canvas = await html2canvas(wrapper, {
      width: 1080,
      height: 1920,
      scale: 2,
      backgroundColor: '#0A0A0F',
      logging: false,
      useCORS: true
    })

    // Limpiar
    document.body.removeChild(wrapper)

    // Convertir a blob y descargar
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `tarot-chat-${Date.now()}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }, 'image/png')

    return true
  } catch (error) {
    console.error('Error capturando screenshot:', error)
    throw error
  }
}
