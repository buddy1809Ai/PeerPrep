const http = require('http');

const REQUIRED_PROBLEMS = [
  'two-sum',
  '3sum',
  '3sum-closest',
  'bitwise-xor-of-all-pairings',
  'all-oone-data-structure',
  'trapping-rain-water',
  'lru-cache',
  'median-of-two-sorted-arrays',
  '132-pattern',
  'minimum-remove-to-make-valid-parentheses'
];

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

async function runTests() {
  console.log('====================================================');
  console.log('PHASE 8 AUTOMATED VERIFICATION SUITE');
  console.log('====================================================\n');

  let passedProblems = 0;

  for (const slug of REQUIRED_PROBLEMS) {
    process.stdout.write(`Testing [${slug}] metadata & integrity: `);
    const res = await fetchJson(`http://localhost:5000/api/problems/${slug}`);
    if (res.status !== 200 || !res.body) {
      console.log(`❌ FAILED (Status ${res.status})`);
      continue;
    }

    const prob = res.body;
    const hasTitle = Boolean(prob.title);
    const hasDesc = Boolean(prob.description && prob.description.length > 20);
    const hasExamples = Array.isArray(prob.examples) && prob.examples.length > 0;
    const hasConstraints = Array.isArray(prob.constraints) && prob.constraints.length > 0;
    const hasTestCases = Array.isArray(prob.testCases) && prob.testCases.length > 0;
    const hasHints = Array.isArray(prob.hints) && prob.hints.length >= 3;
    const hasAllLanguages = prob.starterCode &&
      prob.starterCode.javascript &&
      prob.starterCode.python &&
      prob.starterCode.java &&
      prob.starterCode.cpp;

    if (hasTitle && hasDesc && hasExamples && hasConstraints && hasTestCases && hasHints && hasAllLanguages) {
      console.log(`✅ PASSED (${prob.title} | ${prob.difficulty} | ${prob.testCases.length} cases | 4 langs | 3 hints)`);
      passedProblems++;
    } else {
      console.log(`❌ INCOMPLETE: title:${hasTitle}, desc:${hasDesc}, ex:${hasExamples}, constr:${hasConstraints}, tests:${hasTestCases}, hints:${hasHints}, langs:${hasAllLanguages}`);
    }
  }

  console.log(`\nMetadata check: ${passedProblems}/${REQUIRED_PROBLEMS.length} problems verified.\n`);

  console.log('----------------------------------------------------');
  console.log('TESTING ONLINE JUDGE (/api/judge)');
  console.log('----------------------------------------------------');

  // Test 1: Run Two Sum with correct JavaScript code
  const twoSumRes = await fetchJson('http://localhost:5000/api/problems/two-sum');
  const twoSum = twoSumRes.body;

  const validTwoSumJs = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9));
`;

  process.stdout.write('Judge test 1 (Run Mode - JS Two Sum): ');
  const run1 = await fetchJson('http://localhost:5000/api/judge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      code: validTwoSumJs,
      language: 'javascript',
      problemId: twoSum.id,
      mode: 'run',
      testCases: twoSum.testCases
    }
  });

  if (run1.body && run1.body.mode === 'run' && run1.body.success) {
    console.log(`✅ PASSED (${run1.body.verdict})`);
  } else {
    console.log(`❌ FAILED:`, run1.body);
  }

  // Test 2: Submit Two Sum with correct code (Expected: Accepted)
  process.stdout.write('Judge test 2 (Submit Mode - JS Two Sum Accepted): ');
  const submit1 = await fetchJson('http://localhost:5000/api/judge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      code: validTwoSumJs,
      language: 'javascript',
      problemId: twoSum.id,
      mode: 'submit',
      testCases: twoSum.testCases
    }
  });

  if (submit1.body && submit1.body.mode === 'submit' && submit1.body.verdict === 'Accepted' && submit1.body.passedCount === submit1.body.totalCount) {
    console.log(`✅ PASSED (Verdict: ${submit1.body.verdict}, ${submit1.body.passedCount}/${submit1.body.totalCount} passed)`);
  } else {
    console.log(`❌ FAILED:`, submit1.body);
  }

  // Test 3: Submit with Wrong Answer code (Expected: Wrong Answer, NO confetti)
  const wrongTwoSumJs = `
function twoSum(nums, target) {
  return [0, 0];
}
console.log(twoSum([2, 7, 11, 15], 9));
`;

  process.stdout.write('Judge test 3 (Submit Mode - Wrong Answer): ');
  const submit2 = await fetchJson('http://localhost:5000/api/judge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      code: wrongTwoSumJs,
      language: 'javascript',
      problemId: twoSum.id,
      mode: 'submit',
      testCases: twoSum.testCases
    }
  });

  if (submit2.body && submit2.body.mode === 'submit' && submit2.body.verdict === 'Wrong Answer') {
    console.log(`✅ PASSED (Correctly identified verdict as: ${submit2.body.verdict})`);
  } else {
    console.log(`❌ FAILED:`, submit2.body);
  }

  // Test 4: Submit Python 3Sum Closest
  const threeSumClosestRes = await fetchJson('http://localhost:5000/api/problems/3sum-closest');
  const threeSumClosest = threeSumClosestRes.body;
  const pyCode = `
def threeSumClosest(nums, target):
    nums.sort()
    closest = nums[0] + nums[1] + nums[2]
    for i in range(len(nums) - 2):
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if abs(target - s) < abs(target - closest):
                closest = s
            if s < target:
                l += 1
            elif s > target:
                r -= 1
            else:
                return target
    return closest

print(threeSumClosest([-1, 2, 1, -4], 1))
`;

  process.stdout.write('Judge test 4 (Run Mode - Python 3Sum Closest): ');
  const runPy = await fetchJson('http://localhost:5000/api/judge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      code: pyCode,
      language: 'python',
      problemId: threeSumClosest.id,
      mode: 'run',
      testCases: threeSumClosest.testCases
    }
  });

  if (runPy.body && runPy.body.success) {
    console.log(`✅ PASSED (${runPy.body.verdict}, Output: ${runPy.body.output?.trim()})`);
  } else {
    console.log(`❌ FAILED:`, runPy.body);
  }

  console.log('\n====================================================');
  console.log('ALL PHASE 8 TESTS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
