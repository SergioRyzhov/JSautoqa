function getSum(digits) {
    let sum = 0;
    for (let i=0; i < digits.length; i++) {
        sum += Number(digits[i]);
    };
    return sum;
}

function getHalfSumResult(data) {
    const firstPart = data.slice(0, data.length / 2);
    const secondPart = data.slice(data.length / 2);
    
    return (getSum(firstPart) === getSum(secondPart)) ? 'yes' : 'no';
}

console.log(getHalfSumResult('412342')); // no
console.log(getHalfSumResult('63544563')); // yes

//=======================================================

function getLessThenFifty(numData) {
    let num = 0;
    while (numData >= 50) {
        numData = numData / 2;
        num += 1;
    }
    numData = Math.round(numData);
    return `The firs number less then 50 is: ${numData}, it took ${num} iterations`;
}

console.log(getLessThenFifty(1000)); // The firs number less then 50 is: 31, it took 5 iterations
console.log(getLessThenFifty(24546)); // The firs number less then 50 is: 48, it took 9 iterations

//========================================================

function getMiddle(arr) {
    return arr.reduce((x, y) => x + y) / arr.length;
}

console.log(getMiddle([12, 15, 20, 25, 59, 79])); // 35

//========================================================

function getExtendedArray(defaultArray, injectionPosition, injectionData) {
    defaultArray.splice(injectionPosition, 0, ...injectionData);
    return defaultArray;
}

console.log(getExtendedArray([1, 2, 3, 4, 5], 3, ['a', 'b', 'c']));
// [1, 2, 3, 'a', 'b', 'c', 4, 5]

//========================================================

function getMultiExtendedArray(defaultArray, injections) {
    const defaultArrayLen = defaultArray.length;
    injections.forEach(injection => {
        const { position, data } = injection;
        defaultArray = getExtendedArray(
            defaultArray, 
            position + (defaultArray.length - defaultArrayLen), 
            data
        );
    });
    return defaultArray;
}

let array = [1, 2, 3, 4, 5];
let injections = [
    { position: 1, data: ['a', 'b'] },
    { position: 4, data: ['c'] },
    { position: 5, data: ['e'] }
];

console.log(getMultiExtendedArray(array, injections)); // [1, 'a', 'b', 2, 3, 4, 'c', 5, 'e']

//========================================================

function getSortedArray(arr) {
    return arr.sort((a, b) => a - b);
}

console.log(getSortedArray([3, 4, 1, 2, 7, 30, 50])); // [1, 2, 3, 4, 7, 30, 50]
