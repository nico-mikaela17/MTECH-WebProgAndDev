const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const userInput = readline.createInterface({ input, output });
const fs = require("node:fs");
const fileName = "./writeOut.txt";

function userPrompt() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  userInput.question(
    'Tell me more about your day (or type "exit" to finish) ',
    (answer) => {
      if (answer === "exit") {
        console.log("Thanks!");
        return userInput.close();
      }
      userPrompt();
      // const file = fs.createWriteStream(fileName);
      fs.appendFile(fileName, `${hour}:${minutes} - ${answer}\n`, (err) => {
        if (err) console.log(err);
      });
      // file.write(`${hour}:${minutes} - ${answer}`);
      // file.end();
    }
  );
}
userPrompt();
