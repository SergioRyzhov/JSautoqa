function getRandomMilisec() {
    return Math.floor(Math.random() * 5000) + 1;
}

function getPromisArray() {
    let promiseArray = [];

    for (let i=0; i < 3; i++) {
        promiseArray.push(new Promise((resolve) => {
            setTimeout(() => resolve(i + 1), getRandomMilisec());
        }))
    }
    return promiseArray;
}

Promise.race(getPromisArray()).then((data) => console.log('The first resolved promise is:', data));


function getNum(min, max, delay) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(Math.floor(Math.random() * (max - min + 1)) + min);
    }, delay * 1000));
}

async function getSquareNum(min, max, delay) {
    const number = await getNum(min, max, delay);
    return number ** 2;
}

getSquareNum(1, 5, 3).then(data => console.log(`The getNum square is: ${data}`));


async function getSumOfNums() {
    const number1 = await getNum(1, 5, 3);
    const number2 = await getNum(6, 10, 5);
    return number1 + number2;
}

getSumOfNums().then(data => console.log(`The sum of promise's numbers is: ${data}`));