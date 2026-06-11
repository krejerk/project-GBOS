const patternStr = [ '\\[.*?\\]\\(clue:.*?\\)', '「.*?」' ].join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');
const text = "雷吉博士将该符号称为“[黄油朱莉普](clue:julip)”。[图片见附录](clue:butter_julep_evidence)";

text.split(docRegex).forEach(part => {
    if(!part) return;
    let displayText = part;
    let forceClueId = null;
    const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
    if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; }
    else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); }
    
    console.log("Part:", part, "-> DisplayText:", displayText, "ForceClueId:", forceClueId);
});
