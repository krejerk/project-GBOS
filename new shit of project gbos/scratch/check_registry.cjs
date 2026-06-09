const fs = require('fs');
const content = fs.readFileSync('constants/registry.ts', 'utf8');
const match = content.match(/export const UNLOCKS_REGISTRY: Record<string, [^>]+> = (\{[\s\S]*?\n\});/);
if (match) {
  // Try to parse it loosely
  const objStr = match[1].replace(/([a-zA-Z0-9_]+):/g, '"$1":').replace(/'/g, '"');
  try {
    const obj = JSON.parse(objStr);
    let foundEmpty = false;
    for (const key in obj) {
      if (!obj[key].keywords || obj[key].keywords.length === 0) {
        console.log("Empty keywords for:", key, obj[key]);
        foundEmpty = true;
      }
    }
    if (!foundEmpty) console.log("No empty keywords found.");
  } catch (e) {
    console.error("Parse error", e.message);
  }
}
