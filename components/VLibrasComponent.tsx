'use client'

import { useEffect } from 'react'
import VLibras from '@djpfs/react-vlibras'

export default function VLibrasComponent() {
  useEffect(() => {
    // @ts-ignore
    if (window.vlibras) {
      // @ts-ignore
      window.vlibras.init()
    }
  }, [])

  return <VLibras forceOnload={true} />
} 