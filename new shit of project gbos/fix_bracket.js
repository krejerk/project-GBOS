const fs = require('fs');
let content = fs.readFileSync('components/Archives.tsx', 'utf8');

content = content.replace(
    /return \(\n\s*<span key=\{j\}>\{displayText\}<\/span>\n\s*\);/g,
    `return (
        <span key={j}>{part.startsWith('「') && part.endsWith('」') ? \`「\${displayText}」\` : displayText}</span>
    );`
);

fs.writeFileSync('components/Archives.tsx', content);
