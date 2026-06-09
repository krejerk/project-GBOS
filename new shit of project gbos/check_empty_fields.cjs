const fs = require('fs');
const path = require('path');

const directories = [
  './constants',
  './constants/chapters',
  './components'
];

let suspiciousFiles = [];

function checkFile(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let issues = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for empty string assignments that are suspicious (like summary: "", event: "", content: "")
    if (/(summary|event|content|title|text|attitude|visual):\s*(["']["']|`\s*`)/.test(line)) {
      issues.push(`Line ${i + 1}: Empty string field -> ${line.trim()}`);
    }
    
    // Check for LLM truncation comments
    if (line.includes('// ...') || line.includes('//...')) {
      issues.push(`Line ${i + 1}: Possible LLM truncation comment -> ${line.trim()}`);
    }
    
    // Check for "[...]" or "[content]" placeholders
    if (line.includes('[...]') || line.includes('[rest of')) {
      issues.push(`Line ${i + 1}: Possible placeholder -> ${line.trim()}`);
    }
  }
  
  if (issues.length > 0) {
    suspiciousFiles.push({ file: filePath, issues });
  }
}

directories.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile()) {
      checkFile(fullPath);
    }
  });
});

if (suspiciousFiles.length === 0) {
  console.log("No empty fields or truncation placeholders found.");
} else {
  suspiciousFiles.forEach(sf => {
    console.log(`\n--- ${sf.file} ---`);
    sf.issues.forEach(issue => console.log(issue));
  });
}
