import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skyflipsplash',
  description: 'Skyflipsplash is a logistics company that provides a range of services to businesses and individuals.',
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
