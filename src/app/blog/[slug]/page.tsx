import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../../lib/posts';
import { generateBlogPostGraphSchema } from '../../../lib/schema';
import { renderMarkdown, slugify } from '../../../lib/markdown';
import { AdUnit } from '../../../components/AdUnit';
import { TableOfContents } from '../../../components/TableOfContents';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { AuthorBio } from '../../../components/AuthorBio';
import { NewsletterForm } from '../../../components/NewsletterForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | SystemGrid`,
    description: post.description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://systemgrid.dev/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: '/logo-light.png',
          width: 300,
          height: 57,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/logo-light.png'],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.cluster, 3);

  const siteUrl = 'https://systemgrid.dev';
  const postGraphSchema = generateBlogPostGraphSchema(post, siteUrl);

  const htmlContent = renderMarkdown(post.content);

  return (
    <>
      {/* Search Engine & Answer Engine Structured Data (JSON-LD BreadcrumbList + Article Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postGraphSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Leaderboard Ad Slot (Disabled until Publisher ID is active) */}
        <div className="mx-auto max-w-4xl mb-6">
          <AdUnit
            slotId="article-top-leaderboard"
            format="horizontal"
            minHeight="min-h-[90px]"
            label="Sponsored Placement"
          />
        </div>

        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: post.category, url: `/category/${slugify(post.category)}` },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Article Header */}
        <header className="mx-auto max-w-4xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Link
              href={`/category/${slugify(post.category)}`}
              className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold font-mono text-[#047857] border border-emerald-200/80 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 transition-colors"
            >
              {post.category}
            </Link>
            <span className="text-xs text-slate-400 font-mono">
              {post.readingTime} • Published {post.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] sm:leading-tight break-words">
            {post.title}
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.description}
          </p>

          <div className="mt-5 sm:mt-6 flex items-center gap-3 border-y border-slate-100 py-3 dark:border-slate-800">
            <Link href="/author/meera-negi" className="shrink-0 group">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-[#047857]/30 group-hover:ring-[#047857] transition-all"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href="/author/meera-negi" className="hover:underline">
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate hover:text-[#047857] dark:hover:text-emerald-400 transition-colors">
                  {post.author.name}
                </p>
              </Link>
              <p className="text-[11px] text-slate-400 truncate font-mono">
                {post.author.title} • Last audited {post.updatedAt}
              </p>
            </div>
          </div>
        </header>



        {/* Main 2-Column Split: Editorial on Left, Sticky Sidebar on Right */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editorial Content Column */}
          <article className="lg:col-span-8 prose prose-slate max-w-none dark:prose-invert">
            <div
              className="space-y-6 text-slate-700 leading-relaxed dark:text-slate-300 text-[15px]"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* In-Article Midpoint Ad Slot (Disabled until Publisher ID is active) */}
            <div className="my-8 not-prose">
              <AdUnit
                slotId="in-article-banner-mid"
                format="rectangle"
                minHeight="min-h-[250px]"
                label="Advertisement"
              />
            </div>

            {/* Author E-E-A-T Bio */}
            <div className="not-prose">
              <AuthorBio author={post.author} updatedAt={post.updatedAt} />
            </div>
          </article>

          {/* Sticky Desktop Rail (TOC + Sidebar) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            <TableOfContents headings={post.headings} />

            <div className="not-prose">
              <AdUnit
                slotId="sidebar-sticky-rail"
                format="vertical"
                minHeight="min-h-[500px]"
                label="Sponsored Resource"
              />
            </div>

            {/* Dynamic Newsletter Form Box */}
            <NewsletterForm />
          </aside>
        </div>

        {/* Bottom Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="my-16 border-t border-slate-200 pt-10 dark:border-slate-800">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Related Articles in This Series
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore the connected engineering guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-[#047857]/50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="text-[10px] font-bold text-[#047857] uppercase tracking-wide">
                    {related.category}
                  </span>
                  <h4 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    <Link
                      href={`/blog/${related.slug}`}
                      className="hover:text-[#047857] transition-colors"
                    >
                      {related.title}
                    </Link>
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                    {related.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <span>{related.readingTime}</span>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="font-semibold text-[#047857] hover:text-[#065f46]"
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Multiplex Ad Unit (Disabled until Publisher ID is active) */}
        <div className="my-10 max-w-4xl mx-auto">
          <AdUnit
            slotId="article-bottom-multiplex"
            format="horizontal"
            minHeight="min-h-[140px]"
            label="Recommended From the Web"
          />
        </div>
      </div>
    </>
  );
}
