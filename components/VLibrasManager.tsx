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
  }, []);

  return (
    <>
      {isProduction ? <VLibras forceOnload /> : <DevVLibras />}
    </>
  )
} 