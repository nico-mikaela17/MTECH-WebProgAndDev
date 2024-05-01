const readline = require("node:readline");
const EventEmitter = require("events");
const { stdin: input, stdout: output } = require("node:process");
let inputNum = process.argv[2];
let count = process.argv.length;
const userInput = readline.createInterface({ input, output });

function userPrompt() {
  userInput.question('Enter a number (or type "exit" to finish) ', (answer) => {
    if (answer === "exit") {
      console.log("Thanks!");
      return userInput.close();
    }
    userPrompt();
  });
}
userPrompt();
