const fs = require('fs');

const { KEYWORD_REGISTRY, UNLOCKS_REGISTRY } = require('./constants/registry.js');

const GLOBAL_KEYWORD_MAP = Object.values(KEYWORD_REGISTRY).reduce((acc, curr) => {
  acc[curr.displayName] = {
    id: curr.id,
    type: curr.type
  };
  return acc;
}, {});

const getKeywordMeta = (id) => KEYWORD_REGISTRY[id];

const handleSearch = (query, currentStoryNode) => {
    const gameState = { currentStoryNode };
    const queryBackup = query;
    let queryRemainder = query.toLowerCase();

    let detectedKeywordIds = [];
    const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

    for (const alias of sortedAliases) {
      const lowerAlias = alias.toLowerCase();
      if (queryRemainder.includes(lowerAlias)) {
        detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
        queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
      }
    }
    
    const uniqueDetected = Array.from(new Set(detectedKeywordIds)).filter(id => {
      const meta = getKeywordMeta(id);
      if (meta?.isIdentity) return true;
      if (id === 'dry_gully' || id === 'unnamed_female_body') return true;
      const chapter = meta?.chapter || 0;
      return chapter <= ((gameState.currentStoryNode || 0) + 1);
    });

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
        matchedUnlockId = entry.targetId;
        break;
      }
    }

    console.log(`Node: ${currentStoryNode}, Query: ${queryBackup} => Matched: ${matchedUnlockId}, Detected: ${uniqueDetected}, Clean: ${isRemainderClean}`);
}

handleSearch("拉古那海滩，裸根", 4);
handleSearch("拉古那海滩，裸根", 5);
handleSearch("80号州际公路，守夜人", 4);
handleSearch("80号州际公路，守夜人", 5);
