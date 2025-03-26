import React from 'react'

export default function Card() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Exemplo com VLibras</h2>
      <p className="text-gray-700 mb-4">
        Este é um exemplo de implementação do VLibras. 
        O VLibras é uma ferramenta que traduz conteúdos digitais em Português para Língua Brasileira de Sinais.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Clique aqui
      </button>
    </div>
  )
} 