'use client'

import { useEffect } from 'react'

export default function VLibrasWidget() {
  useEffect(() => {
    // Adicionar div de widgets do VLibras
    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'vlibras-widget';
    widgetDiv.setAttribute('vw', 'plugin');
    document.body.appendChild(widgetDiv);

    // Carregar o script do VLibras usando o CDN fornecido
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // Inicializar o VLibras após o script carregar
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const widgetDiv = document.getElementById('vlibras-widget');
      if (widgetDiv) {
        widgetDiv.remove();
      }
      
      const scripts = document.querySelectorAll('script[src="https://vlibras.gov.br/app/vlibras.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null;
} 