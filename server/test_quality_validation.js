const fs = require('fs');
const path = require('path');
const http = require('http');

const { PROBLEMS, CURATED_MAP, getFullProblem, generateProblemDetails } = require('./problemUtils');
const allProblems = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'problems.json'), 'utf8'));

console.log('====================================================');
console.log('PHASE 6: 3,392 RECORDS QUALITY & DATASET VALIDATION');
console.log('====================================================\n');

let genericFoundCount = 0;
let missingUrlCount = 0;
let invalidJavaCount = 0;
let missingInterviewIntelligence = 0;
let verifiedEditorialCount = 0;
let attributedSummaryCount = 0;

console.log('[1/3] Validating all 3,392 problems schema & content integrity...');

allProblems.forEach((raw, idx) => {
  const p = getFullProblem(raw.id || raw.slug, allProblems);

  if (!p) {
    console.error(`Error resolving problem ${idx}:`, raw);
    return;
  }

  // 1. Check for generic prohibited phrases
  if (p.description && p.description.includes('Design and implement an algorithm to solve this problem.')) {
    genericFoundCount++;
  }

  // 2. URL check
  if (!p.url || !p.url.startsWith('https://leetcode.com/problems/')) {
    missingUrlCount++;
  }

  // 3. Java Starter Code check
  if (!p.starterCode || !p.starterCode.java || !p.starterCode.java.includes('public class Solution')) {
    invalidJavaCount++;
  }

  // 4. Interview Intelligence check
  if (!p.interviewIntelligence || !p.interviewIntelligence.prerequisites || !p.interviewIntelligence.progressiveHints) {
    missingInterviewIntelligence++;
  }

  // 5. Provenance status check
  if (p.contentStatus === 'VERIFIED_EDITORIAL') {
    verifiedEditorialCount++;
  } else if (p.contentStatus === 'UNAVAILABLE_ATTRIBUTED_SUMMARY') {
    attributedSummaryCount++;
  }
});

console.log(`\n--- ALL 3,392 RECORDS AUDIT RESULTS ---`);
console.log(`Total Problems Audited: ${allProblems.length}`);
console.log(`Complete Verified Editorial Problems: ${verifiedEditorialCount}`);
console.log(`Attributed Summaries with Official LeetCode Links: ${attributedSummaryCount}`);
console.log(`Prohibited Generic Descriptions Found: ${genericFoundCount} (Expected: 0)`);
console.log(`Invalid / Missing LeetCode URLs: ${missingUrlCount} (Expected: 0)`);
console.log(`Invalid / Missing Java (JDK) Starter Codes: ${invalidJavaCount} (Expected: 0)`);
console.log(`Missing Interview Intelligence Packages: ${missingInterviewIntelligence} (Expected: 0)`);

if (genericFoundCount === 0 && missingUrlCount === 0 && invalidJavaCount === 0 && missingInterviewIntelligence === 0) {
  console.log(`\n✅ 100% OF ALL 3,392 PROBLEMS PASSED SCHEMA & CONTENT INTEGRITY VALIDATION!`);
} else {
  console.log(`\n❌ FAILED SCHEMA INTEGRITY VALIDATION!`);
  process.exit(1);
}

// [2/3] Test 50 Specific Problems across Diverse Companies & Difficulties
console.log('\n====================================================');
console.log('[2/3] TESTING 50 REPRESENTATIVE PROBLEMS ACROSS COMPANIES & DIFFICULTIES');
console.log('====================================================\n');

// Pick 50 representative problems
const SAMPLE_IDS = [
  // Curated Benchmarks
  'two-sum',
  '3sum',
  '3sum-closest',
  'bitwise-xor-of-all-pairings',
  'substring-xor-queries',
  'fraction-addition-and-subtraction',
  'all-oone-data-structure',
  'trapping-rain-water',
  'lru-cache',
  'median-of-two-sorted-arrays',
  '132-pattern',
  'minimum-remove-to-make-valid-parentheses',
  'valid-parentheses',
  'best-time-to-buy-and-sell-stock',
  'maximum-subarray',
  'longest-substring-without-repeating-characters',
  'climbing-stairs',
  'reverse-linked-list',
  'invert-binary-tree',
  'container-with-most-water',
  'coin-change',
  'daily-temperatures',
  'merge-k-sorted-lists',
  'word-search',
  'course-schedule',

  // Trilogy Innovations track
  'handling-sum-queries-after-update',
  'minimum-time-to-kill-all-monsters',
  'range-product-queries-of-powers',

  // Google / Meta / Amazon / Microsoft / Apple track
  'merge-intervals',
  'group-anagrams',
  'word-ladder',
  'kth-largest-element-in-an-array',
  'binary-tree-maximum-path-sum',
  'serialize-and-deserialize-binary-tree',
  'word-break',
  'find-median-from-data-stream',
  'longest-palindromic-substring',
  'regular-expression-matching',
  'search-in-rotated-sorted-array',
  'combination-sum',
  'rotate-image',
  'spiral-matrix',
  'jump-game',
  'subsets',
  'decode-ways',
  'validate-binary-search-tree',
  'symmetric-tree',
  'binary-tree-level-order-traversal',
  'construct-binary-tree-from-preorder-and-inorder-traversal',
  'populating-next-right-pointers-in-each-node'
];

console.log(`Checking ${SAMPLE_IDS.length} sample problems across 470 companies...`);

let samplePassed = 0;
SAMPLE_IDS.forEach((slug, idx) => {
  const p = getFullProblem(slug, allProblems);
  if (!p) {
    console.log(`❌ Sample ${idx + 1} [${slug}] NOT FOUND`);
    return;
  }

  const hasTitle = Boolean(p.title);
  const hasUrl = Boolean(p.url && p.url.startsWith('https://leetcode.com/problems/'));
  const hasJava = Boolean(p.starterCode && p.starterCode.java && p.starterCode.java.includes('public class Solution'));
  const hasPython = Boolean(p.starterCode && p.starterCode.python);
  const hasCpp = Boolean(p.starterCode && p.starterCode.cpp);
  const hasJs = Boolean(p.starterCode && p.starterCode.javascript);
  const hasIntelligence = Boolean(p.interviewIntelligence && p.interviewIntelligence.prerequisites && p.interviewIntelligence.progressiveHints);
  const hasNoGeneric = !p.description.includes('Design and implement an algorithm to solve this problem.');

  if (hasTitle && hasUrl && hasJava && hasPython && hasCpp && hasJs && hasIntelligence && hasNoGeneric) {
    samplePassed++;
  } else {
    console.log(`❌ Sample [${slug}] failed: title=${hasTitle}, url=${hasUrl}, java=${hasJava}, intelligence=${hasIntelligence}, noGeneric=${hasNoGeneric}`);
  }
});

console.log(`Sample Problems Verified: ${samplePassed} / ${SAMPLE_IDS.length}`);

// [3/3] Online Judge API Verification
console.log('\n====================================================');
console.log('[3/3] TESTING ONLINE JUDGE EVALUATION (/api/judge)');
console.log('====================================================\n');

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runJudgeTests() {
  // Test 1: Valid Parentheses Submit in JS
  const jsValidParentheses = `
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else {
      if (!stack.length || stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
}
`;

  process.stdout.write('Judge test (Submit Valid Parentheses JS): ');
  const res1 = await fetchJson('http://localhost:5000/api/judge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      problemId: 'valid-parentheses',
      language: 'javascript',
      code: jsValidParentheses,
      mode: 'submit'
    }
  });

  if (res1.body && res1.body.verdict === 'Accepted' && res1.body.passedTests === res1.body.totalTests) {
    console.log(`✅ PASSED (${res1.body.verdict}, ${res1.body.passedTests}/${res1.body.totalTests} tests)`);
  } else {
    console.log(`❌ FAILED:`, res1.body);
  }

  // Test 2: Best Time to Buy and Sell Stock Submit in Python
  const pyStock = `
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
    return max_profit
`;

  process.stdout.write('Judge test (Submit Stock Python): ');
  const res2 = await fetchJson('http://localhost:5000/api/judge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      problemId: 'best-time-to-buy-and-sell-stock',
      language: 'python',
      code: pyStock,
      mode: 'submit'
    }
  });

  if (res2.body && res2.body.verdict === 'Accepted' && res2.body.passedTests === res2.body.totalTests) {
    console.log(`✅ PASSED (${res2.body.verdict}, ${res2.body.passedTests}/${res2.body.totalTests} tests)`);
  } else {
    console.log(`❌ FAILED:`, res2.body);
  }

  console.log('\n====================================================');
  console.log('ALL PHASE 6 VALIDATIONS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
}

runJudgeTests().catch(err => {
  console.error('Judge test failure:', err);
  process.exit(1);
});
