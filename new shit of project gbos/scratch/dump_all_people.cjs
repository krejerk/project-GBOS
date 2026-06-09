const fs = require('fs');
const content = fs.readFileSync('constants/registry.ts', 'utf8');

const regex = /"([^"]+)"\s*:\s*\{\s*"id"\s*:\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
  if (m[1].includes('列') || m[1].includes('维奇')) {
    console.log(m[1], "->", m[2]);
  }
}
