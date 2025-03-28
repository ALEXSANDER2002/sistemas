'use client'

import { useEffect } from 'react'

export default function VLibrasComponent() {
  useEffect(() => {
    // @ts-ignore
    if (window.vlibras) {
      // @ts-ignore
      window.vlibras.init()
    }
  }, [])

  return null
} 