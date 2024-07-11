console.log(`Task 1`);
const dicePoints = 6;
const totalPlayers = 5;
const totalThrows = 2;

function getRandomArray(length, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * max) + 1);
}

(function startGame() {
    console.log(`Starting a game with ${totalPlayers} players.`);
    console.log(`Each player has ${totalThrows} throws.`);
    
    const gameResult = {};
    for (let i=0; i < totalPlayers; i++) {
        const playerName = `Player ${i}`;
        gameResult[playerName] = getRandomArray(totalThrows, dicePoints).reduce((acc, val) => acc + val);
    };

    const maxScore = Math.max(...Object.values(gameResult));
    const maxScorePlayers = Object.keys(gameResult).filter(player => gameResult[player] === maxScore);

    console.log(gameResult);

    if (maxScorePlayers.length === 1) {
        console.log(`${maxScorePlayers[0]} WON with a score ${maxScore}!`);
    } else {
        console.log(`Draw with a score ${maxScore}`)
    };
})();

//============================================================

console.log(``);
console.log(`Task 2`);
const num = 15;
const parts = 3;

function handleBreakpointArray(number, arr) {
  const resultArray = [];

  arr.unshift(0);
  arr.push(number);

  for (let i = 0; i < arr.length - 1; i++) {
    resultArray.push(arr[i + 1] - arr[i]);
  }

  return resultArray;
}

function splitNumber(number, parts) {
  const breakpointsRounded = Array.from({ length: parts - 1 }, () => Math.round(Math.random() * number)).sort((a, b) => a - b);
  const breakpointsFloat = Array.from({ length: parts - 1 }, () => Math.random() * number).sort((a, b) => a - b);

  const roundedParts = handleBreakpointArray(number, breakpointsRounded);
  const floatParts = handleBreakpointArray(number, breakpointsFloat).map((item) => parseFloat(item.toFixed(2)));

  return {
    roundedParts,
    floatParts
  };
}

console.log(splitNumber(num, parts));

//==============================================================

console.log(``);
console.log(`Task 3`);

const startDate = '11.05.2018';

function countFridays(startDate) {
    const today = new Date();
    const curDate = new Date(startDate);

    let fridays = 0;

    while (curDate <= today) {
        if (curDate.getDate() === 13 && curDate.getDay() === 5) {
            fridays += 1;
        };
        curDate.setDate(curDate.getDate() + 1);
    };

    return fridays;
}

console.log(`There are ${countFridays(startDate)} fridays of 13th from ${startDate} until now)`);
