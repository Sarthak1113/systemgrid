'use client';

import React, { useEffect, useRef } from 'react';

/**
 * AdSense Master Configuration
 * Currently DISABLED until Google AdSense Publisher ID is provided.
 * When disabled, this component renders null so no placeholder boxes or layout shifts appear.
 */
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';
const ADSENSE_ENABLED = Boolean(ADSENSE_PUB_ID && ADSENSE_PUB_ID.startsWith('ca-pub-'));

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  minHeight?: string;
  label?: string;
}

export function AdUnit({
  slotId = '',
  format = 'auto',
  className = '',
  minHeight = 'min-h-[250px]',
  label = 'Advertisement',
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (ADSENSE_ENABLED && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense slot execution error:', e);
      }
    }
  }, []);

  // Return null when AdSense is disabled: zero DOM clutter, zero placeholders
  if (!ADSENSE_ENABLED) {
    return null;
  }

  return (
    <div
      className={`relative my-8 flex items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/60 ${minHeight} ${className}`}
    >
      <span className="absolute top-2 right-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
        {label}
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
