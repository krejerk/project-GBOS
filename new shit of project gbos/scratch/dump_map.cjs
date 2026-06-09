const fs = require('fs');
const content = fs.readFileSync('constants/registry.ts', 'utf8');

// The file exports GLOBAL_KEYWORD_MAP. Let's just find all keys by matching /"([^"]+)":\s*\{\s*"id":/
const regex = /"([^"]+)"\s*:\s*\{\s*"id"\s*:\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
  if (m[2] === 'alexei' || m[1].includes('阿列克谢') || m[1].includes('罗科维奇')) {
    console.log(m[1], "->", m[2]);
  }
}
