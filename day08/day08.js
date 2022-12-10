const fs = require('fs');
const path = require('path');

// Prep
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split("\n");
const treeRows = input.map(i => i.split("").map(n => parseInt(n)));
const treeColumns = getTreeColumns(treeRows);

// Part 1
const edgeTrees = treeRows.length * 2 + treeRows[0].length * 2 - 4;
const visibleTrees = detectVisibleTrees();
console.log('visibleTrees :>> ', visibleTrees);

// Part 2
const highestScenicScore = getHighestScenicScore();
console.log('highestScenicScore :>> ', highestScenicScore);

// Utils
function getHighestScenicScore() {
    let scores = [];
    
    for(let rowId = 1; rowId < treeRows.length - 1; rowId++) {
        const row = treeRows[rowId];

        for(let colId = 1; colId < row.length - 1; colId++) {
            const column = treeColumns[colId];
            const currentTree = row[colId];

            const directions = {
                top: column.slice(0, rowId),
                right: row.slice(colId + 1),
                bottom: column.slice(rowId + 1),
                left: row.slice(0, colId),
            }

            const visibility = [];

            Object.keys(directions).forEach((d) => {
                const direction = d === 'top' || d === 'left' ? directions[d].reverse() : directions[d];

                for(let i = 0; i < direction.length; i++) {
                    const otherTree = direction[i];
                    if(otherTree >= currentTree || i === direction.length - 1) {
                        visibility.push(i + 1);
                        return;
                    }
                }

            });
    
            const score = visibility.reduce((acc, curr) => acc * curr);
            scores.push(score);
        }
    }

    return Math.max(...scores);
}

function detectVisibleTrees() {
    let innerTrees = 0;
    
    for(let rowId = 1; rowId < treeRows.length - 1; rowId++) {
        const row = treeRows[rowId];

        for(let colId = 1; colId < row.length - 1; colId++) {
            const column = treeColumns[colId];
            const currentTree = row[colId];

            const isSmaller = (otherTree) => otherTree < currentTree;

            const directions = {
                top: column.slice(0, rowId),
                right: row.slice(colId + 1),
                bottom: column.slice(rowId + 1),
                left: row.slice(0, colId),
            }

            const isVisible = Object.keys(directions).some((d) => directions[d].every(isSmaller));

            if (isVisible) innerTrees++;
        }
    }
    return innerTrees + edgeTrees;
}

function getTreeColumns(treeRows) {
    const columns = Array.from({length: treeRows.length}, () => []);

    treeRows.forEach((row) => {
        row.forEach((tree, i) => {
            columns[i].push(parseInt(tree));
        })
    });
    return columns;
}