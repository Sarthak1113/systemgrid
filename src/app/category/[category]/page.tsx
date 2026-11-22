import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '../../../lib/posts';
import { Breadcrumbs } from '../../../components/Breadcrumbs';

interface PageProps {
  params: Promise<{ category: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const currentCat = categories.find((c) => c.slug === category);

  if (!currentCat) return {};

  return {
    title: `${currentCat.name} Guides & Research | SystemGrid`,
    description: `Explore all verified articles, benchmarks, and architecture playbooks filed under ${currentCat.name}.`,
    openGraph: {
      title: `${currentCat.name} | SystemGrid`,
      description: `Explore all verified articles, benchmarks, and architecture playbooks filed under ${currentCat.name}.`,
      url: `https://systemgrid.dev/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categories = getAllCategories();
  const currentCat = categories.find((c) => c.slug === category);

  if (!currentCat) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Categories', url: '/' },
          { name: currentCat.name, url: `/category/${category}` },
        ]}
      />

      {/* Category Header */}
      <header className="my-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#047857] border border-emerald-200/80 dark:bg-emerald-950 dark:text-emerald-300 mb-3">
          <span>Category Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {currentCat.name}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'} filed under {currentCat.name}.
        </p>
      </header>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-[#047857]/50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span className="font-semibold text-[#047857] uppercase tracking-wide">
                  {post.category}
                </span>
                <span>{post.readingTime}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#047857] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <span className="text-[11px] font-medium text-slate-400">
                {post.publishedAt}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-semibold text-[#047857] hover:text-[#065f46] dark:text-emerald-400"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
