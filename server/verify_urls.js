const fs = require('fs');
const path = require('path');

const problems = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/problems.json'), 'utf8'));
const problemMap = new Map();
problems.forEach(p => {
  problemMap.set(p.title.toLowerCase().trim(), p.url);
  problemMap.set(p.slug.toLowerCase().trim(), p.url);
  problemMap.set(p.id.toLowerCase().trim(), p.url);
});

const baseDir = 'D:/Internship/CompanyWise_Leetcode_Questions/leetcode-company-wise-problems-main/leetcode-company-wise-problems-main';
const companies = fs.readdirSync(baseDir);
console.log('Found company folders:', companies.length);

let totalCsvRows = 0;
let exactMatches = 0;
let mismatches = 0;
let notFoundInJson = 0;

function parseCsvLine(line) {
  // Parse CSV line handling quoted fields
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}

for (const comp of companies) {
  const allCsvPath = path.join(baseDir, comp, '5. All.csv');
  if (fs.existsSync(allCsvPath)) {
    const lines = fs.readFileSync(allCsvPath, 'utf8').split('\n').filter(l => l.trim().length > 0);
    // Header is Difficulty,Title,Frequency,Acceptance Rate,Link,Topics
    for (let i = 1; i < lines.length; i++) {
      const parts = parseCsvLine(lines[i]);
      if (parts.length >= 5) {
        totalCsvRows++;
        const title = parts[1].toLowerCase().trim();
        const csvUrl = parts[4].trim();
        const jsonUrl = problemMap.get(title);
        if (jsonUrl) {
          if (jsonUrl.replace(/\/$/, '') === csvUrl.replace(/\/$/, '')) {
            exactMatches++;
          } else {
            mismatches++;
            if (mismatches <= 5) console.log('Mismatch:', title, 'JSON:', jsonUrl, 'CSV:', csvUrl);
          }
        } else {
          notFoundInJson++;
          if (notFoundInJson <= 5) console.log('Not in JSON:', title, 'CSV link:', csvUrl);
        }
      }
    }
  }
}

console.log('Total CSV rows checked:', totalCsvRows);
console.log('Exact URL matches:', exactMatches);
console.log('Mismatches:', mismatches);
console.log('Not found in JSON:', notFoundInJson);
