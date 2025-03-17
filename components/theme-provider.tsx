"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Contrast = "normal" | "high"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultContrast?: Contrast
}

interface ThemeProviderState {
  contrast: Contrast
  setContrast: (contrast: Contrast) => void
}

const initialState: ThemeProviderState = {
  contrast: "normal",
  setContrast: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultContrast = "normal" }: ThemeProviderProps) {
  const [contrast, setContrast] = useState<Contrast>(defaultContrast)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous classes
    root.classList.remove("normal-contrast", "high-contrast")

    // Add current contrast class
    root.classList.add(`${contrast}-contrast`)

    // Store preference
    localStorage.setItem("contrast", contrast)
  }, [contrast])

  // Load saved preference
  useEffect(() => {
    const savedContrast = localStorage.getItem("contrast") as Contrast

    if (savedContrast) setContrast(savedContrast)
  }, [])

  const value = {
    contrast,
    setContrast,
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

