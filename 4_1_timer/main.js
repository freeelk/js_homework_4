

let timer = require('./timer.js');

console.time('timerTest');
timer(3000).then(() => console.log('я вывелась через 3 секунды'));
console.timeEnd('timerTest');