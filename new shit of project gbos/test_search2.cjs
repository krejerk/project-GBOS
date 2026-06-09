const fs = require('fs');
const registryText = fs.readFileSync('constants/registry.ts', 'utf8');

const globalMatch = registryText.match(/export const GLOBAL_KEYWORD_MAP[^=]+=\s*(\{[\s\S]*?\});/);
const GLOBAL_KEYWORD_MAP = JSON.parse(globalMatch[1]);

const unlocksMatch = registryText.match(/export const UNLOCKS_REGISTRY[^=]+=\s*(\{[\s\S]*?\});/);
const UNLOCKS_REGISTRY = eval('(' + unlocksMatch[1] + ')');

const query = "供述24拉古那海滩裸根";
const lowerQuery = query.toLowerCase();
let queryRemainder = lowerQuery;
let detectedKeywordIds = [];

const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);
for (const alias of sortedAliases) {
  const lowerAlias = alias.toLowerCase();
  if (queryRemainder.includes(lowerAlias)) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}

const getKeywordMeta = (id) => {
  if (id === 'laguna_beach') return { chapter: 5, isPersistent: true };
  if (id === 'naked_root') return { chapter: 5, isPersistent: true };
  return { chapter: 6 }; 
};

const uniqueDetected = Array.from(new Set(detectedKeywordIds)).filter(id => {
  const meta = getKeywordMeta(id);
  if (meta?.isIdentity) return true;
  const chapter = meta?.chapter || 0;
  return chapter <= 5; // currentStoryNode=4 + 1
});

const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
const isRemainderClean = cleanRemainder.length === 0;

let matchedUnlockId = null;
for (const [id, entry] of Object.entries(UNLOCKS_REGISTRY)) {
  const hasAllNeeded = entry.keywords.every(k => uniqueDetected.includes(k));
  const hasNoExtraKeywords = uniqueDetected.length === entry.keywords.length;
  if (hasAllNeeded && hasNoExtraKeywords && isRemainderClean) {
    matchedUnlockId = id;
    break;
  }
}

console.log("matchedUnlockId:", matchedUnlockId);
