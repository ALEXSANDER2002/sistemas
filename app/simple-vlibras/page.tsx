'use client'

import VLibras from '@djpfs/react-vlibras'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Sample</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <VLibras />
    </Container>
  )
}

// Componente Container simples
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {children}
    </div>
  )
}

// Componente Head simples para simular o exemplo
function Head({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
} 