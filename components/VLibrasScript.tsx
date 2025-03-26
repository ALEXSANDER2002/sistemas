'use client'

import { useEffect } from 'react'

export default function VLibrasScript() {
  useEffect(() => {
    // Injetar div VLibras
    const vwDiv = document.createElement('div')
    vwDiv.className = 'enabled'
    vwDiv.setAttribute('vw', '')
    
    const accessButton = document.createElement('div')
    accessButton.className = 'active'
    accessButton.setAttribute('vw-access-button', '')
    vwDiv.appendChild(accessButton)
    
    const pluginWrapper = document.createElement('div')
    pluginWrapper.setAttribute('vw-plugin-wrapper', '')
    
    const topWrapper = document.createElement('div')
    topWrapper.className = 'vw-plugin-top-wrapper'
    pluginWrapper.appendChild(topWrapper)
    
    vwDiv.appendChild(pluginWrapper)
    document.body.appendChild(vwDiv)
    
    // Injetar script do VLibras
    const script1 = document.createElement('script')
    script1.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script1.async = true
    script1.onload = () => {
      const script2 = document.createElement('script')
      script2.textContent = "new window.VLibras.Widget('https://vlibras.gov.br/app')"
      document.body.appendChild(script2)
    }
    document.body.appendChild(script1)
    
    // Função de limpeza
    return () => {
      // Remover elementos quando o componente for desmontado
      document.body.removeChild(vwDiv)
      const scripts = document.querySelectorAll('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]')
      scripts.forEach(script => {
        document.body.removeChild(script)
      })
    }
  }, [])
  
  // Não renderiza nada visível
  return null
} 