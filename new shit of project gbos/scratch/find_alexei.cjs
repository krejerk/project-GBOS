const fs = require('fs');
const content = fs.readFileSync('constants/registry.ts', 'utf8');
const mapMatch = content.match(/export const GLOBAL_KEYWORD_MAP: Record<string, any> = (\{[\s\S]*?\n\});/);
if (mapMatch) {
  const mapStr = mapMatch[1];
  const regex = /['"]([^'"]+)['"]\s*:\s*\{\s*"id"\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(mapStr)) !== null) {
    if (m[2] === 'alexei' || m[1].includes('罗科维奇') || m[1].includes('阿列克谢')) {
      console.log(m[1], "->", m[2]);
    }
  }
}
