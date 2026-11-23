import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '../components/Navbar';
import { Logo } from '../components/Logo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';
const ADSENSE_ENABLED = Boolean(ADSENSE_PUB_ID && ADSENSE_PUB_ID.startsWith('ca-pub-'));

export const metadata: Metadata = {
  title: {
    default: 'SystemGrid | Cloud Architecture, DevOps & High-Performance Systems',
    template: '%s | SystemGrid',
  },
  description: 'Verified engineering benchmarks, distributed systems architecture, and cloud cost optimization playbooks.',
  metadataBase: new URL('https://systemgrid.dev'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: 'SystemGrid | Cloud Architecture & DevOps Intelligence',
    description: 'Verified engineering benchmarks, distributed systems architecture, and cloud cost optimization playbooks.',
    url: 'https://systemgrid.dev',
    siteName: 'SystemGrid',
    images: [
      {
        url: '/logo-light.png',
        width: 300,
        height: 57,
        alt: 'SystemGrid Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SystemGrid | Cloud Architecture & DevOps Intelligence',
    description: 'Verified engineering benchmarks and cloud cost optimization playbooks.',
    images: ['/logo-light.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google Tag (immediately after <head>) */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-TVCS773D"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());`,
          }}
        />

        {/* AdSense Publisher Script loads ONLY when a valid Publisher ID is provided */}
        {ADSENSE_ENABLED && (
          <Script
            id="adsense-client"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[#047857] selection:text-white dark:bg-slate-950 dark:text-slate-100 flex flex-col">
        {/* Dynamic Navigation Bar (Home hides on homepage, appears on subpages) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <Logo width={150} height={28} />
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200 mb-3">
                  Contact Us
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li>
                    <a
                      href="mailto:contact@systemgrid.dev"
                      className="font-medium text-slate-900 hover:text-[#047857] dark:text-slate-200 dark:hover:text-emerald-400 transition-colors"
                    >
                      contact@systemgrid.dev
                    </a>
                  </li>
                  <li className="pt-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">Address:</span>
                    <span>Babebir, Nuapada, Odisha</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200 mb-3">
                  Policy & Compliance
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li>
                    <Link href="/privacy-policy" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Privacy Policy & Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclaimer" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Advertising Disclosure
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Editorial Integrity & Verification
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:border-slate-800">
              <p className="flex items-center gap-2">
                <span>© 2026 SystemGrid. All rights reserved.</span>
                <span>•</span>
                <Link href="/sitemap.xml" className="hover:text-[#047857] dark:hover:text-emerald-400 underline underline-offset-2 transition-colors">
                  Sitemap
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
