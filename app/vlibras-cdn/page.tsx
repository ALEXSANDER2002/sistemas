'use client'

import VLibrasCDN from '@/components/VLibrasCDN'

export default function VLibrasCDNPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">VLibras com CDN</h1>
        <p className="mb-4">
          Esta página demonstra o uso do VLibras carregado a partir de um iframe 
          com HTML estático que utiliza o CDN oficial do VLibras.
        </p>
        <p className="text-sm text-gray-600">
          Você deve ver o ícone do VLibras no canto inferior direito desta página.
        </p>
      </div>
      
      {/* Incluímos o iframe do VLibras */}
      <VLibrasCDN />
    </div>
  )
} 