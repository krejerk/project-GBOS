import { UNLOCKS_REGISTRY, GLOBAL_KEYWORD_MAP } from './constants/registry.js';
import { KEYWORD_REGISTRY } from './constants/registry.js';

const query = "干涸石涧 无名女尸";
let lowerQuery = query.toLowerCase();

const detectedKeywordIds: string[] = [];
let queryRemainder = lowerQuery;

const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

for (const alias of sortedAliases) {
  const lowerAlias = alias.toLowerCase();
  if (queryRemainder.includes(lowerAlias)) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}

const uniqueDetected = Array.from(new Set(detectedKeywordIds));
const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
const isRemainderClean = cleanRemainder.length === 0;

console.log("detectedKeywordIds:", detectedKeywordIds);
console.log("uniqueDetected:", uniqueDetected);
console.log("cleanRemainder:", cleanRemainder, cleanRemainder.length);

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
