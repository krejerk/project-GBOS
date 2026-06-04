const fs = require('fs');

const code = fs.readFileSync('constants/registry.ts', 'utf8');

const parseJSON = (regex) => {
  const match = code.match(regex);
  return match ? JSON.parse(match[1]) : null;
};

const KEYWORD_REGISTRY = parseJSON(/export const KEYWORD_REGISTRY: Record[^=]+=\s*(\{[\s\S]*?\});\n\nexport const ALL_MEMORY_NODES/);
const GLOBAL_KEYWORD_MAP = parseJSON(/export const GLOBAL_KEYWORD_MAP: Record[^=]+=\s*(\{[\s\S]*?\});\n\nexport const CLUE_DISPLAY_MAP/);
const UNLOCKS_REGISTRY = parseJSON(/export const UNLOCKS_REGISTRY: Record[^=]+=\s*(\{[\s\S]*?\});\n\nexport const KEYWORD_CONSUMPTION_MAP/);

const runTest = (currentStoryNode, query) => {
  const lowerQuery = query.toLowerCase();
  let queryRemainder = lowerQuery;
  const detectedKeywordIds = [];

  const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

  for (const alias of sortedAliases) {
    const lowerAlias = alias.toLowerCase();
    if (queryRemainder.includes(lowerAlias)) {
      detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
      queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
    }
  }

  const uniqueDetected = Array.from(new Set(detectedKeywordIds)).filter(id => {
    const meta = KEYWORD_REGISTRY ? KEYWORD_REGISTRY[id] : { chapter: 6 };
    if (meta && meta.isIdentity) return true;
    if (id === 'dry_gully' || id === 'unnamed_female_body') return true;
    const chapter = meta ? (meta.chapter || 0) : 0;
    return chapter <= (currentStoryNode + 1);
  });

  const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
  const isRemainderClean = cleanRemainder.length === 0;

  let matchedUnlockId = null;
  for (const [id, entry] of Object.entries(UNLOCKS_REGISTRY)) {
    const hasAllNeeded = entry.keywords.every(k => uniqueDetected.includes(k));
    const hasNoExtraKeywords = uniqueDetected.length === entry.keywords.length;
    if (hasAllNeeded && hasNoExtraKeywords && isRemainderClean) {
      matchedUnlockId = entry.targetId;
      break;
    }
  }

  console.log(`Node=${currentStoryNode}, Query="${query}" -> Target=${matchedUnlockId}, Detected=${JSON.stringify(uniqueDetected)}`);
};

runTest(4, "拉古那海滩 裸根");
runTest(5, "拉古那海滩 裸根");
runTest(4, "阿尔伯克基 化学家情人");
runTest(5, "阿尔伯克基 化学家情人");
