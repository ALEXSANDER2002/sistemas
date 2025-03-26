'use client'

import { useState } from 'react'
import '../globals.css'
import VLibras from '@/components/VLibras'
import Card from '@/components/Card'

export default function ExamplePage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Card />
      <VLibras />
    </div>
  )
} 