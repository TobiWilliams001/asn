import './globals.css'
import type { Metadata } from 'next'
import { open_sans } from '../styles/font'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'African Student Network',
  description: 'We are equipping African students for global relevance central to career development, entrepreneur and leadership by building a viable network of change makers across diverse universities in Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}