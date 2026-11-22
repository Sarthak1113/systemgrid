import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-slate-800 dark:hover:text-slate-200"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.url}>
              <li className="text-slate-300 dark:text-slate-600">/</li>
              <li>
                {isLast ? (
                  <span
                    aria-current="page"
                    className="max-w-[260px] truncate font-medium text-slate-700 sm:max-w-md dark:text-slate-300"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="transition-colors hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
