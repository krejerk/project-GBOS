const fs = require('fs');

const GLOBAL_KEYWORD_MAP = {
  "拉古那海滩": { "id": "laguna_beach", "type": "location" },
  "裸根": { "id": "naked_root", "type": "case" },
  "莫兰迪": { "id": "morandi", "type": "person" }
};

const UNLOCKS_REGISTRY = {
  "confession_24": {
    "keywords": ["laguna_beach", "naked_root"],
    "targetId": "confession_24",
    "type": "node"
  }
};

const getKeywordMeta = (id) => {
  if (id === 'laguna_beach' || id === 'naked_root') return { chapter: 5 };
  return { chapter: 6 };
};

const gameState = { currentStoryNode: 5, unlockedNodeIds: [] };

const handleSearch = (query) => {
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
      const chapter = meta?.chapter || 0;
      return chapter <= ((gameState.currentStoryNode || 0) + 1);
    });

    const cleanRemainder = queryRemainder
      .replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '')
      .replace(/供述\d+/g, '')
      .replace(/confession\d+/g, '')
      .replace(/剪报\d+/g, '')
      .replace(/clipping\d+/g, '');
    
    const isRemainderClean = cleanRemainder.length === 0;

    let matchedUnlockId = null;

    for (const [id, entry] of Object.entries(UNLOCKS_REGISTRY)) {
      const hasAllNeeded = entry.keywords.every(k => uniqueDetected.includes(k));
      const hasNoExtraKeywords = uniqueDetected.length === entry.keywords.length;
      
      console.log(`Checking ${id}: hasAll=${hasAllNeeded}, hasNoExtra=${hasNoExtraKeywords}, isClean=${isRemainderClean}`);

      if (hasAllNeeded && hasNoExtraKeywords && isRemainderClean) {
        matchedUnlockId = entry.targetId;
        break;
      }
    }

    console.log(`Query: ${queryBackup}`);
    console.log(`Detected: ${detectedKeywordIds}`);
    console.log(`Unique Filtered: ${uniqueDetected}`);
    console.log(`Clean Remainder: "${cleanRemainder}" (${cleanRemainder.length})`);
    console.log(`Matched Unlock ID: ${matchedUnlockId}`);
}

handleSearch("拉古那海滩，裸根");
