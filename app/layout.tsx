import './globals.css'
import './styles/high-contrast.css'
import { HighContrastProvider } from '@/components/HighContrastContext'
import { ThemeProvider } from "@/components/theme-provider"
import VLibras from '@/components/VLibras'
import { externalLinks } from './config/external-links'
import type { Metadata } from "next"

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
            <VLibras />
          </ThemeProvider>
        </HighContrastProvider>
      </body>
    </html>
  )
}