import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { siteDescription, siteName, siteUrl } from '@/lib/shared';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: 'Pandabase', url: 'https://pandabase.io' }],
  publisher: 'Pandabase',
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_US',
    url: '/',
    images: [{ url: '/og/docs/image.png', width: 1200, height: 630, alt: siteName, type: 'image/png' }],
  },
  twitter: { card: 'summary_large_image', site: '@pandabasehq', creator: '@pandabasehq' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = {
  // discord uses the first theme-color as the embed accent
  themeColor: '#2bd576',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} font-sans`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
