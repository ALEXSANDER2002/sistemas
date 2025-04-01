"use client"

import { useHighContrast } from './HighContrastContext'
import { useEffect } from 'react'

/**
 * Componente que carrega o CSS de alto contraste de forma dinâmica
 * apenas quando o modo de alto contraste está ativo, evitando problemas
 * de carregamento infinito e melhorando o desempenho
 */
export default function DynamicHighContrastCSS() {
  const { highContrast } = useHighContrast()

  useEffect(() => {
    // Função para carregar ou remover a folha de estilo de alto contraste
    const handleHighContrastStyles = () => {
      // Verifica se já existe um link para o CSS de alto contraste
      const existingLink = document.querySelector('link[data-high-contrast-css="true"]')

      if (highContrast) {
        // Se já existir, não faz nada
        if (existingLink) return
        
        // Cria um link para o CSS de alto contraste
        const linkElement = document.createElement('link')
        linkElement.rel = 'stylesheet'
        linkElement.href = '/styles/high-contrast.css'
        linkElement.setAttribute('data-high-contrast-css', 'true')
        
        // Adiciona ao cabeçalho
        document.head.appendChild(linkElement)
        
        // Garante que a classe high-contrast esteja aplicada ao html
        document.documentElement.classList.add('high-contrast')
        document.documentElement.classList.remove('normal-contrast')
      } else {
        // Se o modo de alto contraste estiver desativado e existir o link, remove-o
        if (existingLink) {
          existingLink.remove()
        }
        
        // Garante que a classe high-contrast seja removida do html
        document.documentElement.classList.remove('high-contrast')
        document.documentElement.classList.add('normal-contrast')
      }
    }

    // Chama a função imediatamente
    handleHighContrastStyles()

    // Retorna uma função de limpeza
    return () => {
      const linkElement = document.querySelector('link[data-high-contrast-css="true"]')
      if (linkElement) {
        linkElement.remove()
      }
    }
  }, [highContrast])

  // Não renderiza nada visível, apenas manipula o DOM
  return null
} 