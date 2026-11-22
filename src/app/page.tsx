import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import { AdUnit } from '../components/AdUnit';

export default function HomePage() {
  const posts = getAllPosts();
  const pillarPost = posts.find((p) => p.isPillar) || posts[0];
  const spokePosts = posts.filter((p) => !p.isPillar);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Billboard Leaderboard Ad (Disabled until Publisher ID is added) */}
      <div className="mx-auto max-w-4xl">
        <AdUnit
          slotId="header-leaderboard"
          format="horizontal"
          minHeight="min-h-[100px]"
          label="Sponsor"
        />
      </div>

      {/* Hero Section */}
      <section className="my-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-[#047857] border border-emerald-200/80 dark:bg-emerald-950 dark:text-emerald-300 mb-4">
          <span>Enterprise Cloud & Systems Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          SystemGrid Technical Intelligence
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Verifiable infrastructure benchmarks, distributed systems architecture, zero-CLS performance optimization, and high-yield cloud monetization.
        </p>
      </section>

      {/* Featured Pillar Hub */}
      {pillarPost && (
        <section className="my-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="rounded-full bg-[#047857] px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                Core Pillar Guide
              </span>
              <span className="text-xs text-slate-400">
                {pillarPost.readingTime} • Updated {pillarPost.updatedAt}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              <Link
                href={`/blog/${pillarPost.slug}`}
                className="hover:text-[#047857] transition-colors"
              >
                {pillarPost.title}
              </Link>
            </h2>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              {pillarPost.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={pillarPost.author.avatar}
                  alt={pillarPost.author.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-[#047857]/30"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {pillarPost.author.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {pillarPost.author.title}
                  </p>
                </div>
              </div>

              <Link
                href={`/blog/${pillarPost.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#047857] transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-[#047857] dark:hover:text-white"
              >
                Read Master Guide →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Spoke Articles Grid (Internal Linking Hub) */}
      <section className="my-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Topic Cluster: Implementation Spokes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Technical walkthroughs and performance benchmarks connected to the master playbook.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spokePosts.map((spoke) => (
            <article
              key={spoke.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-[#047857]/50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="font-semibold text-[#047857] uppercase tracking-wide">
                    {spoke.category}
                  </span>
                  <span>{spoke.readingTime}</span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  <Link
                    href={`/blog/${spoke.slug}`}
                    className="hover:text-[#047857] transition-colors"
                  >
                    {spoke.title}
                  </Link>
                </h4>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {spoke.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-[11px] font-medium text-slate-400">
                  Published {spoke.publishedAt}
                </span>
                <Link
                  href={`/blog/${spoke.slug}`}
                  className="text-xs font-semibold text-[#047857] hover:text-[#065f46] dark:text-emerald-400"
                >
                  Explore Guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mid-Page Display Ad Unit (Disabled until Publisher ID is set) */}
      <div className="my-12 max-w-4xl mx-auto">
        <AdUnit
          slotId="home-feed-banner"
          format="horizontal"
          minHeight="min-h-[140px]"
          label="Advertisement"
        />
      </div>
    </div>
  );
}
