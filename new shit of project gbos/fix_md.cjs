const fs = require('fs');

function replaceFile(path, searchRegex, replacement) {
  const content = fs.readFileSync(path, 'utf8');
  const newContent = content.replace(searchRegex, replacement);
  fs.writeFileSync(path, newContent);
  console.log(`Fixed ${path}`);
}

// Fix 15
replaceFile('content/chapters/chapter4/confession_15.md', 
  /trigger:\s*\n\s*revealed:/, 
  "trigger:\n  - davenport\n  - new_plan\n\nrevealed:");

// Fix 16
replaceFile('content/chapters/chapter5/confession_16.md', 
  /trigger:\s*\n\s*revealed:/, 
  "trigger:\n  - texarkana\n  - dismemberment_case\nrevealed:");

// Fix 18
replaceFile('content/chapters/chapter5/confession_18.md', 
  /trigger:\s*丹佛市郊\s*警员遇害案/, 
  "trigger:\n  - denver_suburb\n  - police_killing");

// Fix 19
replaceFile('content/chapters/chapter5/confession_19.md', 
  /trigger:\s*埃尔帕索\s*牧师/, 
  "trigger:\n  - el_paso\n  - priest");

// Fix 24
replaceFile('content/chapters/chapter6/confession_24.md', 
  /trigger:\s*\n-\s*laguna_beach\n\s*-\s*naked_root/, 
  "trigger:\n  - laguna_beach\n  - naked_root");

// Fix 36B2
replaceFile('content/chapters/chapter9/confession_36B2.md', 
  /- project_oyster_soup/, 
  "- project");

