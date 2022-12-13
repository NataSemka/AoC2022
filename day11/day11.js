const fs = require('fs');
const path = require('path');

// Prep
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split("\n");

// Part 1
let monkeys = parseInput();
rounds(20, true);
monkeyBusinessLevel = getMonkeyBusinessLevel();
console.log('monkeyBusinessLevel :>> ', monkeyBusinessLevel);

// Part 2
monkeys = parseInput();
const stressMod = monkeys.map(m => m.test).reduce((acc, curr) => acc * curr);
rounds(10000, false);
monkeyBusinessLevel = getMonkeyBusinessLevel();
console.log('monkeyBusinessLevel after 10000 rounds :>> ', monkeyBusinessLevel);

// Utils
function getMonkeyBusinessLevel() {
    return monkeys.map(m => m.activity).sort((a, b) => b - a).slice(0, 2).reduce((acc, curr) => acc * curr);
}
function rounds(amount, useBoredLevel) {
    for(let i = 0; i < amount; i++) {
        monkeyPlay(useBoredLevel);
    }
}
function monkeyPlay(useBoredLevel) {
    for(let m = 0; m < monkeys.length; m++) { // iterate over monkeys
        const monkey = monkeys[m];
        const numberOfItems = monkey.items.length;

        for(let i = 0; i < numberOfItems; i ++) { // iterate over items
            let item = monkey.items.shift();

            let worryLevel = performOperation(item, monkey.op);

            let boredLevel = 0;

            if(useBoredLevel) {
                boredLevel = Math.floor(worryLevel / 3)
            } else {
                boredLevel = worryLevel % stressMod;
            }

            let testingResult = boredLevel % monkey.test === 0;

            if (testingResult) {
                monkeys[monkey.ifTrue].items.push(boredLevel);
            } else {
                monkeys[monkey.ifFalse].items.push(boredLevel);
            }

            monkey.activity++;
        }
    }
    return monkeys;
}

function performOperation(item, op) {
    let worryLevel = 0;
    if (op[1] === '*') {
        worryLevel = item * (op[2] === 'old' ? item : parseInt(op[2]));
    }
    if (op[1] === '+') {
        worryLevel = item + (op[2] === 'old' ? item : parseInt(op[2]));
    }
    if (op[1] === '-') {
        worryLevel = item - (op[2] === 'old' ? item : parseInt(op[2]));
    }
    if (op[1] === '/') {
        worryLevel = item / (op[2] === 'old' ? item : parseInt(op[2]));
    }
    return worryLevel;
};
function parseInput() {
    const monkeys = [];
    let monkey = {};
    input.forEach((line, i) => {
        if(line.includes('Monkey')) {
            const items = input[i + 1].match(/\d+/g).map(i => parseInt(i));
            const operation = input[i + 2];
            const op = operation.substring(operation.indexOf('=') + 2).split(" ");
            const test = parseInt(input[i + 3].match(/\d+/g).join()); // divisible by this number
            const ifTrue = parseInt(input[i + 4].match(/\d+/g).join()); // push to monkey 
            const ifFalse = parseInt(input[i + 5].match(/\d+/g).join()); // push to monkey 
            monkey = {
                items,
                op,
                test,
                ifTrue,
                ifFalse,
                activity: 0,
            };
            monkeys.push(monkey);
        }
    });
    return monkeys;
}