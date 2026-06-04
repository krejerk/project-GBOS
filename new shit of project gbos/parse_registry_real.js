const fs = require('fs');
const content = fs.readFileSync('constants/registry.ts', 'utf8');
const match = content.match(/"confession_24":\s*{\s*"keywords":\s*\[([^\]]+)\]/);
if (match) {
    console.log("Found:", match[1]);
}
