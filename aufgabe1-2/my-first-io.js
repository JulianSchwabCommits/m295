const fs = require('fs');

const file = process.argv[2];
content = fs.readFileSync(file).toString();

const lines = content.split('\n');
console.log(lines.length - 1);