const fs = require('fs');
const path = require('path');

// Prep
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split("\n");

// Part 1
let cycle = 0;
const cyclesToTrack = [];
const signalStrengthSum = getSignalStrengthSum();
console.log('signalStrengthSum :>> ', signalStrengthSum);

// Part 2
cycle = 0;
let CRT = [];
renderCRT();
console.log(CRT.join('')); // PLEFULPB

// Utils
function renderCRT() {
    let X = 1;

    for(let i = 0; i < input.length; i++) {
        const [operation, value] = input[i].split(" ");
    
        pushPixel(X);
    
        if(operation === 'addx') {   
            pushPixel(X);
            X = X + (parseInt(value));
        }
    }
}
function pushPixel(X) {
    if(cycle === X || cycle === X - 1 || cycle === X + 1) {
        CRT.push('#');
    } else {
        CRT.push(' ');
    }
    cycle++;
    if(cycle % 40 === 0) {
        CRT.push('\n');
        cycle = 0;
    }
}
function getSignalStrengthSum() {
    let X = 1;

    for(let i = 0; i < input.length; i++) {
        const [operation, value] = input[i].split(" ");
        updateCycles(X);

        if(operation === 'addx') {
            updateCycles(X);
    
            X = X + (parseInt(value));
        }
    }
    return cyclesToTrack.reduce((acc, curr) => acc + curr);
}

function updateCycles(X) {
    cycle++;
    if((cycle + 20) % 40 === 0) {
        cyclesToTrack.push(cycle * X);
    };
}
