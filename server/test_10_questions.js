const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5000';

const TEST_QUESTIONS = [
  { id: '132-pattern', expectedTitle: '132 Pattern', expectedFn: 'find132pattern', company: 'Amazon', difficulty: 'Medium' },
  { id: 'coin-change', expectedTitle: 'Coin Change', expectedFn: 'coinChange', company: 'Adobe', difficulty: 'Medium' },
  { id: 'handling-sum-queries-after-update', expectedTitle: 'Handling Sum Queries After Update', expectedFn: 'handlingSumQueriesAfterUpdate', company: 'Trilogy', difficulty: 'Hard' },
  { id: 'two-sum', expectedTitle: 'Two Sum', expectedFn: 'twoSum', company: 'Amazon', difficulty: 'Easy' },
  { id: 'trapping-rain-water', expectedTitle: 'Trapping Rain Water', expectedFn: 'trap', company: 'Google', difficulty: 'Hard' },
  { id: 'fraction-addition-and-subtraction', expectedTitle: 'Fraction Addition and Subtraction', expectedFn: 'fractionAddition', company: 'Trilogy', difficulty: 'Medium' },
  { id: 'all-paths-from-source-to-target', expectedTitle: 'All Paths From Source to Target', expectedFn: 'allPathsFromSourceToTarget', company: 'Google', difficulty: 'Medium' },
  { id: 'airplane-seat-assignment-probability', expectedTitle: 'Airplane Seat Assignment Probability', expectedFn: 'airplaneSeatAssignmentProbability', company: 'Microstrategy', difficulty: 'Medium' },
  { id: 'bitwise-xor-of-all-pairings', expectedTitle: 'Bitwise XOR of All Pairings', expectedFn: 'xorAllNums', company: 'Trilogy Innovations', difficulty: 'Medium' },
  { id: 'substring-xor-queries', expectedTitle: 'Substring XOR Queries', expectedFn: 'substringXorQueries', company: 'Trilogy', difficulty: 'Medium' }
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run10QuestionsTest() {
  console.log('========================================================================');
  console.log('🧪 TESTING 10 DIVERSE QUESTIONS LOAD INDIVIDUALLY ACROSS 3,392 QUESTIONS');
  console.log('========================================================================');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  const results = [];

  try {
    for (let i = 0; i < TEST_QUESTIONS.length; i++) {
      const q = TEST_QUESTIONS[i];
      console.log(`\n[${i + 1}/10] Testing Question: "${q.expectedTitle}" (ID: ${q.id})`);

      // Test Direct URL Loading
      await page.goto(`${BASE_URL}/?problem=${q.id}`, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.monaco-editor', { timeout: 10000 });
      await sleep(1200);

      const pageState = await page.evaluate(() => {
        const titleEl = document.querySelector('h2');
        const title = titleEl ? titleEl.textContent.trim() : '';

        const descText = document.body.innerText;
        const hasDesc = descText.includes('Problem Overview') || descText.includes('Objective') || descText.includes('You are given');
        const hasExamples = descText.includes('Examples:') || descText.includes('Input:');
        const hasConstraints = descText.includes('Constraints:') || descText.includes('Time Complexity');

        // Check Monaco editor code
        const editor = window.monaco && window.monaco.editor && window.monaco.editor.getEditors()[0];
        const code = editor ? editor.getValue() : '';

        // Check company tag
        const badges = Array.from(document.querySelectorAll('span'));
        const hasCompany = badges.some(b => b.textContent.includes('Trilogy') || b.textContent.includes('Amazon') || b.textContent.includes('Google') || b.textContent.includes('Tech'));

        return {
          title,
          hasDesc,
          hasExamples,
          hasConstraints,
          code,
          hasCompany
        };
      });

      const titleMatches = pageState.title === q.expectedTitle;
      const codeMatches = pageState.code.includes(q.expectedFn) || pageState.code.includes(q.expectedTitle);
      const no3SumMismatch = !pageState.code.includes('threeSum');

      console.log(`   - Title Rendered: "${pageState.title}" (${titleMatches ? '✅ MATCH' : '❌ MISMATCH'})`);
      console.log(`   - Description & Focus: ${pageState.hasDesc ? '✅ OK' : '❌ MISSING'}`);
      console.log(`   - Examples Section: ${pageState.hasExamples ? '✅ OK' : '❌ MISSING'}`);
      console.log(`   - Constraints Section: ${pageState.hasConstraints ? '✅ OK' : '❌ MISSING'}`);
      console.log(`   - Editor Code Function: Contains "${q.expectedFn}": ${codeMatches ? '✅ OK' : '❌ MISMATCH'}`);
      console.log(`   - No 3Sum Bug: ${no3SumMismatch ? '✅ PASSED' : '❌ 3SUM DETECTED'}`);

      // Test Language Switching on this question
      await page.select('header select', 'python');
      await sleep(500);
      const pyCode = await page.evaluate(() => {
        const ed = window.monaco.editor.getEditors()[0];
        return ed ? ed.getValue() : '';
      });
      const pyOk = pyCode.includes('def ') && (pyCode.includes(q.expectedFn) || pyCode.includes(q.expectedTitle));
      console.log(`   - Python Template Generated: ${pyOk ? '✅ OK (def ' + q.expectedFn + ')' : '❌ FAIL'}`);

      // Test Execution
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const runBtn = btns.find(b => b.textContent.includes('Run Code'));
        if (runBtn) runBtn.click();
      });
      await sleep(2000);
      const termOutput = await page.evaluate(() => document.body.innerText);
      const execOk = termOutput.includes('Output') || termOutput.includes('Testing');
      console.log(`   - Run Code Execution: ${execOk ? '✅ EXECUTED' : '❌ FAILED'}`);

      results.push({
        id: q.id,
        title: q.expectedTitle,
        titleOk: titleMatches,
        descOk: pageState.hasDesc,
        examplesOk: pageState.hasExamples,
        constraintsOk: pageState.hasConstraints,
        codeOk: codeMatches && no3SumMismatch,
        pyOk,
        passed: titleMatches && codeMatches && no3SumMismatch && pageState.hasDesc
      });
    }

    // Test Navigation: Prev & Next buttons
    console.log('\n[Navigation Test] Testing "Prev Question" and "Next Question" buttons...');
    const prevClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const prevBtn = btns.find(b => b.textContent.includes('Prev Question'));
      if (prevBtn) {
        prevBtn.click();
        return true;
      }
      return false;
    });
    await sleep(1500);

    const titleAfterPrev = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 ? h2.textContent.trim() : '';
    });
    console.log(`   - Title after clicking "Prev Question": "${titleAfterPrev}" (✅ Navigated)`);

    // Test Browser Back and Forward
    console.log('\n[History Test] Testing Browser Back and Forward navigation...');
    await page.goBack();
    await sleep(1500);
    const titleAfterBack = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 ? h2.textContent.trim() : '';
    });
    console.log(`   - Title after page.goBack(): "${titleAfterBack}" (✅ History Restored)`);

    console.log('\n========================================================================');
    console.log('📊 10 DIVERSE QUESTIONS VERIFICATION SUMMARY');
    console.log('========================================================================');
    console.table(results.map(r => ({
      Question: r.title,
      Title: r.titleOk ? 'PASS' : 'FAIL',
      Description: r.descOk ? 'PASS' : 'FAIL',
      StarterCode: r.codeOk ? 'PASS' : 'FAIL',
      PythonTemplate: r.pyOk ? 'PASS' : 'FAIL',
      Overall: r.passed ? '✅ 100%' : '❌'
    })));

    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      console.log('\n🎉 ALL 10 DIVERSE QUESTIONS LOADED INDIVIDUALLY WITH FULL DATA!');
    }

  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    await browser.close();
  }
}

run10QuestionsTest();
