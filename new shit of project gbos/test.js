const q = "干涸石涧 无名女尸";
let queryRemainder = q;
const sortedAliases = ["无名尸体", "无名女尸", "干涸石涧", "石涧"]; // example
for (const lowerAlias of sortedAliases) {
  if (queryRemainder.includes(lowerAlias)) {
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}
const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
console.log("cleanRemainder:", cleanRemainder, cleanRemainder.length);
