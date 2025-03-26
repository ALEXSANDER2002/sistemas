'use client'

import { useState } from 'react'
import VLibras from '@/components/VLibras'
import Card from '@/components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Card />
      <VLibras />
    </div>
  )
}

export default App 