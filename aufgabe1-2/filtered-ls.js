const fs = require('fs');
const path = require('path');

const directory = process.argv[2];
const extension = process.argv[3];

fs.readdir(directory, (err, files) => {
    if (err) return console.error(err);

    const filtered = files.filter(file => path.extname(file) === '.' + extension);

    filtered.forEach(file => console.log(file));
});