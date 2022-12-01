const fs = require('fs');
const path = require('path');


const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const elvesArray = input
    .split('\n\n')
    .map(elf => elf.split('\n')
    .reduce((acc, cur) => acc + Number(cur), 0));
const topElf = elvesArray.reduce((acc, curr) => curr > acc ? curr : acc);
console.log('part 1 :>> ', topElf);

const topThree = elvesArray.sort((a, b) => b - a).slice(0, 3);
const topThreeAmount = topThree.reduce((acc, cur) => acc + cur)
console.log('part 2 :>> ', topThreeAmount);
