import './globals.css'
import type { Metadata } from 'next'
import { open_sans } from '../styles/font'

export const metadata: Metadata = {
  title: 'African Student Network',
  description: 'We are equipping African students for global relevance central to career development, enterpreneur and leadership by building a viable network of change makers across diverse universities in Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={open_sans.className}>{children}</body>
    </html>
  )
}
