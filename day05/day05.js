const fs = require('fs');
const path = require('path');

// Prep
const [rawCrates, rawInstructions] = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n\n');
const crates = formatCrates(rawCrates.split("\n").reverse());
const instructions = rawInstructions.trim().split("\n").map((instruction) => instruction.match(/\d+/g));


// Part 1
const arrangedBy9000 = arrangeCrates(crates, instructions, 9000);
console.log('part 1 :>> ', arrangedBy9000);

// Part 2
const arrangedBy9001 = arrangeCrates(crates, instructions, 9001);
console.log('part 2 :>> ', arrangedBy9001);

// Utils
function arrangeCrates(crates, instructions, crateMover) {
    const copy = crates.map(c => [...c]);

    instructions.forEach(([move, from, to]) => {
        const portion = copy[from - 1].splice(-parseInt(move));

        if(crateMover === 9000) portion.reverse();

        copy[to - 1].push(...portion);
    });

    return copy.map(crate => crate.pop()).join("");
}

function formatCrates(rawCrates) {
    const stacksAmount = rawCrates[0].match(/\d+/g);
    const stackedCrates = Array.from({length: stacksAmount.length}, () => [])

    for(let i = 1; i < rawCrates.length; i++) {
        const crateLine = rawCrates[i].split("");
        const crates = crateLine.filter((_, index) => (index - 1) % 4 === 0);

        crates.forEach((crate, index) => {
            if(crate.match(/[A-Z]/g)) {
                stackedCrates[index].push(crate);
            }
        })
    }

    return stackedCrates;
};