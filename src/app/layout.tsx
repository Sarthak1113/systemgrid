import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'AdSense High-RPM Publishing Network | Data-Driven Content',
  description: 'Engineered topic clusters, zero-CLS AdSense placements, and high-information-gain technical content.',
  metadataBase: new URL('https://your-domain.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AdSense High-RPM Publishing Network',
    description: 'Engineered topic clusters and zero-CLS AdSense placements.',
    type: 'website',
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
        {/* Replace ca-pub-XXXXXXXXXXXXXXXX with your approved AdSense Publisher ID */}
        <Script
          id="adsense-client"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-100 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 font-extrabold text-white shadow-md group-hover:scale-105 transition-transform">
                ▲
              </span>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  RPM<span className="text-emerald-600">Engine</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 -mt-1">
                  AdSense Network
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link href="/blog/ad-monetization-playbook-2026" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Pillar Guide
              </Link>
              <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                About & Editorial Team
              </Link>
              <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Network
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer (Essential for AdSense Approval) */}
        <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  RPM<span className="text-emerald-600">Engine</span>
                </span>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                  An engineered, high-performance publishing platform built on Next.js, optimized for zero layout shift, maximum AdSense yield, and rigorous editorial standards.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200 mb-3">
                  Pillars & Topics
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li>
                    <Link href="/blog/ad-monetization-playbook-2026" className="hover:text-emerald-600">
                      AdSense Revenue Playbook
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/nextjs-adsense-cls-optimization" className="hover:text-emerald-600">
                      Next.js Zero-CLS Architecture
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/top-high-rpm-niches-ranked" className="hover:text-emerald-600">
                      High-RPM Niche Benchmarks
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200 mb-3">
                  Mandatory Compliance
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li>
                    <Link href="/privacy-policy" className="hover:text-emerald-600">
                      Privacy Policy & Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-emerald-600">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclaimer" className="hover:text-emerald-600">
                      Advertising Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-emerald-600">
                      Editorial & E-E-A-T Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:border-slate-800">
              <p>© 2026 RPMEngine. All rights reserved.</p>
              <p>Designed for Vercel Edge Deployment & GitHub Actions Automation.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
