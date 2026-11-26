'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

export function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <Logo width={160} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {!isHomepage && (
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-[#047857] dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
          )}
          <Link
            href="/about"
            className="text-xs font-semibold text-slate-600 hover:text-[#047857] dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
          >
            About
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
  );
}
