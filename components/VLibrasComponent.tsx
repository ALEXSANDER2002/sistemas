'use client'

import { useEffect } from 'react'

export default function VLibrasComponent() {
  useEffect(() => {
    // Adicionar div de widgets do VLibras
    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'vlibras-widget';
    document.body.appendChild(widgetDiv);

    return () => {
      // Cleanup
      const widgetDiv = document.getElementById('vlibras-widget');
      if (widgetDiv) {
        widgetDiv.remove();
      }
    };
  }, []);

  return null;
} 