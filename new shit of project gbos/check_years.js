import fs from 'fs';
const content = fs.readFileSync('constants/registry.ts', 'utf8');

const unlocks = {};
let match;
const regex = /"([^"]+)":\s*{\s*"keywords":\s*\[([^\]]+)\]/g;
while ((match = regex.exec(content)) !== null) {
  const targetId = match[1];
  const keywordsStr = match[2];
  const keywords = keywordsStr.match(/"([^"]+)"/g);
  if (keywords) {
    unlocks[targetId] = keywords.map(s => s.replace(/"/g, ''));
  }
}

const yearCounts = {};
for (const [targetId, keywords] of Object.entries(unlocks)) {
  for (const k of keywords) {
    if (k.startsWith('year_')) {
      yearCounts[k] = (yearCounts[k] || 0) + 1;
    }
  }
}

for (const [y, c] of Object.entries(yearCounts)) {
  console.log(y + ': ' + c + ' usages');
}
