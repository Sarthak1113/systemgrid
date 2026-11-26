import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { slugify } from './markdown';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostAuthor {
  name: string;
  title: string;
  avatar: string;
}

export interface AuthorProfile {
  name: string;
  slug: string;
  title: string;
  avatar: string;
  bio: string;
  email?: string;
  expertise: string[];
  role: string;
  schemaType: 'Person';
}

export const PRIMARY_AUTHOR: AuthorProfile = {
  name: 'Meera Negi',
  slug: 'meera-negi',
  title: 'Lead Tech & Systems Writer at SystemGrid',
  avatar: '/authors/meera-negi.png',
  bio: "Meera Negi is Lead Technology Writer and Technical Editor at SystemGrid.dev. Her areas of expertise are cloud infrastructure, Linux, DevOps automation, web security and incident analysis. She's previously worked in systems analysis and technical documentation for enterprise SaaS teams and is an active contributor to open source infrastructure and security guides.",
  email: 'meeraegi@systemgrid.dev',
  expertise: [
    'Cloud Infrastructure',
    'Linux Systems',
    'DevOps Automation',
    'Web Security',
    'Incident Analysis',
    'Enterprise SaaS Documentation',
    'Container Optimization',
  ],
  role: 'Lead Tech & Systems Writer at SystemGrid',
  schemaType: 'Person',
};

export function getAuthorBySlug(slug: string): AuthorProfile | null {
  const normalized = slug.toLowerCase();
  if (normalized === 'meera-negi' || normalized === 'meera') {
    return PRIMARY_AUTHOR;
  }
  return null;
}

export function getPostsByAuthor(authorSlugOrName: string): PostMeta[] {
  const posts = getAllPosts();
  const normalized = authorSlugOrName.toLowerCase();
  return posts.filter((p) => {
    const postAuthorName = (p.author?.name || '').toLowerCase();
    return (
      postAuthorName.includes('meera') ||
      postAuthorName.includes('negi') ||
      normalized.includes('meera')
    );
  });
}

export interface PostMeta {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: PostAuthor;
  category: string;
  tags: string[];
  readingTime: string;
  cluster: string;
  isPillar: boolean;
  schemaType: 'TechArticle' | 'BlogPosting' | 'HowTo';
}

export interface Post extends PostMeta {
  content: string;
  headings: { id: string; text: string; level: number }[];
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data as PostMeta;
    })
    .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  // 1. First attempt: Direct file match
  const directPath = path.join(postsDirectory, `${slug}.md`);
  let targetPath = fs.existsSync(directPath) ? directPath : null;

  // 2. Second attempt: Search all posts for matching frontmatter slug
  if (!targetPath) {
    const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));
    for (const fileName of fileNames) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      if (data && (data.slug === slug || fileName.replace(/\.md$/, '') === slug)) {
        targetPath = fullPath;
        break;
      }
    }
  }

  if (!targetPath) {
    return null;
  }

  const fileContents = fs.readFileSync(targetPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract H2 and H3 headings for the Table of Contents
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return {
    ...(data as PostMeta),
    content,
    headings,
  };
}

export function getRelatedPosts(currentSlug: string, cluster: string, limit = 3): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.cluster === cluster)
    .slice(0, limit);
}

export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, { name: string; slug: string; count: number }>();
  posts.forEach((p) => {
    const slug = slugify(p.category);
    if (!map.has(slug)) {
      map.set(slug, { name: p.category, slug, count: 0 });
    }
    map.get(slug)!.count += 1;
  });
  return Array.from(map.values());
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  const posts = getAllPosts();
  return posts.filter((p) => slugify(p.category) === categorySlug);
}
