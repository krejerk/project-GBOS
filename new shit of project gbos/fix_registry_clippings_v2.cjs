const fs = require('fs');
const path = './constants/registry.ts';
let content = fs.readFileSync(path, 'utf8');

// We need to parse GLOBAL_KEYWORD_MAP from the file itself to map aliases to IDs.
const matchMap = content.match(/export const GLOBAL_KEYWORD_MAP:.*?= (\{[\s\S]*?\});\n\nexport const CLUE_DISPLAY_MAP/);
let globalKeywordMap = {};
if (matchMap) {
  try {
    globalKeywordMap = eval('(' + matchMap[1] + ')');
  } catch (e) {
    console.log("Failed to eval GLOBAL_KEYWORD_MAP");
  }
}

function getKeywordId(alias) {
  if (globalKeywordMap[alias]) return globalKeywordMap[alias].id;
  // If it's already an ID
  if (alias.startsWith('year_') || alias === 'arthur_dawson' || alias.match(/^[a-z_]+$/)) return alias;
  if (alias.match(/^\d{4}$/)) return 'year_' + alias;
  return alias;
}

// Parse UNLOCKS_REGISTRY
const matchUnlocks = content.match(/export const UNLOCKS_REGISTRY:.*= \{([\s\S]*?)\};\n\nexport const KEYWORD_CONSUMPTION_MAP/);
let unlocksRegistryStr = matchUnlocks[1];

// We can just use regex to replace all "keywords": [...] for clippings
unlocksRegistryStr = unlocksRegistryStr.replace(/"(clipping_\d+)":\s*\{\s*"keywords":\s*\[([\s\S]*?)\],\s*"targetId"/g, (match, clippingId, keywordsStr) => {
  const keywords = keywordsStr.split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s);
  const ids = new Set();
  keywords.forEach(k => {
    ids.add(getKeywordId(k));
  });
  return `"${clippingId}": {
    "keywords": [
      ${Array.from(ids).map(id => `"${id}"`).join(',\n      ')}
    ],
    "targetId"`;
});

// Now add the missing ones!
const missingClippings = {
  "clipping_21": ["year_1967", "william_dawson"],
  "clipping_22": ["year_1977", "frank_rollins"],
  "clipping_24": ["year_1981", "clement_svirson"],
  "clipping_25": ["year_1985", "alexander_mengel"],
  "clipping_26": ["year_1999", "cynthia_miller"]
};

let additionalStr = "";
for (const [id, keys] of Object.entries(missingClippings)) {
  if (!unlocksRegistryStr.includes(`"${id}": {`)) {
    additionalStr += `,\n  "${id}": {
    "keywords": [
      ${keys.map(k => `"${k}"`).join(',\n      ')}
    ],
    "targetId": "${id}",
    "type": "archive"
  }`;
  }
}

unlocksRegistryStr += additionalStr;

content = content.replace(matchUnlocks[1], unlocksRegistryStr);
fs.writeFileSync(path, content, 'utf8');
console.log("Fixed all clipping keywords and added missing ones!");
