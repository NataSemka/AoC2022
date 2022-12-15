const fs = require("fs");
const path = require("path");

// Prep
const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((i) => i.split(""));
let goal = getPoint("E");
const elevationScale = "abcdefghijklmnopqrstuvwxyzE".split("");

// Part 1
let startPoint = getPoint("S")
  .split(",")
  .map((i) => parseInt(i));
const fewestStepsFromS = goHiking(startPoint);
console.log("fewestStepsFromS :>> ", fewestStepsFromS);

// Part 2
const startingPoints = getPoint("a").map((i) => i.split(",").map((n) => parseInt(n)));
const numberOfSteps = startingPoints.map((start) => goHiking(start));
const fewestStepsFromA = numberOfSteps.sort((a, b) => a - b)[0];
console.log("fewestStepsFromA :>> ", fewestStepsFromA);

// Utils
function goHiking(startPoint) {
  let current = getPoint("S");
  let locationQueue = [[0, ...startPoint]];
  let visited = [current]; // elements that we just added to the locationQueue

  while (locationQueue.length !== 0) {
    const [steps, rowIndex, colIndex] = locationQueue.shift();
    const fewestNeededSteps = step(steps, rowIndex, colIndex, visited, locationQueue);
    if (fewestNeededSteps) {
      return fewestNeededSteps;
    }
  }
}

// this function is implementing breadth first algorithm https://en.wikipedia.org/wiki/Breadth-first_search
function step(stepCounter, rowIndex, colIndex, visited, locationQueue) {
  const row = input[rowIndex];
  const letter = row[colIndex];
  current = `${rowIndex},${colIndex}`;
  if (current === goal) {
    return stepCounter;
  }

  if (row.length - colIndex > 1) {
    // take from the right
    const rightPoint = `${rowIndex},${colIndex + 1}`;
    const rightLetter = row[colIndex + 1];
    if (elevationAllows(letter, rightLetter) && visited.indexOf(rightPoint) === -1) {
      visited.push(rightPoint);
      locationQueue.push([stepCounter + 1, rowIndex, colIndex + 1]);
    }
  }
  if (input.length - rowIndex > 1) {
    // take from the bottom
    const bottomPoint = `${rowIndex + 1},${colIndex}`;
    const bottomLetter = input[rowIndex + 1][colIndex];
    if (elevationAllows(letter, bottomLetter) && visited.indexOf(bottomPoint) === -1) {
      visited.push(bottomPoint);
      locationQueue.push([stepCounter + 1, rowIndex + 1, colIndex]);
    }
  }
  if (colIndex > 0) {
    // take from the left
    const leftPoint = `${rowIndex},${colIndex - 1}`;
    const leftLetter = row[colIndex - 1];
    if (elevationAllows(letter, leftLetter) && visited.indexOf(leftPoint) === -1) {
      visited.push(leftPoint);
      locationQueue.push([stepCounter + 1, rowIndex, colIndex - 1]);
    }
  }
  if (rowIndex > 0) {
    // take from the top
    const topPoint = `${rowIndex - 1},${colIndex}`;
    const topLetter = input[rowIndex - 1][colIndex];
    if (elevationAllows(letter, topLetter) && visited.indexOf(topPoint) === -1) {
      visited.push(topPoint);
      locationQueue.push([stepCounter + 1, rowIndex - 1, colIndex]);
    }
  }
}

function elevationAllows(current, next) {
  return elevationScale.indexOf(next) <= elevationScale.indexOf(current) + 1;
}

function getPoint(element) {
  let points = [];
  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
      if (input[r][c] === element) {
        points.push(`${r},${c}`);
      }
    }
  }
  return points.length === 1 ? points[0] : points;
}
