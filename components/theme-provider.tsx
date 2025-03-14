"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type Contrast = "normal" | "high"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultContrast?: Contrast
}

interface ThemeProviderState {
  theme: Theme
  contrast: Contrast
  setTheme: (theme: Theme) => void
  setContrast: (contrast: Contrast) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  contrast: "normal",
  setTheme: () => null,
  setContrast: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "light", defaultContrast = "normal" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [contrast, setContrast] = useState<Contrast>(defaultContrast)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous classes
    root.classList.remove("light", "dark", "normal-contrast", "high-contrast")

    // Add current theme and contrast classes
    root.classList.add(theme)
    root.classList.add(`${contrast}-contrast`)

    // Store preferences
    localStorage.setItem("theme", theme)
    localStorage.setItem("contrast", contrast)
  }, [theme, contrast])

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedContrast = localStorage.getItem("contrast") as Contrast

    if (savedTheme) setTheme(savedTheme)
    if (savedContrast) setContrast(savedContrast)
  }, [])

  const value = {
    theme,
    contrast,
    setTheme,
    setContrast,
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

