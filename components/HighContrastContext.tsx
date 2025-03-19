"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HighContrastContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

export function HighContrastProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Carregar preferência salva
    const savedHighContrast = localStorage.getItem('highContrast');
    if (savedHighContrast === 'true') {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
      document.documentElement.classList.remove('normal-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newState = !prev;
      
      if (newState) {
        document.documentElement.classList.add('high-contrast');
        document.documentElement.classList.remove('normal-contrast');
      } else {
        document.documentElement.classList.add('normal-contrast');
        document.documentElement.classList.remove('high-contrast');
      }

      // Salvar preferência
      localStorage.setItem('highContrast', newState.toString());
      return newState;
    });
  };

  return (
    <HighContrastContext.Provider value={{ highContrast, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  );
}

export function useHighContrast() {
  const context = useContext(HighContrastContext);
  if (context === undefined) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
} 