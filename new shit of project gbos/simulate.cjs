const { readFileSync } = require('fs');
const code = readFileSync('constants/registry.ts', 'utf8');
const parseJSON = (regex) => {
  const match = code.match(regex);
  if (!match) return null;
  return JSON.parse(match[1]);
};
const GLOBAL_KEYWORD_MAP = parseJSON(/export const GLOBAL_KEYWORD_MAP[^=]+=\s*(\{[\s\S]*?\});/);
const UNLOCKS_REGISTRY = parseJSON(/export const UNLOCKS_REGISTRY[^=]+=\s*(\{[\s\S]*?\});/);

const query = "拉古那海滩裸根";
let queryRemainder = query;
const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

const detectedKeywordIds = [];
for (const alias of sortedAliases) {
  const lowerAlias = alias.toLowerCase();
  if (queryRemainder.includes(lowerAlias)) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}

const currentStoryNode = 4;
const getKeywordMeta = (id) => ({ chapter: 5, isIdentity: false }); // Mock

const uniqueDetected = Array.from(new Set(detectedKeywordIds)).filter(id => {
  const meta = getKeywordMeta(id);
  const chapter = meta.chapter || 0;
  return chapter <= ((currentStoryNode || 0) + 1);
});

const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
const isRemainderClean = cleanRemainder.length === 0;

let matchedUnlockId = null;
if (isRemainderClean && uniqueDetected.length > 0) {
  const targetNode = Object.values(UNLOCKS_REGISTRY).find(entry => {
    const hasAllKeywords = entry.keywords.every(k => uniqueDetected.includes(k));
    const hasNoExtraKeywords = uniqueDetected.length === entry.keywords.length;
    return hasAllKeywords && hasNoExtraKeywords;
  });
  if (targetNode) matchedUnlockId = targetNode.targetId;
}

console.log("Matched:", matchedUnlockId, "Clean Remainder:", cleanRemainder);
