const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
let inputNum = process.argv;
let count = process.argv.length;
const userInput = readline.createInterface({ input, output });

userInput.question('Enter a number (or type "exit" to finish) ', (answer) => {
  while (answer === Number) {
    if (answer === Number) {
      question;
    } else if (answer === "exit") {
      let sum = 0;
      for (let i = 2; i < count; i++) {
        console.log(inputNum[i]);
        sum += Number(inputNum[i]);
      }
      console.log(`sum: ${sum}, avg: ${sum / (count - 2)}`);

      userInput.close();
    }
  }
});
