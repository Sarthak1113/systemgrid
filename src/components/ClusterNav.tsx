import React from 'react';
import Link from 'next/link';
import { PostMeta } from '../lib/posts';

interface ClusterNavProps {
  currentSlug: string;
  clusterTitle: string;
  pillarPost?: PostMeta;
  spokePosts: PostMeta[];
}

export function ClusterNav({
  currentSlug,
  clusterTitle,
  pillarPost,
  spokePosts,
}: ClusterNavProps) {
  return (
    <div className="my-8 rounded-2xl border border-[#047857]/20 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 p-6 shadow-xs dark:from-emerald-950/20 dark:via-slate-900/50 dark:to-slate-900 dark:border-[#047857]/30">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#047857] text-[11px] font-bold text-white shadow-xs">
            ★
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Topic Cluster: {clusterTitle}
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-[#047857] bg-emerald-100/80 px-2.5 py-0.5 rounded-full dark:bg-emerald-900/50 dark:text-emerald-300">
          Core Series
        </span>
      </div>

      <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">
        This article is part of our engineered topic hub. Follow the complete cluster to understand both strategy and implementation:
      </p>

      <ul className="space-y-2.5">
        {pillarPost && (
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-xs font-bold text-[#047857] dark:text-emerald-400">
              [Pillar Hub]
            </span>
            {pillarPost.slug === currentSlug ? (
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {pillarPost.title} (You are here)
              </span>
            ) : (
              <Link
                href={`/blog/${pillarPost.slug}`}
                className="text-xs font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[#047857] dark:text-slate-300 dark:hover:text-emerald-400"
              >
                {pillarPost.title}
              </Link>
            )}
          </li>
        )}

        {spokePosts.map((spoke, idx) => {
          const isCurrent = spoke.slug === currentSlug;
          return (
            <li key={spoke.slug} className="flex items-start gap-2">
              <span className="mt-0.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
                0{idx + 1}.
              </span>
              {isCurrent ? (
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {spoke.title} (You are here)
                </span>
              ) : (
                <Link
                  href={`/blog/${spoke.slug}`}
                  className="text-xs font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[#047857] dark:text-slate-300 dark:hover:text-emerald-400"
                >
                  {spoke.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
