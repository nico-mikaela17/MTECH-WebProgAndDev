//read-csv.js
//use module csv-parser

const csv = require("csv-parser");
const fs = require("fs");

fs.createReadStream("data/languages.csv")
  .pipe(csv())
  .on("data", (row) => {
    console.log(row);
  })
  .on("end", () => {
    console.log("CSV file read");
  });

fs.readFile("data/languages.csv", "utf8", (err, data) => {
  if (err) throw err;
  //search globaly (multiple words, not just the first one) AND exact match

  console.log(result);
  const wordToFind = new RegExp(process.argv[2], "gi");
  const foundWords = data.match(wordToFind);
  // const result = data.filter((word) => word === wordToFind);

  if (foundWords) {
    console.log(`Found ${foundWords.length}, ${result}`);
  } else {
    console.log("No matches found.");
  }
});

//FIXME: find rows that match my search and return ONLY THOSE
//TODO: find how many times my word shows up
