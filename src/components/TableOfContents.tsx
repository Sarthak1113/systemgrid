'use client';

import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -70% 0%' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="rounded-xl border border-slate-200/90 bg-white/70 p-5 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
        <h3 className="text-xs font-bold tracking-wider text-slate-800 uppercase dark:text-slate-200">
          Table of Contents
        </h3>
        <span className="text-[11px] font-medium text-slate-400">
          {headings.length} sections
        </span>
      </div>

      <ul className="space-y-2 text-sm">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                className={`group flex items-start py-0.5 text-xs transition-colors duration-150 ${
                  isActive
                    ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span
                  className={`mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all ${
                    isActive
                      ? 'scale-125 bg-emerald-500'
                      : 'bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-700'
                  }`}
                />
                <span className="leading-snug">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
