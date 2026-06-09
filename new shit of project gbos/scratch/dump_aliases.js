const fs = require('fs');
const content = fs.readFileSync('constants/registry.ts', 'utf8');
const mapMatch = content.match(/export const GLOBAL_KEYWORD_MAP: Record<string, any> = (\{[\s\S]*?\n\});/);
if (mapMatch) {
  const mapStr = mapMatch[1];
  const keys = [];
  const regex = /['"]([^'"]+)['"]\s*:/g;
  let m;
  while ((m = regex.exec(mapStr)) !== null) {
    if (m[1].length <= 2) keys.push(m[1]);
  }
  console.log("Short aliases: ", keys);
}
