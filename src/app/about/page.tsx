import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Publication & Editorial Board | RPMEngine',
  description: 'Learn about our editorial integrity, research methodology, and monetization testing lab.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          Editorial Integrity & Standards
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About RPMEngine
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We publish verified technical guides, yield analysis, and performance architectures for digital publishers and developers.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Editorial Philosophy
        </h2>
        <p>
          Every article published on RPMEngine adheres to a zero-fluff standard. We do not use automated filler content. Every guide is vetted for technical accuracy, reproducible steps, and verified benchmarks.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          The Research Lab
        </h2>
        <p>
          Our team tests real-world Core Web Vitals, CLS containment methods, and bidding mechanics across millions of monthly impressions. When we recommend a layout configuration, it has been tested against real user metrics.
        </p>
      </div>
    </div>
  );
}
