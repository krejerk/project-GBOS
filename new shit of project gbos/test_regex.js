let q = "供述 No. 24拉古那海滩裸根";
q = q.toLowerCase();
// remove aliases
q = q.replace("拉古那海滩", "");
q = q.replace("裸根", "");

let cleanRemainder = q
  .replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '')
  .replace(/[0-9]+/g, '')
  .replace(/(供述|confession|剪报|clipping|档案|archive|no)/gi, '');

console.log(cleanRemainder, cleanRemainder.length === 0);
