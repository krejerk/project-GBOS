const { readFileSync } = require('fs');
const code = readFileSync('constants/registry.ts', 'utf8');

const parseJSON = (regex) => {
  const match = code.match(regex);
  if (!match) return null;
  return JSON.parse(match[1]);
};

// Instead of parsing JSON, let's just find the text definition of interstate_80
const match = code.match(/'interstate_80'\s*:\s*\{[^}]+\}/);
console.log("interstate_80:", match ? match[0] : "not found");

const match2 = code.match(/'laguna_beach'\s*:\s*\{[^}]+\}/g);
console.log("laguna_beach:", match2 ? match2.join('\n') : "not found");

