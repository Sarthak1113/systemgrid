import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostAuthor {
  name: string;
  title: string;
  avatar: string;
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
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract H2 and H3 headings for the Table of Contents
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
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
