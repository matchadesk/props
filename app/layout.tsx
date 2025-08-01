import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prop Trading Firm FAQ',
  description: 'Compare proprietary trading firms and their programs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white transition-colors duration-200`}>
        <div className="min-h-screen">
          <header className="bg-gray-900 border-b border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <h1 className="text-2xl font-bold text-white">
                  Prop Trading Firms
                </h1>
              </div>
            </div>
          </header>
          <main className="max-w-[1600px] mx-auto px-1 sm:px-2 lg:px-4 py-4 bg-gray-900 text-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 