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
    <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
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
              <li className={isLast ? "max-w-[150px] sm:max-w-xs md:max-w-md truncate" : ""}>
                {isLast ? (
                  <span
                    aria-current="page"
                    className="truncate font-medium text-slate-700 dark:text-slate-300 block"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="transition-colors hover:text-slate-800 dark:hover:text-slate-200 whitespace-nowrap"
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
