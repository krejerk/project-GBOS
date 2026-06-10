const patternStr = ['\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');
const para = "开往埃尔帕索方向。[点击查看照片](clue:view_capone_alice_meeting)。";
const parts = para.split(docRegex);
console.log(parts);
