const fs = require('fs');
const path = require('path');

const problemsPath = path.join(__dirname, 'data', 'problems.json');
const rawProblems = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

console.log('====================================================');
console.log('PHASE 1: COMPREHENSIVE DATASET AUDIT (3,392 RECORDS)');
console.log('====================================================\n');

const totalCount = rawProblems.length;
let missingUrl = 0;
let invalidUrl = 0;
let missingSlug = 0;
let missingDifficulty = 0;
let missingTopics = 0;
let missingCompanies = 0;
let duplicateIds = new Set();
let seenIds = new Set();
let difficultyCounts = { Easy: 0, Medium: 0, Hard: 0, Unknown: 0 };

rawProblems.forEach((p, idx) => {
  // ID check
  if (!p.id) {
    console.log(`Record ${idx} missing ID`);
  } else {
    if (seenIds.has(p.id)) {
      duplicateIds.add(p.id);
    }
    seenIds.add(p.id);
  }

  // Slug check
  if (!p.slug) missingSlug++;

  // URL check
  if (!p.url) {
    missingUrl++;
  } else if (!p.url.startsWith('https://leetcode.com/problems/')) {
    invalidUrl++;
  }

  // Difficulty check
  if (!p.difficulty) {
    missingDifficulty++;
    difficultyCounts.Unknown++;
  } else {
    difficultyCounts[p.difficulty] = (difficultyCounts[p.difficulty] || 0) + 1;
  }

  // Topics check
  if (!p.topics || !Array.isArray(p.topics) || p.topics.length === 0) {
    missingTopics++;
  }

  // Companies check
  if (!p.companies || !Array.isArray(p.companies) || p.companies.length === 0) {
    missingCompanies++;
  }
});

console.log(`Total Records Audited: ${totalCount}`);
console.log(`Unique Problem IDs: ${seenIds.size}`);
console.log(`Duplicate IDs: ${duplicateIds.size} (${Array.from(duplicateIds).join(', ') || 'None'})`);
console.log(`Missing URLs: ${missingUrl}`);
console.log(`Invalid / Non-standard URLs: ${invalidUrl}`);
console.log(`Missing Slugs: ${missingSlug}`);
console.log(`Missing Difficulty: ${missingDifficulty}`);
console.log(`Difficulty Breakdown: Easy=${difficultyCounts.Easy}, Medium=${difficultyCounts.Medium}, Hard=${difficultyCounts.Hard}, Unknown=${difficultyCounts.Unknown}`);
console.log(`Missing Topics: ${missingTopics}`);
console.log(`Missing Companies: ${missingCompanies}`);

// Check curated problems
const { PROBLEMS: curatedProblems } = require('./problemUtils');
console.log(`\nCurated & Authentically Formatted Problems: ${curatedProblems.length}`);
curatedProblems.forEach(p => {
  console.log(` - [${p.id}] ${p.title} (${p.difficulty}): ${p.examples.length} examples, ${p.constraints.length} constraints, ${p.hints.length} hints`);
});

// Check generic generated content
const nonCuratedCount = totalCount - curatedProblems.length;
console.log(`\nNon-curated records needing explicit Content Status / Attributed Summaries: ${nonCuratedCount}`);

console.log('\nAudit complete.');
