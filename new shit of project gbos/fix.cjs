const fs = require('fs');
let content = fs.readFileSync('constants/archive_data.ts', 'utf8');

// 1. Fix the markdown links wrapped in Japanese quotes
// Because `replace` with regex will replace them in-memory
content = content.replace(/「\[(.*?)\]\(clue:(.*?)\)」/g, '[「$1」](clue:$2)');

// 2. Extract metadata and strip markdown bolding for empty fileId annotations
const regex = /"annotation":\s*\{\s*"fileId":\s*"",\s*"date":\s*"",\s*"level":\s*"",\s*"author":\s*"",\s*"template":\s*"(.*?)",\s*"content":\s*"(.*?)"\s*\}/g;

content = content.replace(regex, (match, template, annContent) => {
    let unescaped = annContent.replace(/\\n/g, '\n');
    
    let fileIdMatch = unescaped.match(/\*\*(?:文件编号|档案编号)[：:]\s*\*\*\s*(.*?)(?=\n|$)/) || unescaped.match(/\*\*(?:文件编号|档案编号)[：:]\s*(.*?)\*\*(?=\n|$)/) || unescaped.match(/(?:文件编号|档案编号)[：:]\s*(.*?)(?=\n|$)/);
    let dateMatch = unescaped.match(/\*\*日期[：:]\s*\*\*\s*(.*?)(?=\n|$)/) || unescaped.match(/\*\*日期[：:]\s*(.*?)\*\*(?=\n|$)/) || unescaped.match(/日期[：:]\s*(.*?)(?=\n|$)/);
    let levelMatch = unescaped.match(/\*\*密级[：:]\s*\*\*\s*(.*?)(?=\n|$)/) || unescaped.match(/\*\*密级[：:]\s*(.*?)\*\*(?=\n|$)/) || unescaped.match(/密级[：:]\s*(.*?)(?=\n|$)/);
    let authorMatch = unescaped.match(/\*\*(?:批注人|发件人|收件人)[：:]\s*\*\*\s*(.*?)(?=\n|$)/) || unescaped.match(/\*\*(?:批注人|发件人|收件人)[：:]\s*(.*?)\*\*(?=\n|$)/) || unescaped.match(/(?:批注人|发件人|收件人)[：:]\s*(.*?)(?=\n|$)/);
    
    let fileId = fileIdMatch ? fileIdMatch[1].trim() : "";
    let date = dateMatch ? dateMatch[1].trim() : "";
    let level = levelMatch ? levelMatch[1].trim() : "";
    let author = authorMatch ? authorMatch[1].trim() : "";
    
    let newContent = unescaped;
    // Remove the first line if it's a bold header like **FBI ...**
    newContent = newContent.replace(/^\*\*[^\n]+\*\*\n*/, '');
    newContent = newContent.replace(/^\*\*[^\n]+\*\*\n*/, ''); // in case there are two lines
    
    // Remove the metadata lines
    newContent = newContent.replace(/\*\*(?:文件编号|档案编号|日期|密级|批注人|发件人|收件人|主题)[：:]\s*\*\*\s*.*?(?=\n|$)\n?/g, '');
    newContent = newContent.replace(/\*\*(?:文件编号|档案编号|日期|密级|批注人|发件人|收件人|主题)[：:]\s*.*?\*\*\n?/g, '');
    newContent = newContent.replace(/(?:文件编号|档案编号|日期|密级|批注人|发件人|收件人|主题)[：:]\s*.*?(?=\n|$)\n?/g, '');
    
    let standardHeader = `File: ${fileId}\nDate: ${date}\nLevel: ${level}\nAuthor: ${author}\n\n`;
    newContent = standardHeader + newContent.trim();
    
    newContent = newContent.replace(/\n/g, '\\n');
    newContent = newContent.replace(/\*\*/g, '');
    
    // Support fixing the `[\"text\"]` if quotes inside JSON string break
    newContent = newContent.replace(/(?<!\\)"/g, '\\"');
    
    return `"annotation": {\n            "fileId": "${fileId}",\n            "date": "${date}",\n            "level": "${level}",\n            "author": "${author}",\n            "template": "${template}",\n            "content": "${newContent}"\n        }`;
});

fs.writeFileSync('constants/archive_data.ts', content);
console.log('Fixed file written to constants/archive_data.ts');
