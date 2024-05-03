const csv = require("csv-parser");
const fs = require("fs");

console.log(`Type a car make and find how many cars there are`);
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  let make = data.trim();
  let count = 0;

  fs.createReadStream("data/usedCars.csv")
    .pipe(csv())
    .on("data", (row) => {
      // let models = data.make;
      if (row.make === make) {
        count++;
      } else if ("quit" === make) {
        quit();
      }
    })
    .on("end", () => {
      console.log(`You have entered ${make}\nNumber of matched car: ${count}`);
    });
});

function quit() {
  console.log("Thanks for checking! Bye :)");
  process.exit();
}
