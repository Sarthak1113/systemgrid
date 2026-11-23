import React from 'react';
import Link from 'next/link';
import { PostAuthor } from '../lib/posts';

interface AuthorBioProps {
  author: PostAuthor;
  updatedAt: string;
}

export function AuthorBio({ author, updatedAt }: AuthorBioProps) {
  return (
    <div className="my-10 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60 transition-all hover:border-[#047857]/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link href="/author/meera-negi" className="shrink-0 group">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#047857]/30 group-hover:ring-[#047857] transition-all"
          />
        </Link>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/author/meera-negi"
              className="group"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                Written by {author.name}
              </h4>
            </Link>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-[#047857] border border-emerald-200/80 dark:bg-emerald-950 dark:text-emerald-300">
              Verified Specialist
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {author.title} • Specializing in cloud infrastructure, Linux, DevOps automation, web security and incident analysis.
          </p>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-2 dark:border-slate-800/80">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Peer-reviewed and updated on {updatedAt}
            </p>
            <Link
              href="/author/meera-negi"
              className="text-xs font-semibold text-[#047857] hover:text-[#065f46] dark:text-emerald-400 inline-flex items-center gap-1 hover:underline"
            >
              View Author Profile &amp; Research →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
