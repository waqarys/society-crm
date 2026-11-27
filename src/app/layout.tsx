import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Society CRM',
  description: 'Personal housing society tracker and lead CRM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
