const fs = require("fs");

//get data
fs.readFile("./bacon.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
  const wordToFind = /bacon/gi;
  const foundWords = data.match(wordToFind);
  //count how many "bacon"
  console.log(foundWords.length);
  //replace word bacon for tasty
  const tastyText = data.replace(wordToFind, "tasty");
  fs.writeFile("tasty.txt", tastyText, (err) => {
    if (err) throw err;
  });
  console.log();
});
