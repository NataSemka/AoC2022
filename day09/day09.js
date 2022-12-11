const fs = require('fs');
const path = require('path');

// Prep
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split("\n");

// Part 1
const uniqueTailPositions2 = getTailPositions(2);
console.log('Unique tail positions 2 :>> ', uniqueTailPositions2);

// Part 2
const uniqueTailPositions10 = getTailPositions(10);
console.log('Unique tail positions 10 :>> ', uniqueTailPositions10);


// Utils
function getTailPositions (numberOfKnots) {
    const rope = Array.from({length: numberOfKnots}, () => ({x: 0, y: 0}));
    const tail = rope[rope.length - 1];
    const tailPositions = new Set([JSON.stringify(tail)]);

    for (let i = 0; i < input.length; i++) {
        const [direction, steps] = input[i].split(" ");
    
        for(let s = 0; s < parseInt(steps); s++) {
            if(direction === 'R') rope[0].x += 1;
            if(direction === 'L') rope[0].x -= 1;
            if(direction === 'U') rope[0].y += 1;
            if(direction === 'D') rope[0].y -= 1;

            for(let k = 0; k < rope.length - 1; k++) {
                const currentKnot = rope[k];
                const nextKnot = rope[k + 1];

                if (isNotAdjasent(currentKnot, nextKnot)) {
                    if(currentKnot.x > nextKnot.x) nextKnot.x += 1;
                    if(currentKnot.x < nextKnot.x) nextKnot.x -= 1;
                    if(currentKnot.y > nextKnot.y) nextKnot.y += 1;
                    if(currentKnot.y < nextKnot.y) nextKnot.y -= 1;

                    tailPositions.add(JSON.stringify(tail));
                }
            }
        }
    }
    return tailPositions.size;
}

function isNotAdjasent(H, T) {
    return Math.abs(H.x - T.x) > 1 || Math.abs(H.y - T.y) > 1;
}
