'use client'

import VLibrasComponent from './vlibras-import'
import { useEffect, useState } from 'react'

export default function VLibras() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return <VLibrasComponent />
} 