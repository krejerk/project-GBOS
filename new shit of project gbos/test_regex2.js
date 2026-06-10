const patternStr = ['\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');

const para = "测试一段话 [点击查看图片](clue:jane_doe) 中间内容 [点击查看照片](clue:view_capone_alice_meeting) 结尾。";
const parts = para.split(docRegex);
console.log(parts);
