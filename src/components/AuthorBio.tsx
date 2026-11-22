import React from 'react';
import { PostAuthor } from '../lib/posts';

interface AuthorBioProps {
  author: PostAuthor;
  updatedAt: string;
}

export function AuthorBio({ author, updatedAt }: AuthorBioProps) {
  return (
    <div className="my-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
      <img
        src={author.avatar}
        alt={author.name}
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-emerald-500/30"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Written by {author.name}
          </h4>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Verified Specialist
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
          {author.title} • Specializing in web monetization systems, search algorithms, and display architecture.
        </p>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          Peer-reviewed and updated on {updatedAt}
        </p>
      </div>
    </div>
  );
}
