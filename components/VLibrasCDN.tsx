'use client'

import { useEffect, useRef } from 'react'

export default function VLibrasCDN() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Certificar de que este código só executa no navegador
    if (typeof window !== 'undefined') {
      // Você pode adicionar mais lógica aqui se necessário
    }
  }, [])

  return (
    <iframe 
      ref={iframeRef}
      src="/vlibras.html"
      style={{
        border: 'none',
        position: 'fixed',
        zIndex: 9999,
        bottom: 0,
        right: 0,
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        pointerEvents: 'none'
      }}
      title="VLibras Widget"
      aria-hidden="true"
    />
  )
} 