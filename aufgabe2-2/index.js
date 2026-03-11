import fs from 'node:fs/promises';

async function readFileContent(filename) {
    return fs.readFile(filename, 'utf8');
}

readFileContent('index.js')
    .then(content => {
        console.log('Die Länge des Dateiinhalts beträgt:', content.length);
    })
    .catch(err => {
        console.error('Fehler beim Lesen der Datei:', err);
    });