import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAuthorBySlug, getPostsByAuthor } from '../../../lib/posts';
import { slugify } from '../../../lib/markdown';
import { Breadcrumbs } from '../../../components/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { slug: 'meera-nair' },
    { slug: 'meera-negi' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) return {};

  return {
    title: `${author.name} - ${author.title} | SystemGrid`,
    description: author.bio,
    alternates: {
      canonical: `/author/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} | SystemGrid`,
      description: author.bio,
      url: `https://systemgrid.dev/author/${author.slug}`,
      images: [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} | SystemGrid`,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(slug);
  const siteUrl = 'https://systemgrid.dev';

  const authorSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/author/${author.slug}#breadcrumb`,
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
            name: 'Authors',
            item: `${siteUrl}/author/${author.slug}`,
          },
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/author/${author.slug}`,
        url: `${siteUrl}/author/${author.slug}`,
        name: `${author.name} Author Profile | SystemGrid`,
        breadcrumb: {
          '@id': `${siteUrl}/author/${author.slug}#breadcrumb`,
        },
        mainEntity: {
          '@id': `${siteUrl}/author/${author.slug}#person`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/author/${author.slug}#person`,
        name: author.name,
        jobTitle: author.title,
        email: author.email || 'meeraegi@systemgrid.dev',
        worksFor: {
          '@type': 'Organization',
          name: 'SystemGrid',
          url: siteUrl,
        },
        image: `${siteUrl}${author.avatar}`,
        description: author.bio,
        knowsAbout: author.expertise,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Person & ProfilePage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: 'Authors', url: '/' },
            { name: author.name, url: `/author/${author.slug}` },
          ]}
        />

        {/* Author Bio Header Card */}
        <header className="my-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover ring-4 ring-[#047857]/20 shadow-md shrink-0"
            />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono">
                <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-[#047857] border border-emerald-200/80 dark:bg-emerald-950 dark:text-emerald-300">
                  Verified Specialist
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Technical Editor
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  E-E-A-T Certified
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {author.name}
              </h1>

              <p className="mt-1 text-sm sm:text-base font-semibold text-[#047857] dark:text-emerald-400">
                {author.title}
              </p>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                {author.bio}
              </p>

              {/* Areas of Expertise Chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {author.expertise.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700 border border-slate-200/70 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Direct Author Contact (Author Page Only) */}
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={`mailto:${author.email || 'meeraegi@systemgrid.dev'}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-700 hover:border-[#047857]/60 hover:text-[#047857] transition-all dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-emerald-400"
                >
                  <svg className="h-4 w-4 text-[#047857] dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{author.email || 'meeraegi@systemgrid.dev'}</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Published Articles Section */}
        <section className="my-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Articles &amp; Research by {author.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Showing {posts.length} verified technical publications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-[#047857]/50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <Link
                      href={`/category/${slugify(post.category)}`}
                      className="font-semibold text-[#047857] uppercase tracking-wide hover:underline font-mono"
                    >
                      {post.category}
                    </Link>
                    <span className="font-mono">{post.readingTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#047857] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 font-mono">
                    Published {post.publishedAt}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-[#047857] hover:text-[#065f46] dark:text-emerald-400"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
}
