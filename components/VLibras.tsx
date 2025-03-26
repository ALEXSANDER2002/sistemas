'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Carregando o componente VLibras de forma dinâmica
const VLibrasWidget = dynamic(() => import('@djpfs/react-vlibras'), { 
  ssr: false,  // Importante: desativa renderização no servidor
  loading: () => <div style={{ display: 'none' }}>Carregando VLibras...</div>
});

export default function VLibras() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Só renderiza no cliente
  if (!mounted) return null;
  
  return <VLibrasWidget />;
} 