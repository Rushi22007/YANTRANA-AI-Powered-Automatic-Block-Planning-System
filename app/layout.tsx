import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import { FiltersProvider } from '@/lib/filters'
import { AppShell } from '@/components/shell/app-shell'
import { RailMitraProvider } from '@/lib/yentrana/context/yentrana-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-jb', display: 'swap' })

export const metadata: Metadata = {
  title: 'AI Powered Automatic Block Planning System',
  description:
    'Decision-support prototype for AI-assisted railway maintenance block planning - assets, equipment, and constraints.',
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7fb' },
    { media: '(prefers-color-scheme: dark)', color: '#16181f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <TooltipProvider>
          <FiltersProvider>
            <RailMitraProvider>
              <AppShell>{children}</AppShell>
            </RailMitraProvider>
          </FiltersProvider>
        </TooltipProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
