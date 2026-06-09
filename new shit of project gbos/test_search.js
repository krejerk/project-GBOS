const GLOBAL_KEYWORD_MAP = {
  "拉古那海滩": { id: "laguna_beach" },
  "裸根": { id: "naked_root" }
};
const UNLOCKS_REGISTRY = {
  "confession_24": { keywords: ["laguna_beach", "naked_root"], targetId: "confession_24", type: "node" }
};

const query = "拉古那海滩 裸根";
let queryRemainder = query.toLowerCase();
let detectedKeywordIds = [];

const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

for (const alias of sortedAliases) {
  if (alias && alias.length > 0 && queryRemainder.includes(alias.toLowerCase())) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.replace(alias.toLowerCase(), ' '.repeat(alias.length));
  }
}

const uniqueDetected = Array.from(new Set(detectedKeywordIds));
const cleanRemainder = queryRemainder
  .replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '')
  .replace(/供述\d+/g, '')
  .replace(/confession\d+/gi, '')
  .replace(/剪报\d+/g, '')
  .replace(/clipping\d+/gi, '');

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

console.log({ uniqueDetected, cleanRemainder, isRemainderClean, matchedUnlockId });
