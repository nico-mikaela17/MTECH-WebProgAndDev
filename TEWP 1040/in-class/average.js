let input = process.argv;
let count = process.argv.length;

console.log(count);
let sum = 0;
for (let i = 2; i < count; i++) {
  console.log(input[i]);
  sum += Number(input[i]);
}
console.log(`sum: ${sum}, avg: ${sum / (count - 2)}`);
