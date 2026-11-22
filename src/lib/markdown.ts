export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function renderMarkdown(content: string): string {
  return content
    // H2 Headings with proper slugified ID for Table of Contents scroll spy
    .replace(/^##\s+(.*$)/gm, (_, text) => {
      const cleanText = text.trim();
      const id = slugify(cleanText);
      return `<h2 id="${id}" class="text-2xl font-bold text-slate-900 mt-10 mb-4 dark:text-white scroll-mt-28">${cleanText}</h2>`;
    })
    // H3 Headings with proper slugified ID
    .replace(/^###\s+(.*$)/gm, (_, text) => {
      const cleanText = text.trim();
      const id = slugify(cleanText);
      return `<h3 id="${id}" class="text-xl font-semibold text-slate-900 mt-8 mb-3 dark:text-slate-100 scroll-mt-28">${cleanText}</h3>`;
    })
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-[#047857] dark:text-emerald-400">$1</code>')
    // Markdown links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#047857] dark:text-emerald-400 underline font-medium hover:text-[#065f46]">$1</a>')
    // Double line breaks to paragraphs
    .replace(/\n\n/g, '<p class="my-4 leading-relaxed text-slate-700 dark:text-slate-300">');
}
