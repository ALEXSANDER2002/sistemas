"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HighContrastContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

export function HighContrastProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Efeito que executa apenas uma vez durante a montagem do componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Carregar preferência salva
        const savedHighContrast = localStorage.getItem('highContrast');
        const initialState = savedHighContrast === 'true';
        
        setHighContrast(initialState);
        
        // Aplicar as classes conforme o estado inicial
        if (initialState) {
          document.documentElement.classList.add('high-contrast');
          document.documentElement.classList.remove('normal-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
          document.documentElement.classList.add('normal-contrast');
        }
        
        // Marcar como inicializado
        setIsInitialized(true);
      } catch (error) {
        console.error('Erro ao inicializar o modo de alto contraste:', error);
        // Em caso de erro, garantir que o modo padrão seja aplicado
        document.documentElement.classList.remove('high-contrast');
        document.documentElement.classList.add('normal-contrast');
        setIsInitialized(true);
      }
    }
  }, []);

  // Função para alternar o modo de alto contraste de forma segura
  const toggleHighContrast = () => {
    if (!isInitialized) return; // Evita alternar antes da inicialização completa
    
    setHighContrast(prevState => {
      const newState = !prevState;
      
      try {
        // Aplica as classes com base no novo estado
        if (newState) {
          document.documentElement.classList.add('high-contrast');
          document.documentElement.classList.remove('normal-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
          document.documentElement.classList.add('normal-contrast');
        }
        
        // Salva a preferência no localStorage
        localStorage.setItem('highContrast', newState.toString());
      } catch (error) {
        console.error('Erro ao alternar o modo de alto contraste:', error);
      }
      
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