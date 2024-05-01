const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
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
