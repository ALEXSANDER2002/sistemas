'use client'

import { useState, useEffect } from 'react';
import VLibrasComponent from '@djpfs/react-vlibras';

export default function VLibras() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <VLibrasComponent forceOnload={true} />
  );
} 