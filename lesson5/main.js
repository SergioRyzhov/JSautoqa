let str = 'string';
let bool = true;
let num = 5;

console.log(str + bool); // stringtrue
console.log(str + num); // string5
console.log(num + bool); // 6

console.log(str * bool); // NaN
console.log(str * num); // NaN
console.log(num * bool); // 5

console.log(str / bool); // NaN
console.log(str / num); // NaN
console.log(num / bool); // 5

console.log(String(num)); // 5
console.log(Boolean(num)); // true

console.log(String(bool)); // true
console.log(Number(bool)); // 1

console.log(Boolean(str)); // true
console.log(Number(str)); // NaN