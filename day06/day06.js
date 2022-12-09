const fs = require('fs');
const path = require('path');


const signal = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split("");

const getProcessedCharacters = (signal, markerSize) => {
    for(let i = markerSize; i < signal.length; i++) {
        const marker = signal.slice(i - markerSize, i);
        if ((new Set(marker)).size === markerSize) return i ;
    }
}

//Part 1
const processedCharacters = getProcessedCharacters(signal, 4);
console.log('processedCharacters :>> ', processedCharacters);

// Part 2
const processedCharacters2 = getProcessedCharacters(signal, 14);
console.log('processedCharacters :>> ', processedCharacters2);