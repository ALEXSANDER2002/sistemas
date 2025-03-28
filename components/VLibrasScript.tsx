'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function VLibrasScript() {
  useEffect(() => {
    const loadVLibras = () => {
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.referrerPolicy = 'no-referrer';
      script.onload = () => {
        // @ts-ignore
        if (window.vlibras) {
          // @ts-ignore
          window.vlibras.init();
        }
      };
      document.head.appendChild(script);
    };

    loadVLibras();
    
    return () => {
      // Cleanup if needed
      const scripts = document.querySelectorAll('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null;
} 