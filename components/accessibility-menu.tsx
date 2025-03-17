"use client"

/**
 * Menu de Acessibilidade
 *
 * Este componente fornece controles de acessibilidade para o usuário:
 * - Alternância de alto contraste
 * - Ajuste de tamanho de fonte
 * - Acesso ao VLibras
 *
 * Inclui suporte completo para leitores de tela e navegação por teclado.
 */

import { useState, useEffect } from "react"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface AccessibilityMenuProps {
  onAnnounce?: (message: string) => void
  className?: string
}

// Constantes para controle do tamanho da fonte
const MIN_FONT_SIZE = 14
const MAX_FONT_SIZE = 20
const FONT_SIZE_STEP = 1
const DEFAULT_FONT_SIZE = 16

export function AccessibilityMenu({ onAnnounce, className = "" }: AccessibilityMenuProps) {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)

  // Inicializar com as preferências salvas
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFontSize = localStorage.getItem("fontSize")
      if (savedFontSize) {
        const size = Number.parseInt(savedFontSize, 10)
        // Garante que o tamanho salvo está dentro dos limites
        const validSize = Math.min(Math.max(size, MIN_FONT_SIZE), MAX_FONT_SIZE)
        setFontSize(validSize)
        document.documentElement.style.fontSize = `${validSize}px`
      }
    }
  }, [])

  // Aumentar tamanho da fonte
  const increaseFontSize = () => {
    if (fontSize < MAX_FONT_SIZE) {
      const newSize = Math.min(fontSize + FONT_SIZE_STEP, MAX_FONT_SIZE)
      setFontSize(newSize)

      if (typeof window !== "undefined") {
        document.documentElement.style.fontSize = `${newSize}px`
        localStorage.setItem("fontSize", newSize.toString())
      }

      if (onAnnounce) {
        if (newSize === MAX_FONT_SIZE) {
          onAnnounce("Tamanho máximo da fonte atingido")
        } else {
          onAnnounce(`Tamanho da fonte aumentado para ${newSize} pixels`)
        }
      }
    }
  }

  // Diminuir tamanho da fonte
  const decreaseFontSize = () => {
    if (fontSize > MIN_FONT_SIZE) {
      const newSize = Math.max(fontSize - FONT_SIZE_STEP, MIN_FONT_SIZE)
      setFontSize(newSize)

      if (typeof window !== "undefined") {
        document.documentElement.style.fontSize = `${newSize}px`
        localStorage.setItem("fontSize", newSize.toString())
      }

      if (onAnnounce) {
        if (newSize === MIN_FONT_SIZE) {
          onAnnounce("Tamanho mínimo da fonte atingido")
        } else {
          onAnnounce(`Tamanho da fonte diminuído para ${newSize} pixels`)
        }
      }
    }
  }

  // Anunciar mudanças de contraste
  const handleContrastChange = (isHighContrast: boolean) => {
    if (onAnnounce) {
      if (isHighContrast) {
        onAnnounce("Alto contraste ativado")
      } else {
        onAnnounce("Contraste normal ativado")
      }
    }
  }

  return (
    <nav
      id="accessibility-menu"
      aria-label="Menu de acessibilidade"
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {/* Controles de contraste */}
      <ThemeToggle onThemeChange={handleContrastChange} />

      {/* Controles de tamanho de fonte */}
      <Button
        onClick={increaseFontSize}
        variant="ghost"
        size="sm"
        disabled={fontSize >= MAX_FONT_SIZE}
        className="text-white hover:bg-[#1351B4] focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-1 focus:ring-offset-[#071D41] disabled:opacity-50"
        aria-label="Aumentar fonte"
      >
        <ZoomIn size={16} />
        <span className="ml-1 text-xs">A+</span>
        <VisuallyHidden>Aumentar tamanho da fonte</VisuallyHidden>
      </Button>

      <Button
        onClick={decreaseFontSize}
        variant="ghost"
        size="sm"
        disabled={fontSize <= MIN_FONT_SIZE}
        className="text-white hover:bg-[#1351B4] focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-1 focus:ring-offset-[#071D41] disabled:opacity-50"
        aria-label="Diminuir fonte"
      >
        <ZoomOut size={16} />
        <span className="ml-1 text-xs">A-</span>
        <VisuallyHidden>Diminuir tamanho da fonte</VisuallyHidden>
      </Button>
    </nav>
  )
}

