const fs = require('fs');
const path = require('path');


const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const rounds = input.split('\n').map(play => play.split(" "));

//++++++++ PART 1 ++++++++//
// A Rock         X Rock
// B Paper        Y Paper
// C Scissors     Z Scissors

const SELECTED_SHAPE = {
    X: 1,
    Y: 2,
    Z: 3,
    A: 1,
    B: 2,
    C: 3,
};

const ROUND_OUTCOME = {
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
}

const getPlayScore = (opp, me) => {
    let outcome = "";
    if (opp === "B" && me === "X" || opp === "C" && me === "Y" || opp === "A" && me === "Z") {
        outcome = "LOSE";
    }
    if (opp === "A" && me === "X" || opp === "B" && me === "Y" || opp === "C" && me === "Z") {
        outcome = "DRAW";
    }
    if (opp === "C" && me === "X" || opp === "A" && me === "Y" || opp === "B" && me === "Z") {
        outcome = "WIN";
    }
    return ROUND_OUTCOME[outcome] + SELECTED_SHAPE[me]
}
const score = rounds.reduce((score, [opponent, me]) => {
    const currentScore = getPlayScore(opponent, me);
    return score + currentScore;
}, 0);
console.log('score :>> ', score);

//++++++++ PART 2 ++++++++//
const OUTCOME_TO_ACHIEVE = {
    X: "LOSE",
    Y: "DRAW",
    Z: "WIN"
};
const getNewScore = (opp, outcome) => {
    let yourSelectedShape = "";
    if (OUTCOME_TO_ACHIEVE[outcome] === "DRAW") {
        yourSelectedShape = opp;
    }
    if(OUTCOME_TO_ACHIEVE[outcome] === "LOSE") {
        if (opp === "A") {
            yourSelectedShape = "Z"
        }
        if (opp === "B") {
            yourSelectedShape = "X"
        }
        if (opp === "C") {
            yourSelectedShape = "Y"
        }
    }
    if(OUTCOME_TO_ACHIEVE[outcome] === "WIN") {
        if (opp === "A") {
            yourSelectedShape = "Y"
        }
        if (opp === "B") {
            yourSelectedShape = "Z"
        }
        if (opp === "C") {
            yourSelectedShape = "X"
        }
    }
    return ROUND_OUTCOME[OUTCOME_TO_ACHIEVE[outcome]] + SELECTED_SHAPE[yourSelectedShape];
}
const newScore = rounds.reduce((score, [opponent, outcome]) => {
    const currentScore = getNewScore(opponent, outcome);
    return score + currentScore;
}, 0);
console.log('newScore :>> ', newScore);