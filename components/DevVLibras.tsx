'use client'

import { useState } from 'react'

export default function DevVLibras() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="vlibras-dev">
      <button 
        className="vlibras-dev-button"
        onClick={() => setVisible(!visible)}
        title="VLibras (simulado para desenvolvimento)"
      >
        <svg width="24" height="24" viewBox="0 0 40 40" fill="#fff">
          <path d="M20.201 25.324c-1.963-2.562-4.139-5.523-4.72-7.025 0 2.613-1.837 7.56-2.89 9.639l.463.456c.618 1.925 1.735 3.713 3.318 5.294l-.829 4.571s3.359 1.562 4.12.34a91.42 91.42 0 0 1 3.854-6.133c-.345 3.451-1.54 6.422-3.637 8.521l2.65.19c1.59-1.384 2.944-3.106 4.002-5.099 1.771-3.33 2.365-7.732 2.365-7.732l-4.493-5ulDIyLjMxMmMyNC42NDNhMTkuNDQgMTkuNDQgMCAwIDAgMS43MjQtMy4xOTVjLTEuNjEgMS4wMTEtMy42MjMgMS45MzQtMy42MjMgMS45MzRzLjk4NC0yLjE1NCAxLjQ4Mi00LjM0NWMuNDk4LTIuMTkyLjU5Ni00Ljc5Mi41MTktNi4wMzYgMCAwLTIuNDA1LjM5OC0zLjIxMy42NzV6" />
          <path d="M20.088 0C8.995 0 0 8.994 0 20.088c0 11.093 8.996 20.087 20.088 20.087 11.092 0 20.087-8.994 20.087-20.087S31.18 0 20.088 0zm0 37.877c-9.81 0-17.79-7.98-17.79-17.79 0-9.81 7.98-17.79 17.79-17.79 9.809 0 17.789 7.98 17.789 17.79 0 9.81-7.98 17.79-17.789 17.79z" />
        </svg>
      </button>

      {visible && (
        <div className="vlibras-dev-modal">
          <div className="vlibras-dev-modal-header">
            <h3>VLibras (Ambiente de Desenvolvimento)</h3>
            <button onClick={() => setVisible(false)}>×</button>
          </div>
          <div className="vlibras-dev-modal-body">
            <p>
              O VLibras só funciona em produção com o Next.js.
              Em ambiente de desenvolvimento, este é apenas um substituto visual.
            </p>
            <p>
              Para ver o VLibras funcionando, execute a aplicação em modo de produção:
              <br />
              <code>pnpm build && pnpm start</code>
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 