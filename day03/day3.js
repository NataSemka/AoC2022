const fs = require('fs');
const path = require('path');


const rucksackArr = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').split('\n');
const PRIORITY = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
}
const upperCaseBonus = Object.keys(PRIORITY).length;

// Part 1:
// split items in rucksack into two compartments
// compare items from both compartments and find a common item (hi, intersection) and collect these items in one array
// iterate over array and calculate a priority of each item, and find total summ
const getCompartments = (rucksack) => {
    const regex = new RegExp(`.{1,${rucksack.length/2}}`, 'g');
    return rucksack.match(regex);
}
const getCommonItem = ([first, second]) => {
    for (item of new Set(first)) {
        if(new Set(second).has(item)) {
            return item;
        }
    }
}
const isUpperCase = (i) => i == i.toUpperCase() ? true : false;

const getItemPriority = (i) => isUpperCase(i) ? (PRIORITY[i.toLowerCase()] + upperCaseBonus) : (PRIORITY[i])

const sum1 = rucksackArr.reduce((acc, rucksack) => acc + getItemPriority(getCommonItem(getCompartments(rucksack))), 0);

console.log('sum1 :>> ', sum1);

// Part 2:
// split array into teams: each three rucksacks is a team
// find a common item within a team
// calculate the priority of each item and a total summ 
const getTeamArray = () => {
    const teamArray = [];
    let team = [];
    counter = 0;
    for (i = 0; i <= rucksackArr.length; i++) {
        counter ++;
        team.push(rucksackArr[i]);
        if (counter === 3) {
            teamArray.push(team);
            team = [];
            counter = 0;
        }
    }
    return teamArray;
}
const getTeamItem = ([first, second, third]) => {
    for (item of new Set(first)) {
        if(new Set(second).has(item) && new Set(third).has(item)) {
            return item;
        }
    }
}
const teamArray = getTeamArray();

const sum2 = teamArray.reduce((acc, team) => acc + getItemPriority(getTeamItem(team)), 0);

console.log('sum2 :>> ', sum2);