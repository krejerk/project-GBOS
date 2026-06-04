import { KEYWORD_REGISTRY, GLOBAL_KEYWORD_MAP, UNLOCKS_REGISTRY } from './constants/registry.ts';

const gameState = { currentStoryNode: 5 };
const query = "拉古那海滩 裸根";
const lowerQuery = query.toLowerCase();

const detectedKeywordIds = [];
let queryRemainder = lowerQuery;

const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

for (const alias of sortedAliases) {
  const lowerAlias = alias.toLowerCase();
  if (queryRemainder.includes(lowerAlias)) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}

const uniqueDetected = Array.from(new Set(detectedKeywordIds)).filter(id => {
  const meta = KEYWORD_REGISTRY[id];
  if (meta?.isIdentity) return true;
  if (id === 'dry_gully' || id === 'unnamed_female_body') return true;
  const chapter = meta?.chapter || 0;
  return chapter <= ((gameState.currentStoryNode || 0) + 1);
});

console.log("uniqueDetected:", uniqueDetected);

const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
const isRemainderClean = cleanRemainder.length === 0;

console.log("cleanRemainder:", `"${cleanRemainder}"`);
console.log("isRemainderClean:", isRemainderClean);

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

