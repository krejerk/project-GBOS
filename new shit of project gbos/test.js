const { readFileSync } = require('fs');

const code = readFileSync('constants/registry.ts', 'utf8');

const parseJSON = (regex) => {
  const match = code.match(regex);
  if (!match) return null;
  let str = match[1];
  try { return JSON.parse(str); } catch (e) {
    console.error("Parse failed for", regex);
    return null;
  }
};

// Instead of parsing TS, let's just use ts-node properly.
