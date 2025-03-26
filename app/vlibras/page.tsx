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

const Container = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

const Head = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
) 