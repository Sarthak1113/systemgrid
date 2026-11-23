import { Post } from './posts';
import { slugify } from './markdown';

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const currentUrl = items[items.length - 1]?.url || 'https://systemgrid.dev';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(post: Post, siteUrl: string = 'https://systemgrid.dev') {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': post.schemaType || 'TechArticle',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
      image: `${siteUrl}${post.author.avatar}`,
      url: `${siteUrl}/author/meera-negi`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SystemGrid',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-light.png`,
      },
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };
}

/**
 * Unified Google Search Central @graph Schema
 * Combines BreadcrumbList and Article into a single canonical schema entity
 */
export function generateBlogPostGraphSchema(post: Post, siteUrl: string = 'https://systemgrid.dev') {
  const categorySlug = slugify(post.category);
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const categoryUrl = `${siteUrl}/category/${categorySlug}`;

  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: post.category, url: categoryUrl },
    { name: post.title, url: postUrl },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
      {
        '@type': post.schemaType || 'TechArticle',
        '@id': `${postUrl}#article`,
        isPartOf: {
          '@type': 'WebPage',
          '@id': postUrl,
          url: postUrl,
          name: post.title,
          breadcrumb: {
            '@id': `${postUrl}#breadcrumb`,
          },
        },
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        mainEntityOfPage: postUrl,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.title,
          image: `${siteUrl}${post.author.avatar}`,
          url: `${siteUrl}/author/meera-negi`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SystemGrid',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo-light.png`,
          },
        },
        articleSection: post.category,
        keywords: post.tags.join(', '),
      },
    ],
  };
}
