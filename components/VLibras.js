'use client'

import { useEffect } from 'react'

export default function VLibras() {
  useEffect(() => {
    // Adicionar div de widgets do VLibras
    const widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('vw', 'plugin');
    widgetDiv.className = 'enabled';
    
    // Adicionar o botão de acesso
    const accessButton = document.createElement('div');
    accessButton.setAttribute('vw-access-button', '');
    accessButton.className = 'active';
    widgetDiv.appendChild(accessButton);
    
    // Adicionar o wrapper do plugin
    const pluginWrapper = document.createElement('div');
    pluginWrapper.setAttribute('vw-plugin-wrapper', '');
    widgetDiv.appendChild(pluginWrapper);
    
    document.body.appendChild(widgetDiv);

    // Inicializar o VLibras (já carregado via _document.js)
    setTimeout(() => {
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    }, 1000);

    return () => {
      // Cleanup
      const widgetDiv = document.querySelector('div[vw="plugin"]');
      if (widgetDiv) {
        widgetDiv.remove();
      }
    };
  }, []);

  return null;
} 