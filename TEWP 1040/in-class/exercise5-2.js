const fs = require("fs");

const fileToRead = process.argv[2];
const fileToWrite = process.argv[3];

//get data
fs.readFile(fileToRead, "utf8", (err, data) => {
  if (err) throw err;
  console.log(`Finding data...`);
  //search globaly (multiple words, not just the first one) AND exact match
  const wordToFind = /\bbacon\b/gi;
  const foundWords = data.match(wordToFind).length;
  //count how many "bacon"
  console.log(`Bacon was found ${foundWords} times`);
  //replace word bacon for tasty
  const tastyText = data.replace(wordToFind, "tasty");
  fs.writeFile(fileToWrite, tastyText, (err) => {
    if (err) throw err;
  });
  console.log();
});
