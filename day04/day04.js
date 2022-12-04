const fs = require('fs');
const path = require('path');


const assignments = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n');
// get nested array, transform ['25-48,31-92'] into [25, 48, 31, 92]
const formatted = assignments.map(assignment => assignment.match(/\d+/g).map(n => parseInt(n)));

// Part 1:
const fullyContainFilter = ([a, b, c, d]) => (a >= c && b <= d) || (c >= a && d <= b);
const fullyContain = formatted.filter(fullyContainFilter);

console.log('fullyContains :>> ', fullyContain.length);

// Part 2:
const partiallyOverlapFilter = ([a, b, c, d]) => (a >= c && a <= d) || (c >= a && c <= b);
const partiallyOverlap = formatted.filter(partiallyOverlapFilter);

console.log('partiallyOverlaps :>> ', partiallyOverlap.length);