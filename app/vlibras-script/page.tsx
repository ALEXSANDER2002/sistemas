'use client'

import VLibrasScript from '@/components/VLibrasScript'

export default function VLibrasScriptPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">VLibras com Script Injetado</h1>
        <p className="mb-4">
          Esta página demonstra o uso do VLibras através da injeção direta 
          do script do CDN oficial na página.
        </p>
        <p className="text-sm text-gray-600">
          Você deve ver o ícone do VLibras no canto inferior direito desta página.
        </p>
      </div>
      
      {/* Incluímos o script VLibras */}
      <VLibrasScript />
    </div>
  )
} 