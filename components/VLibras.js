'use client'

import { useEffect } from 'react'

export default function VLibras() {
  useEffect(() => {
    const loadVLibras = () => {
      // Verificar se já existe o div do VLibras
      if (document.querySelector('div[vw="plugin"]')) {
        return;
      }

      // Adicionar div de widgets do VLibras
      const widgetDiv = document.createElement('div');
      widgetDiv.setAttribute('vw', 'plugin');
      widgetDiv.setAttribute('id', 'vlibras-widget');
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

      // Carregar o script diretamente (para garantir que funcione no App Router)
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras.js';
      script.async = true;
      script.defer = true;
      script.id = 'vlibras-script';
      script.onload = () => {
        // Inicializar o VLibras após o script carregar
        if (window.VLibras) {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };
      document.head.appendChild(script);
    };

    // Carregar após um pequeno delay para garantir que o DOM esteja pronto
    setTimeout(loadVLibras, 1000);

    return () => {
      // Cleanup
      const widgetDiv = document.getElementById('vlibras-widget');
      if (widgetDiv) {
        widgetDiv.remove();
      }

      const script = document.getElementById('vlibras-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return null;
} 