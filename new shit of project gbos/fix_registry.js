const fs = require('fs');
let content = fs.readFileSync('constants/registry.ts', 'utf8');

// The build error showed duplicates for "辛西娅·米勒", "弗兰克·罗林斯", "伦德格兰"
// These are probably because they are defined twice in GLOBAL_KEYWORD_MAP.
// Since they are just warnings and don't affect runtime logic for our issue, I'll ignore them for now.
