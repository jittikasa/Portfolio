import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jittika — Creative Developer & Designer',
  description: 'Crafting thoughtful digital experiences through iOS apps, design, and creative exploration. Creator of Shellist and PolaMoment.',
  keywords: ['iOS developer', 'app designer', 'creative developer', 'Shellist', 'PolaMoment'],
  authors: [{ name: 'Jittika' }],
  openGraph: {
    title: 'Jittika — Creative Developer & Designer',
    description: 'Crafting thoughtful digital experiences through iOS apps, design, and creative exploration.',
    url: 'https://jittika.com',
    siteName: 'Jittika',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jittika — Creative Developer & Designer',
    description: 'Crafting thoughtful digital experiences through iOS apps, design, and creative exploration.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
