let randomNum = 100000;
console.log(randomNum);

let pi = 3.141592654;
let num = pi.toFixed(2);
console.log(num);
console.log(pi.toPrecision(5));

//random
let num1 = Math.random().toFixed(1) * 30;
let num2 = Math.random().toFixed(1) * 30;
let num3 = Math.random().toFixed(1) * 30;

console.log(num1, num2, num3);

//find biggest num
let maxNum = Math.max(num1, num2, num3);
console.log(maxNum);
