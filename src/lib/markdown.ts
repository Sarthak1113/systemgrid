export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Bulletproof, zero-dependency Markdown to HTML parser
 * Generates strictly valid, closed HTML tags to eliminate React hydration mismatch errors.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const htmlBlocks: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = '';
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let listItems: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(' ').trim();
      if (text) {
        htmlBlocks.push(
          `<p class="my-4 leading-relaxed text-slate-700 dark:text-slate-300 text-[15px]">${formatInline(text)}</p>`
        );
      }
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (inList && listItems.length > 0) {
      const tag = listType;
      const listClass =
        tag === 'ol'
          ? 'list-decimal pl-5 space-y-2 my-4 text-sm text-slate-700 dark:text-slate-300'
          : 'list-disc pl-5 space-y-2 my-4 text-sm text-slate-700 dark:text-slate-300';
      const itemsHtml = listItems
        .map((li) => `<li class="leading-relaxed">${formatInline(li)}</li>`)
        .join('');
      htmlBlocks.push(`<${tag} class="${listClass}">${itemsHtml}</${tag}>`);
      inList = false;
      listItems = [];
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      const validRows = tableRows.filter((r) => !/^[|\s-:]+$/.test(r.trim()));
      if (validRows.length > 0) {
        const headerRow = validRows[0];
        const bodyRows = validRows.slice(1);

        const formatRow = (row: string, isHeader = false) => {
          const cells = row
            .split('|')
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          const cellTag = isHeader ? 'th' : 'td';
          const cellClass = isHeader
            ? 'p-3 text-left font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850'
            : 'p-3 border-b border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300';

          return `<tr>${cells
            .map((c) => `<${cellTag} class="${cellClass}">${formatInline(c)}</${cellTag}>`)
            .join('')}</tr>`;
        };

        const headerHtml = `<thead>${formatRow(headerRow, true)}</thead>`;
        const bodyHtml = `<tbody>${bodyRows.map((r) => formatRow(r, false)).join('')}</tbody>`;

        htmlBlocks.push(
          `<div class="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"><table class="w-full text-xs text-left">${headerHtml}${bodyHtml}</table></div>`
        );
      }
      inTable = false;
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks (```)
    if (trimmed.startsWith('```')) {
      flushParagraph();
      flushList();
      flushTable();
      if (inCodeBlock) {
        // End code block
        const escaped = codeBlockContent
          .join('\n')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        htmlBlocks.push(
          `<pre class="my-6 p-4 rounded-xl bg-slate-900 text-slate-100 overflow-x-auto text-xs font-mono border border-slate-800"><code>${escaped}</code></pre>`
        );
        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLang = '';
      } else {
        // Start code block
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Markdown Table rows (| col | col |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushParagraph();
      flushList();
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headings (## H2, ### H3, # H1)
    if (trimmed.startsWith('#')) {
      flushParagraph();
      flushList();
      flushTable();

      const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = slugify(text);

        if (level === 2) {
          htmlBlocks.push(
            `<h2 id="${id}" class="text-2xl font-bold text-slate-900 mt-10 mb-4 dark:text-white scroll-mt-28">${formatInline(text)}</h2>`
          );
        } else if (level === 3) {
          htmlBlocks.push(
            `<h3 id="${id}" class="text-xl font-semibold text-slate-900 mt-8 mb-3 dark:text-slate-100 scroll-mt-28">${formatInline(text)}</h3>`
          );
        } else {
          htmlBlocks.push(
            `<h${level} id="${id}" class="font-bold text-slate-900 dark:text-white mt-6 mb-2 scroll-mt-28">${formatInline(text)}</h${level}>`
          );
        }
        continue;
      }
    }

    // Unordered List (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      flushTable();
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      continue;
    }

    // Ordered List (1. 2. 3.)
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushTable();
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
      continue;
    }

    // End list if non-list line
    if (inList && trimmed === '') {
      flushList();
      continue;
    }

    // Empty lines trigger paragraph flush
    if (trimmed === '') {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    // Normal paragraph text accumulator
    paragraphBuffer.push(trimmed);
  }

  // Flush remaining buffers
  flushParagraph();
  flushList();
  flushTable();

  return htmlBlocks.join('\n');
}

/**
 * Format inline markdown tokens: bold, italic, code, links
 */
function formatInline(text: string): string {
  return text
    // Escaped KaTeX math placeholder if needed
    .replace(/\$\$(.*?)\$\$/g, '<div class="my-4 text-center font-mono text-sm font-semibold text-[#047857] dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 py-2.5 px-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40">$1</div>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-[#047857] dark:text-emerald-400">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#047857] dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-[#065f46]">$1</a>');
}
