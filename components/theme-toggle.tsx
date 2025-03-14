"use client"

import { Moon, Sun, Zap, ZapOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface ThemeToggleProps {
  onThemeChange?: (isDark: boolean, isHighContrast: boolean) => void;
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const { theme, contrast, setTheme, setContrast } = useTheme()

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    onThemeChange?.(newTheme === "dark", contrast === "high")
  }

  const handleContrastChange = () => {
    const newContrast = contrast === "normal" ? "high" : "normal"
    setContrast(newContrast)
    onThemeChange?.(theme === "dark", newContrast === "high")
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleThemeChange}
        className="text-white hover:bg-[#1351B4] focus:ring-2 focus:ring-[#FFCD07] focus:ring-offset-1 focus:ring-offset-[#071D41]"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="ml-2 text-xs">{theme === "light" ? "Modo Escuro" : "Modo Claro"}</span>
        <VisuallyHidden>{theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}</VisuallyHidden>
      </Button>

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

