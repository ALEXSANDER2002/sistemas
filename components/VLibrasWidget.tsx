'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function VLibrasWidget() {
  useEffect(() => {
    return () => {
      // Cleanup on unmount
    }
  }, [])

  return (
    <>
      <div data-vw="plugin" className="enabled">
        <div data-vw-access-button className="active"></div>
        <div data-vw-plugin-wrapper>
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        onLoad={() => {
          // @ts-ignore
          new window.VLibras.Widget();
        }}
        strategy="afterInteractive"
      />
    </>
  )
} 