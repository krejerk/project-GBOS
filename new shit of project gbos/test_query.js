import { GLOBAL_KEYWORD_MAP, UNLOCKS_REGISTRY } from './constants/registry.ts';

const query = "阿尔伯克基 化学家情人";
let queryRemainder = query.toLowerCase();
const detectedKeywordIds = [];

const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

for (const alias of sortedAliases) {
  const lowerAlias = alias.toLowerCase();
  if (queryRemainder.includes(lowerAlias)) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}

const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
const isRemainderClean = cleanRemainder.length === 0;

console.log("detectedKeywordIds:", detectedKeywordIds);
console.log("cleanRemainder:", `'${cleanRemainder}'`);
console.log("isRemainderClean:", isRemainderClean);

