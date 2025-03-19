import { useState, useEffect } from 'react';

export function useHighContrast() {
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
    const newState = !highContrast;
    setHighContrast(newState);

    if (newState) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.classList.remove('normal-contrast');
    } else {
      document.documentElement.classList.add('normal-contrast');
      document.documentElement.classList.remove('high-contrast');
    }

    // Salvar preferência
    localStorage.setItem('highContrast', newState.toString());
  };

  return { highContrast, toggleHighContrast };
} 