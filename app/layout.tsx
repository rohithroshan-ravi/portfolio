import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Rohithroshan R - Full Stack Developer',
  description: 'Portfolio of Rohithroshan R - React, Next.js, and Full Stack Development',
  keywords: ['React', 'Next.js', 'TypeScript', 'Full Stack', 'Web Development'],
  authors: [{ name: 'Rohithroshan R' }],
  openGraph: {
    title: 'Rohithroshan R - Full Stack Developer',
    description: 'Portfolio of Rohithroshan R',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#050810" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden bg-bg-primary">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
