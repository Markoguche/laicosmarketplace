import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/ui/Reveal';
import SmoothScroll from '@/components/providers/SmoothScroll';
import { SITE } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const DESCRIPTION =
  'LAICOS connects farmers, buyers and better opportunities. Discover quality agricultural produce from verified farms and source what you need through one trusted marketplace.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'LAICOS Farm — Fresh Produce. Trusted Farms.', template: '%s — LAICOS Farm' },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'LAICOS Farm',
    title: 'LAICOS Farm — Fresh Produce. Trusted Farms.',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0a976b' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* enables pre-paint reveal hiding only when JS is available */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
      </head>
      <body id="top">
        <a
          href="#main"
          data-lenis-ignore
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
