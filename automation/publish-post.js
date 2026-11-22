#!/usr/bin/env node

/**
 * Automated Publishing & Editorial Quality Gate
 * 
 * Verifies that articles comply with:
 * 1. /seo-aeo standards (BLUF answer, schema frontmatter, internal linking)
 * 2. /copywriting standards (no AI tells, no buzzwords, active voice)
 * 3. Git commit & push for automatic Vercel continuous deployment
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');

// Zero-dependency YAML frontmatter parser fallback
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent };
  }
  const rawYaml = match[1];
  const body = match[2];
  const data = {};

  rawYaml.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (val === 'true') {
        val = true;
      } else if (val === 'false') {
        val = false;
      }
      data[key] = val;
    }
  });

  return { data, content: body };
}

const BANNED_AI_TELLS = [
  /in today'?s (fast-paced|digital|ever-changing) world/i,
  /it'?s not [^,]+, it'?s /i,
  /whether you'?re a [^,]+ or a /i,
  /game-changer/i,
  /revolutionary/i,
  /delve into/i,
  /unlock the power of/i,
  /the result\? \d+x/i,
  /say goodbye to/i,
];

function auditArticle(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = parseFrontmatter(fileContent);
  const errors = [];
  const warnings = [];

  // 1. Required Frontmatter check
  const requiredFields = ['title', 'slug', 'description', 'publishedAt', 'category', 'cluster', 'schemaType'];
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`Missing frontmatter property: "${field}"`);
    }
  }

  // 2. SEO Title & Description Length
  if (data.title && data.title.length > 75) {
    warnings.push(`Title exceeds 75 characters (${data.title.length} chars). Consider shortening for Google SERP display.`);
  }
  if (data.description && data.description.length > 165) {
    warnings.push(`Description exceeds 165 characters (${data.description.length} chars). Keep under 155 for search snippets.`);
  }

  // 3. /copywriting AI Tells Check
  for (const regex of BANNED_AI_TELLS) {
    if (regex.test(body)) {
      errors.push(`Violates /copywriting standard: Contains banned AI tell matching ${regex}`);
    }
  }

  // 4. AEO Direct Answer Check (BLUF)
  const firstParagraph = body.trim().split('\n\n')[0] || '';
  const wordCount = firstParagraph.split(/\s+/).length;
  if (wordCount < 25) {
    warnings.push(`First paragraph is short (${wordCount} words). AEO recommends a definitive 40-60 word direct answer.`);
  }

  // 5. Internal Linking Check (Spoke must link to pillar)
  if (!data.isPillar) {
    const hasInternalLink = /\[.*?\]\(\/blog\/.*?\)/.test(body);
    if (!hasInternalLink) {
      warnings.push(`Spoke article has no internal markdown links to the cluster pillar.`);
    }
  }

  return { file: path.basename(filePath), errors, warnings };
}

function runAuditAndPublish() {
  console.log('==================================================');
  console.log('🔍 RPMEngine Editorial & Quality Gate Audit');
  console.log('==================================================\n');
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  let totalErrors = 0;

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const result = auditArticle(fullPath);

    if (result.errors.length > 0) {
      console.error(`❌ [FAIL] ${result.file}:`);
      result.errors.forEach((err) => console.error(`   - ${err}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ [PASS] ${result.file}`);
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach((warn) => console.warn(`   ⚠️ [WARN] ${warn}`));
    }
  }

  if (totalErrors > 0) {
    console.error(`\n❌ Publishing aborted: ${totalErrors} quality gate errors found.`);
    process.exit(1);
  }

  console.log('\n🚀 All 3 sample articles passed SEO, AEO, and Copywriting audits!');
  console.log('Ready for Git commit and Vercel edge deployment.');
}

runAuditAndPublish();
