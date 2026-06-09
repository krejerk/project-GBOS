const fs = require('fs');
const path = './constants/registry.ts';
let content = fs.readFileSync(path, 'utf8');

const missingKeywords = `
  "羞辱仪式": { "id": "humiliation_ritual", "type": "case" },
  "克莱门特·斯维尔森": { "id": "clement_svirson", "type": "person" },
  "亚历山大·门格尔": { "id": "alexander_mengel", "type": "person" },
  "父亲": { "id": "father", "type": "person" },
  "母亲": { "id": "mother", "type": "person" },
  "约翰·多伊": { "id": "john_doe", "type": "person" },
  "赛勒斯": { "id": "silas", "type": "person" },
  "范霍恩检查站": { "id": "van_horn_checkpoint", "type": "location" },
  "拦截": { "id": "intercept", "type": "case" },
`;

// Insert into GLOBAL_KEYWORD_MAP
content = content.replace(
  /export const GLOBAL_KEYWORD_MAP: Record<string, \{ id: string, type: string \}> = \{/,
  `export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = {${missingKeywords}`
);

fs.writeFileSync(path, content, 'utf8');
console.log("Injected missing keywords into registry.ts");
