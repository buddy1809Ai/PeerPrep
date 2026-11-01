with open('server.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = """// Full 470-Company & 3,392 LeetCode Question Directory Endpoint
const fullDatasetPath = path.join(__dirname, '../../CompanyWise_Leetcode_Questions/src/data');
let FULL_PROBLEMS = [];
let FULL_COMPANIES = [];
let FULL_TOPICS = [];
let FULL_STATS = {};
try {
  FULL_PROBLEMS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'problems.json'), 'utf8'));
  FULL_COMPANIES = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'companies.json'), 'utf8'));
  FULL_TOPICS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'topics.json'), 'utf8'));
  FULL_STATS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'stats.json'), 'utf8'));
} catch (e) {
  console.error('Failed to load full dataset:', e.message);
}

app.get('/api/company-directory', (req, res) => {
  const { company, topic, search, difficulty, limit = 100 } = req.query;
  let results = FULL_PROBLEMS;
  if (company && company !== 'All' && company !== 'All Companies') {
    results = results.filter(p => p.companies && p.companies.some(c => c.toLowerCase() === company.toLowerCase()));
  }
  if (topic && topic !== 'All' && topic !== 'All Topics') {
    results = results.filter(p => p.topics && p.topics.some(t => t.toLowerCase() === topic.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(p => p.title.toLowerCase().includes(s) || (p.topics && p.topics.some(t => t.toLowerCase().includes(s))));
  }
  if (difficulty && difficulty !== 'All') {
    results = results.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  res.json({
    totalMatching: results.length,
    problems: results.slice(0, parseInt(limit)),
    topCompanies: FULL_COMPANIES.slice(0, 40),
    topTopics: FULL_TOPICS.slice(0, 30),
    stats: FULL_STATS
  });
});"""

replacement = """// Full 470-Company & 3,392 LeetCode Question Directory Endpoint
const localDataPath = path.join(__dirname, 'data');
const fullDatasetPath = fs.existsSync(localDataPath)
  ? localDataPath
  : path.join(__dirname, '../../CompanyWise_Leetcode_Questions/src/data');

let FULL_PROBLEMS = [];
let FULL_COMPANIES = [];
let FULL_TOPICS = [];
let FULL_STATS = {};
try {
  FULL_PROBLEMS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'problems.json'), 'utf8'));
  FULL_COMPANIES = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'companies.json'), 'utf8'));
  FULL_TOPICS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'topics.json'), 'utf8'));
  FULL_STATS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'stats.json'), 'utf8'));
  console.log(`Loaded ${FULL_PROBLEMS.length} problems across ${FULL_COMPANIES.length} companies from ${fullDatasetPath}`);
} catch (e) {
  console.error('Failed to load full dataset:', e.message);
}

app.get('/api/company-directory', (req, res) => {
  const { company, topic, search, difficulty, limit = 200 } = req.query;
  let results = FULL_PROBLEMS;

  // 1. Company Filter (handles Trilogy, Trilogy Innovations, Google, Amazon, etc.)
  if (company && company !== 'All' && company !== 'All Companies') {
    const targetComp = company.toLowerCase().trim();
    results = results.filter(p => p.companies && p.companies.some(c => {
      const cLow = c.toLowerCase().trim();
      if (cLow === targetComp) return true;
      if (targetComp.includes('trilogy') && cLow.includes('trilogy')) return true;
      if (targetComp.includes('google') && cLow.includes('google')) return true;
      if (targetComp.includes('amazon') && cLow.includes('amazon')) return true;
      if (targetComp.includes('meta') && (cLow.includes('meta') || cLow.includes('facebook'))) return true;
      if (targetComp.includes('microsoft') && cLow.includes('microsoft')) return true;
      return targetComp.includes(cLow) || cLow.includes(targetComp);
    }));
  }

  // 2. Topic Filter
  if (topic && topic !== 'All' && topic !== 'All Topics') {
    const targetTopic = topic.toLowerCase().trim();
    results = results.filter(p => p.topics && p.topics.some(t => {
      const tLow = t.toLowerCase().trim();
      return tLow === targetTopic || targetTopic.includes(tLow) || tLow.includes(targetTopic);
    }));
  }

  // 3. Search Filter
  if (search) {
    const s = search.toLowerCase().trim();
    results = results.filter(p => 
      (p.title && p.title.toLowerCase().includes(s)) ||
      (p.slug && p.slug.toLowerCase().includes(s)) ||
      (p.topics && p.topics.some(t => t.toLowerCase().includes(s))) ||
      (p.companies && p.companies.some(c => c.toLowerCase().includes(s)))
    );
  }

  // 4. Difficulty Filter
  if (difficulty && difficulty !== 'All') {
    const diffTarget = difficulty.toLowerCase().trim();
    results = results.filter(p => p.difficulty && p.difficulty.toLowerCase() === diffTarget);
  }

  res.json({
    totalMatching: results.length,
    problems: results.slice(0, parseInt(limit)),
    topCompanies: FULL_COMPANIES,
    topTopics: FULL_TOPICS,
    stats: FULL_STATS
  });
});"""

if target in content:
    content = content.replace(target, replacement)
    with open('server.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('server.js updated successfully!')
else:
    # try normalization
    c_norm = content.replace('\\r\\n', '\\n')
    t_norm = target.replace('\\r\\n', '\\n')
    if t_norm in c_norm:
        content = c_norm.replace(t_norm, replacement)
        with open('server.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print('server.js updated successfully with normalized newlines!')
    else:
        print('Error: Target block not found in server.js')
