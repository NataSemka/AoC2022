const fs = require('fs');
const path = require('path');

const ROOT = '/';
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split("\n");
const directories = calculateDirsSize(input);


// Part 1
const total = getAtMost100000(directories);
console.log('total :>> ', total); // 919137

// Part 2
const DISK_SPACE = 70000000;
const MIN_REQUIRED = 30000000;
const totalUsed = directories.get(ROOT);
const needToFreeUp = totalUsed - (DISK_SPACE - MIN_REQUIRED);

const smallestNeededDirSize = getSmallestDir(directories);
console.log('smallestNeededDirSize :>> ', smallestNeededDirSize); // 2877389

// Utils
function getSmallestDir(dirs) {
    let theRightOne = totalUsed;
    for (let [_, size] of dirs) {
        if (size >= needToFreeUp && size < theRightOne) {
            theRightOne = size
        } 
    }
    return theRightOne;
}

function calculateDirsSize(input) {
    const dirs = new Map();
    let current = ROOT;

    input.forEach(line => {
        if(line.slice(0, 4) === '$ cd') {
            const dirName = line.slice(5);
            if(dirName === '..') {
                current = path.dirname(current);
            } else {
                current = path.join(current, dirName);
                dirs.set(current, 0);
            }
        }
        if(line.match(/\d+/g)) { // if file
            const size = parseInt(line.match(/\d+/g)[0]);
            let temp = ROOT;

            current.split(path.sep).forEach((d) => {
                temp = path.join(temp, d);
                dirs.set(temp, dirs.get(temp) + size);
            })
        }
    })
    return dirs;
}
function getAtMost100000(directories) {
    let total = 0;
    for (let [_, size] of directories) {
        if (size <= 100000) {
            total += size;
        }
    }
    return total;
}