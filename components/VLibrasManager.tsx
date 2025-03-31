'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import DevVLibras from './DevVLibras'

// Importação dinâmica do VLibras no lado cliente
const VLibras = dynamic(() => import('vlibras-nextjs'), {
  ssr: false,
})

export default function VLibrasManager() {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Verificamos o ambiente apenas no lado do cliente
    setIsProduction(process.env.NODE_ENV === 'production');

    // Limpa quaisquer instâncias anteriores do VLibras
    const cleanup = () => {
      const widgets = document.querySelectorAll('div[vw="plugin"]');
      widgets.forEach(widget => widget.remove());
      
      // @ts-ignore
      if (window.VLibras && window.VLibras.Widget) {
        // @ts-ignore
        delete window.VLibras.Widget;
      }
    };
    
    // Limpa ao montar
    cleanup();
    
    // Limpa ao desmontar
    return cleanup;
  }, []);

  // Adiciona configurações padrão para o VLibras
  const vlibrasProps = {
    forceOnload: true,
    rootPath: '/',
    personalization: true,
    showAvatar: true,
  };

  return (
    <>
      {isProduction ? <VLibras {...vlibrasProps} /> : <DevVLibras />}
    </>
  )
} 