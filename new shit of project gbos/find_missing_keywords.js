const fs = require('fs');
const path = require('path');

// Extract GLOBAL_KEYWORD_MAP from registry.ts
const registryStr = fs.readFileSync(path.join(__dirname, 'constants/registry.ts'), 'utf-8');
const globalKeywordMatch = registryStr.match(/export const GLOBAL_KEYWORD_MAP: Record<string, KeywordMapping> = \{([\s\S]*?)\};\n\nexport const UNLOCKS_REGISTRY/);

if (!globalKeywordMatch) {
  console.log("Could not parse GLOBAL_KEYWORD_MAP");
  process.exit(1);
}

const mapContent = "{" + globalKeywordMatch[1] + "}";
// Dirty trick to evaluate it
let globalKeys = [];
try {
  const mapEval = eval(`(${mapContent})`);
  globalKeys = Object.values(mapEval).map(m => m.id);
} catch (e) {
  // Regex extract ids
  const idMatches = [...mapContent.matchAll(/"id":\s*"([^"]+)"/g)];
  globalKeys = idMatches.map(m => m[1]);
}

// Extract UNLOCKS_REGISTRY
const unlocksMatch = registryStr.match(/export const UNLOCKS_REGISTRY: Record<string, any> = \{([\s\S]*?)\};\n/);
const unlocksContent = "{" + unlocksMatch[1] + "}";
let usedKeywords = new Set();
try {
  const unlocksEval = eval(`(${unlocksContent})`);
  Object.values(unlocksEval).forEach(v => {
    if (v.keywords) v.keywords.forEach(k => usedKeywords.add(k));
  });
} catch (e) {
  const kwMatches = [...unlocksContent.matchAll(/"keywords":\s*\[([\s\S]*?)\]/g)];
  kwMatches.forEach(m => {
    const arr = m[1].match(/"([^"]+)"/g);
    if (arr) arr.forEach(k => usedKeywords.add(k.replace(/"/g, '')));
  });
}

const missing = [];
usedKeywords.forEach(k => {
  if (!globalKeys.includes(k) && !k.startsWith('year_')) {
    missing.push(k);
  }
});

console.log("Missing keywords:", missing);
