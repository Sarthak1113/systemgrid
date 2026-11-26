import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SystemGrid | Built for Engineers Who Believe in Real-World Results',
  description: 'SystemGrid was born out of a simple frustration: finding reliable technical information shouldn’t be this difficult. Learn about our story, principles, and engineering mission.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About SystemGrid | Built for Engineers Who Believe in Real-World Results',
    description: 'SystemGrid was born out of a simple frustration: finding reliable technical information shouldn’t be this difficult. Learn about our story, principles, and engineering mission.',
    url: 'https://systemgrid.dev/about',
    siteName: 'SystemGrid',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SystemGrid | Built for Engineers Who Believe in Real-World Results',
    description: 'SystemGrid was born out of a simple frustration: finding reliable technical information shouldn’t be this difficult. Learn about our story, principles, and engineering mission.',
  },
};

export default function AboutPage() {
  const siteUrl = 'https://systemgrid.dev';

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/about#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: `${siteUrl}/about`,
          },
        ],
      },
      {
        '@type': 'AboutPage',
        '@id': `${siteUrl}/about`,
        url: `${siteUrl}/about`,
        name: 'About SystemGrid | Built for Engineers Who Believe in Real-World Results',
        description: 'SystemGrid was born out of a simple frustration: finding reliable technical information shouldn’t be this difficult. Learn about our story, principles, and engineering mission.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          name: 'SystemGrid',
          url: siteUrl,
        },
        breadcrumb: {
          '@id': `${siteUrl}/about#breadcrumb`,
        },
        about: {
          '@id': `${siteUrl}#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: 'SystemGrid',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo-light.png`,
        },
        email: 'contact@systemgrid.dev',
        description: 'Independent engineering publication providing verifiable benchmarks, cloud cost analysis, and systems intelligence.',
        founder: {
          '@type': 'Person',
          name: 'Meera Negi',
          jobTitle: 'Lead Tech & Systems Writer at SystemGrid',
          url: `${siteUrl}/author/meera-negi`,
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org AboutPage & Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]}
      />

      {/* Hero Narrative Section */}
      <header className="my-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#047857] border border-emerald-200/80 dark:bg-emerald-950 dark:text-emerald-300 mb-4 font-mono">
          <span>Our Story &amp; Principles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Built for Engineers Who Believe in Real-World Results
        </h1>
        <div className="mt-5 space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            SystemGrid was born out of a simple frustration: finding reliable technical information shouldn&apos;t be this difficult.
          </p>
          <p>
            From unexpected production issues and rising cloud costs to outdated tutorials and misleading technical advice, we saw how challenging it was for engineering teams to find trustworthy information. We wanted to change that. SystemGrid is our way of sharing practical engineering knowledge, real-world experiences, and honest technical insights that help developers make better decisions.
          </p>
        </div>
      </header>

      {/* Story Chapter 1: The Beginning */}
      <section className="my-12 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400 mb-2">
          <span>Chapter 01</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>The Beginning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Why We Started SystemGrid
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            As technology continues to evolve, the volume of technical content available online keeps expanding. However, more content doesn&apos;t necessarily mean better information. Developers often encounter outdated tutorials, repetitive advice, and solutions that may work in theory but fall short in actual production environments.
          </p>
          <p>
            We also noticed how easily teams can end up spending more than necessary on cloud infrastructure, choosing overly complicated architectures, or following recommendations that lack real-world backing. That&apos;s why we created SystemGrid.
          </p>
          <p>
            Our goal is to establish an independent engineering publication where practical experience takes precedence over marketing claims. We focus on sharing tested insights, simplifying complex systems, and helping engineers understand what truly works.
          </p>
        </div>
      </section>

      {/* Story Chapter 2: What We Believe */}
      <section className="my-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
            Chapter 02 • What We Believe
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Three Principles That Guide Our Work
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Everything we publish at SystemGrid follows three foundational principles that shape how we research, test, write, and share technical knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Principle 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-emerald-950 dark:text-emerald-400 font-mono font-bold text-sm mb-4">
                01
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                Principle 1
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Real Testing
              </h3>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 mb-2">
                Reproducible Benchmarks
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe that solid technical advice should be backed by evidence. Rather than relying on vendor claims or theoretical figures, we emphasize practical testing with clear configurations and measurable results.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono italic text-[#047857] dark:text-emerald-400">
              Test It. Measure It. Share It.
            </div>
          </div>

          {/* Principle 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-emerald-950 dark:text-emerald-400 font-mono font-bold text-sm mb-4">
                02
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                Principle 2
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Learning From Failures
              </h3>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 mb-2">
                Honest Incident Analysis
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Some of the most valuable engineering lessons come from failures. We investigate real-world outages, security incidents, and infrastructure failures to understand what occurred, why it happened, and how to prevent similar issues in the future.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono italic text-[#047857] dark:text-emerald-400">
              Understand the Failure. Improve the System.
            </div>
          </div>

          {/* Principle 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-emerald-950 dark:text-emerald-400 font-mono font-bold text-sm mb-4">
                03
              </div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                Principle 3
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Quality Over Quantity
              </h3>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 mb-2">
                Human-Reviewed Content
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We don&apos;t publish content to fill space. Every article should provide something useful. Our content is written, reviewed, and refined with a focus on technical accuracy, practical experience, and clear explanations.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono italic text-[#047857] dark:text-emerald-400">
              Less Noise. More Engineering Value.
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Lead & Mission Statement */}
      <section className="my-12 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 sm:p-8 dark:border-emerald-900/60 dark:bg-emerald-950/20 mb-8">
          <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            At SystemGrid, our mission is clear: to make technical knowledge more useful, reliable, and accessible for those building and maintaining modern systems.
          </p>
        </div>

        {/* Editorial Contact and Team Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="/authors/meera-negi.png"
              alt="Meera Negi - Lead Tech & Systems Writer at SystemGrid"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[#047857]/30 shadow-xs shrink-0"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Meera Negi
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lead Tech &amp; Systems Writer • <Link href="/author/meera-negi" className="text-[#047857] dark:text-emerald-400 hover:underline">View Author Page →</Link>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#047857] px-4 py-2 text-xs font-semibold text-white hover:bg-[#065f46] transition-colors shadow-xs"
            >
              <span>Contact Editorial Desk</span>
              <span>→</span>
            </Link>
            <a
              href="mailto:contact@systemgrid.dev"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span>contact@systemgrid.dev</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
