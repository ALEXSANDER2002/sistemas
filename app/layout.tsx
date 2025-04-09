import './globals.css'
// O CSS de alto contraste será importado condicionalmente no componente
import './styles/vlibras.css'
import './styles/mobile.css'
import '@/app/styles/chatbot.css'
import { HighContrastProvider } from '@/components/HighContrastContext'
import { ThemeProvider } from "@/components/theme-provider"
import VLibrasManager from '@/components/VLibrasManager'
import { externalLinks } from './config/external-links'
import type { Metadata } from "next"
import Script from 'next/script'
import DynamicHighContrastCSS from '@/components/DynamicHighContrastCSS'
import ChatBot from '@/components/ChatBot'

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
        <Script src="/vlibras-config.js" strategy="beforeInteractive" />
      </head>
      <body>
        <HighContrastProvider>
          <ThemeProvider>
            {/* Carrega o CSS de alto contraste dinamicamente */}
            <DynamicHighContrastCSS />
            {children}
            <VLibrasManager />
            <ChatBot />
          </ThemeProvider>
        </HighContrastProvider>
      </body>
    </html>
  )
}