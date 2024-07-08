let arr = [1, 2, 3, 4, 5, 6];

function reverseFunc(arr) {
    return arr.reverse();
}

console.log(reverseFunc(arr));


let arr2 = [3, 67, 15, 24, 8]

function findMaxNumber(arr) {
    let maxNumber = 0;
    arr.forEach(element => {
        if (element > maxNumber) {
            maxNumber = element;
        };
    });
    return maxNumber;
}

console.log(findMaxNumber(arr2));


function calcFiboSeq(n, m) {
    let fiboArray = [0, 1];

    if (m > 1) {
        for (let i=2; i < n-1+m; i++) {
            fiboArray.push(fiboArray[i-1] + fiboArray[i-2]);
        };
    };
    
    return fiboArray.slice(-m);
}

console.log(calcFiboSeq(5, 3));


function matchDigitsAndPositions (firstNum, secondNum) {
    firstNum = String(firstNum);
    secondNum = String(secondNum);
    let digitAndPositionCounter = 0;
    let digitCounter = 0;

    for (let i=0; i < firstNum.length; i++) {
        if (firstNum[i] === secondNum[i]) {
            digitAndPositionCounter += 1;
        };
        if (secondNum.indexOf(firstNum[i]) !== -1) {
            digitCounter += 1;
        };
    };

    return `Mutched Digit and Position: ${digitAndPositionCounter},  Digit: ${digitCounter}`;
}

console.log(matchDigitsAndPositions(3487, 3794));


function sortArray (arr) {
    const ascending = [...arr].sort((a, b) => a - b);
    const descending = [...arr].sort((a, b) => b - a);
    return { ascending, descending };
}

console.log(sortArray([1, 80, 24, 4, 6, 6, 3, 7, 2]));


function removeDublicates(arr) {
    const newArray = arr.filter((val, ind) => arr.indexOf(val) === ind);
    return newArray;
}

console.log(removeDublicates([4, 2, 6, 3, 2, 5, 6, 8, 6]));