'use client'

import Script from 'next/script'

export default function VLibrasScript() {
  return (
    <Script
      src="https://vlibras.gov.br/app/vlibras-plugin.js"
      strategy="beforeInteractive"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      onLoad={() => {
        // @ts-ignore
        if (window.vlibras) {
          // @ts-ignore
          window.vlibras.init()
        }
      }}
    />
  )
} 