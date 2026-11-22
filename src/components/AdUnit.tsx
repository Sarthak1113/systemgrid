'use client';

import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  minHeight?: string;
  label?: string;
  isTest?: boolean;
}

export function AdUnit({
  slotId = '1234567890',
  format = 'auto',
  className = '',
  minHeight = 'min-h-[250px]',
  label = 'Advertisement',
  isTest = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    // Only attempt to push ads in production or if not in test mock mode
    if (!isTest && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense slot execution deferred:', e);
      }
    }
  }, [isTest]);

  return (
    <div
      className={`group relative my-8 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 ${minHeight} ${className}`}
    >
      <div className="absolute top-2 right-3 flex items-center gap-1">
        <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
          {label}
        </span>
      </div>

      {isTest ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            AdSense Responsive Placement Slot
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Slot: {slotId} • Format: {format} • Shift-Protected Container
          </p>
        </div>
      ) : (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
