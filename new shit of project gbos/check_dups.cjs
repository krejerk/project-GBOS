const fs = require('fs');
const content = fs.readFileSync('./constants/registry.ts', 'utf8');
// We can just extract the UNLOCKS_REGISTRY roughly
const match = content.match(/export const UNLOCKS_REGISTRY[^=]*=([\s\S]*?);/);
if (match) {
  const code = match[1];
  // naive parse
  const obj = eval(`(${code})`);
  const kwMap = {};
  for (const [target, info] of Object.entries(obj)) {
    for (const kw of info.keywords) {
      if (!kwMap[kw]) kwMap[kw] = [];
      kwMap[kw].push(target);
    }
  }
  const dups = [];
  for (const [kw, targets] of Object.entries(kwMap)) {
    if (targets.length > 1) {
      dups.push(`${kw}: ${targets.join(', ')}`);
    }
  }
  console.log("Duplicates:");
  console.log(dups.join('\n'));
} else {
  console.log("Could not find UNLOCKS_REGISTRY");
}
