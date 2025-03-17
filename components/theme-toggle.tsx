"use client"

import { Zap, ZapOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface ThemeToggleProps {
  onThemeChange?: (isHighContrast: boolean) => void;
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const { contrast, setContrast } = useTheme()

  const handleContrastChange = () => {
    const newContrast = contrast === "normal" ? "high" : "normal"
    setContrast(newContrast)
    onThemeChange?.(newContrast === "high")
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleContrastChange}
        className="text-white hover:bg-[#1351B4] focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-1 focus:ring-offset-[#071D41]"
      >
        {contrast === "normal" ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
        <span className="ml-2 text-xs">{contrast === "normal" ? "Alto Contraste" : "Contraste Normal"}</span>
        <VisuallyHidden>{contrast === "normal" ? "Ativar alto contraste" : "Desativar alto contraste"}</VisuallyHidden>
      </Button>
    </div>
  )
}

