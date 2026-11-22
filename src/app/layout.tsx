import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Logo } from '../components/Logo';
import './globals.css';

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
    <html lang="en" className="scroll-smooth">
      <head>
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
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-[#047857] selection:text-white dark:bg-slate-950 dark:text-slate-100 flex flex-col">
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
              <Logo width={160} height={30} />
            </Link>

            <div className="flex items-center gap-5">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-600 hover:text-[#047857] dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#047857] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#065f46] transition-colors"
              >
                Contact
              </Link>
            </div>


          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <Logo width={150} height={28} />
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                  Independent technical publishing platform engineering verifiable benchmarks, distributed architecture guides, and cloud infrastructure optimization blueprints.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200 mb-3">
                  Topic Hubs
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li>
                    <Link href="/blog/enterprise-cloud-architecture-playbook" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Multi-Region Cloud Architecture
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/docker-container-memory-optimization-guide" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Docker Memory & Cost Optimization
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/cloudflare-workers-vs-aws-lambda-edge-benchmarks" className="hover:text-[#047857] dark:hover:text-emerald-400">
                      Edge Compute Latency Benchmarks
                    </Link>
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
              <p>© 2026 SystemGrid. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
