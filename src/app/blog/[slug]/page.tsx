import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../../lib/posts';
import { generateArticleSchema, generateBreadcrumbSchema } from '../../../lib/schema';
import { AdUnit } from '../../../components/AdUnit';
import { TableOfContents } from '../../../components/TableOfContents';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ClusterNav } from '../../../components/ClusterNav';
import { AuthorBio } from '../../../components/AuthorBio';

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
    title: `${post.title} | RPMEngine`,
    description: post.description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const pillarPost = allPosts.find((p) => p.cluster === post.cluster && p.isPillar);
  const spokePosts = allPosts.filter((p) => p.cluster === post.cluster && !p.isPillar);
  const relatedPosts = getRelatedPosts(post.slug, post.cluster, 3);

  const siteUrl = 'https://your-domain.vercel.app';
  const articleSchema = generateArticleSchema(post, siteUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: post.category, url: `${siteUrl}/category/${post.category.toLowerCase().replace(/\s+/g, '-')}` },
    { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
  ]);

  return (
    <>
      {/* Search Engine & Answer Engine Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Leaderboard Ad Slot */}
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
            { name: post.category, url: `#` },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Article Header */}
        <header className="mx-auto max-w-4xl mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">
              {post.readingTime} • Published {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.description}
          </p>

          <div className="mt-6 flex items-center gap-3 border-y border-slate-100 py-3 dark:border-slate-800">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {post.author.name}
              </p>
              <p className="text-[11px] text-slate-400">
                {post.author.title} • Last audited {post.updatedAt}
              </p>
            </div>
          </div>
        </header>

        {/* Topic Cluster Hub Navigation */}
        <div className="mx-auto max-w-4xl">
          <ClusterNav
            currentSlug={post.slug}
            clusterTitle="AdSense Revenue Mastery"
            pillarPost={pillarPost}
            spokePosts={spokePosts}
          />
        </div>

        {/* Main 2-Column Split: Editorial on Left, Sticky Sidebar & Ad on Right */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editorial Content Column */}
          <article className="lg:col-span-8 prose prose-slate max-w-none dark:prose-invert">
            {/* Simple Markdown Render (In production, replace with @next/mdx or markdown-to-jsx) */}
            <div
              className="space-y-6 text-slate-700 leading-relaxed dark:text-slate-300 text-[15px]"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/## (.*)/g, '<h2 id="$1" class="text-2xl font-bold text-slate-900 mt-8 mb-4 dark:text-white scroll-mt-20">$1</h2>')
                  .replace(/### (.*)/g, '<h3 id="$1" class="text-xl font-semibold text-slate-900 mt-6 mb-3 dark:text-slate-100 scroll-mt-20">$1</h3>')
                  .replace(/\n\n/g, '<p class="my-4 leading-relaxed">')
              }}
            />

            {/* In-Article Midpoint Ad Slot */}
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

          {/* Sticky Desktop Rail (TOC + High-RPM 300x600 Ad Unit) */}
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

            {/* Quick Newsletter / Retention Box */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Publishing Intelligence
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Receive weekly programmatic monetization teardowns directly in your inbox.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Articles Section (Boosts Pageviews / Ad Impressions) */}
        {relatedPosts.length > 0 && (
          <section className="my-16 border-t border-slate-200 pt-10 dark:border-slate-800">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Related Articles in This Series
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Continue exploring the AdSense optimization architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-500/40 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                    {related.category}
                  </span>
                  <h4 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    <Link
                      href={`/blog/${related.slug}`}
                      className="hover:text-emerald-600 transition-colors"
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
                      className="font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Read Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Multiplex / Content Recommendation Ad Unit */}
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
