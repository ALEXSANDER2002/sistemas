import './globals.css'
import './styles/high-contrast.css'
import './styles/vlibras.css'
import { HighContrastProvider } from '@/components/HighContrastContext'
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from 'next/dynamic'
import { externalLinks } from './config/external-links'
import type { Metadata } from "next"

// Importação dinâmica do VLibras para evitar problemas de SSR
const VLibras = dynamic(() => import('vlibras-nextjs'), {
  ssr: false,
})

// Componente de desenvolvimento só é carregado em ambiente de desenvolvimento
const DevVLibras = dynamic(() => import('@/components/DevVLibras'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'UNIFESSPA - Sistemas Institucionais',
  description: 'Portal de Sistemas Institucionais da Universidade Federal do Sul e Sudeste do Pará',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href={externalLinks.fontAwesome.url}
          integrity={externalLinks.fontAwesome.integrity}
          crossOrigin={externalLinks.fontAwesome.crossOrigin}
          referrerPolicy={externalLinks.fontAwesome.referrerPolicy}
        />
      </head>
      <body>
        <HighContrastProvider>
          <ThemeProvider>
            {children}
            {/* O VLibras só funciona em produção com Next.js */}
            {process.env.NODE_ENV === 'production' ? (
              <VLibras forceOnload />
            ) : (
              <DevVLibras />
            )}
          </ThemeProvider>
        </HighContrastProvider>
      </body>
    </html>
  )
}