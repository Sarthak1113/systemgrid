#!/usr/bin/env node

/**
 * SystemGrid Automated Publishing Orchestrator
 * 
 * 1. Checks content/content-calendar.json for the next "queued" topic
 * 2. Prepares the article skeleton matching /seo-aeo and /copywriting standards
 * 3. Audits using automation/publish-post.js
 * 4. Can be executed on a schedule or triggered manually via command
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CALENDAR_FILE = path.join(__dirname, '../content/content-calendar.json');
const POSTS_DIR = path.join(__dirname, '../content/posts');

function getNextQueuedTopic() {
  if (!fs.existsSync(CALENDAR_FILE)) {
    console.error('Calendar file not found.');
    process.exit(1);
  }
  const calendar = JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf8'));
  const nextItem = calendar.find((item) => item.status === 'queued');
  return { nextItem, calendar };
}

console.log('==================================================');
console.log('⚡ SystemGrid Publishing Orchestrator');
console.log('==================================================\n');

const { nextItem, calendar } = getNextQueuedTopic();

if (!nextItem) {
  console.log('All scheduled topics in content-calendar.json have been published!');
  console.log('Add more topics to content-calendar.json to continue the automated queue.');
  process.exit(0);
}

console.log(`📌 Next in Queue: "${nextItem.title}"`);
console.log(`   Slug: ${nextItem.slug}`);
console.log(`   Cluster: ${nextItem.cluster} (${nextItem.category})`);
console.log(`   Keywords: ${nextItem.targetKeywords.join(', ')}`);
console.log('\nReady for agent generation via /seo-aeo and /copywriting pipeline.');
