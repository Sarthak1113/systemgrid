import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SystemGrid | Our Story, Engineering Mission & Standards',
  description: 'The story behind SystemGrid: an independent technical publication dedicated to reproducible cloud benchmarks, distributed architecture, and zero-slop systems intelligence.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About SystemGrid | Story, Engineering Mission & Standards',
    description: 'The story behind SystemGrid: an independent technical publication dedicated to reproducible cloud benchmarks, distributed architecture, and zero-slop systems intelligence.',
    url: 'https://systemgrid.dev/about',
    siteName: 'SystemGrid',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SystemGrid | Story, Engineering Mission & Standards',
    description: 'The story behind SystemGrid: an independent technical publication dedicated to reproducible cloud benchmarks, distributed architecture, and zero-slop systems intelligence.',
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
        name: 'About SystemGrid | Our Story & Engineering Mission',
        description: 'The story behind SystemGrid: an independent technical publication dedicated to reproducible cloud benchmarks, distributed architecture, and zero-slop systems intelligence.',
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
          <span>Our Story &amp; Editorial Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Built for Engineers Who Value Verification Over Hype.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          SystemGrid was born out of late-night production outages, escalating cloud invoices, and a growing frustration with a web overflowing with synthetic marketing copy. Here is the story of why we exist and how we work.
        </p>
      </header>

      {/* Story Chapter 1: The Origin */}
      <section className="my-12 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400 mb-2">
          <span>Chapter 01</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>The Signal Crisis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Why We Started SystemGrid
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Between 2023 and 2026, the developer web experienced a quiet crisis. Search queries for technical problems began returning automated regurgitations of outdated StackOverflow threads. Tutorials recommended architectures that look elegant on whiteboard diagrams but catastrophically fail under production concurrency.
          </p>
          <p>
            We watched engineering teams spend hundreds of thousands of dollars on unvetted cloud migrations, oversized container clusters, and premature microservice splits—largely prompted by vendor-sponsored case studies masquerading as objective research.
          </p>
          <p>
            We founded <strong className="text-slate-900 dark:text-white">SystemGrid</strong> with a singular mission: to create a dedicated, independent engineering publication where <em>every recommendation is backed by reproducible logs</em>, <em>every architectural breakdown is grounded in real production constraints</em>, and <em>every claim can be audited</em>.
          </p>
        </div>
      </section>

      {/* Story Chapter 2: Our Three Pillars */}
      <section className="my-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400">
            Chapter 02 • Core Principles
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            The Three Laws of SystemGrid
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Every article, benchmark, and incident breakdown on our site adheres to three non-negotiable standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-emerald-950 dark:text-emerald-400 font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Reproducible Benchmarks
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We do not quote vendor slide decks. When we measure container memory thresholds, cold-start latency, or proxy overhead, we run tests on isolated instances with open parameters and share exact configurations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
              Verified Metrics Only
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-emerald-950 dark:text-emerald-400 font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Forensic Incident Analysis
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The best architecture lessons come from systems that failed. We dissect security breaches, credit-rating dependencies, and cloud outages with objective technical rigor to help systems architects prevent similar collapses.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
              Post-Mortem Reality
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#047857] dark:bg-emerald-950 dark:text-emerald-400 font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Zero AI Slop
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We reject superficial fluff. Every article published under our banner is drafted, technically scrutinized, and reviewed by human engineers with verifiable hands-on experience in cloud and distributed infrastructure.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
              Human-Curated E-E-A-T
            </div>
          </div>
        </div>
      </section>

      {/* Story Chapter 3: Editorial Team & E-E-A-T */}
      <section className="my-12 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400 mb-2">
          <span>Chapter 03</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Editorial Leadership</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Meet the Voices Behind the Grid
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Credibility requires accountability. Every guide published on SystemGrid is attributed to an author with direct domain expertise and open contact channels.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src="/authors/meera-negi.png"
              alt="Meera Negi - Lead Tech & Systems Writer at SystemGrid"
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-4 ring-[#047857]/20 shadow-md shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-1.5">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-[#047857] border border-emerald-200/80 dark:bg-emerald-950 dark:text-emerald-300">
                  Lead Tech &amp; Systems Writer
                </span>
                <span className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  E-E-A-T Verified
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Meera Negi
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Lead Technology Writer and Technical Editor at SystemGrid. Specializing in cloud infrastructure, Linux systems optimization, DevOps automation, web security, and incident analysis. Previously focused on systems documentation for enterprise SaaS teams and an active contributor to open infrastructure playbooks.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/author/meera-negi"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#047857] hover:text-[#065f46] dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline"
                >
                  <span>View Author Profile &amp; Research</span>
                  <span>→</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href="mailto:meeraegi@systemgrid.dev"
                  className="text-xs font-mono text-slate-500 hover:text-[#047857] dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  meeraegi@systemgrid.dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Chapter 4: The Path Forward & Contact */}
      <section className="my-12 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-[#047857] dark:text-emerald-400 mb-2">
          <span>Chapter 04</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Get in Touch</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Join Us on the Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Whether you are managing a Kubernetes fleet across three cloud regions, optimizing a high-throughput event pipeline, or evaluating next-generation AI coding agents, SystemGrid is built to be your reliable reference point.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#047857] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#065f46] transition-colors shadow-sm"
          >
            <span>Contact Our Editorial Desk</span>
            <span>→</span>
          </Link>
          <a
            href="mailto:contact@systemgrid.dev"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <span>contact@systemgrid.dev</span>
          </a>
        </div>
      </section>
    </div>
  );
}
