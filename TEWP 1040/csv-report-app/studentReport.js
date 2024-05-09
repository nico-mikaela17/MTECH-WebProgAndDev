const csv = require("csv-parser");
const fs = require("fs");
let fileName = "./students.csv";

fs.createReadStream(fileName)
  .pipe(csv())
  .on("data", (row) => {
console.log(row)})
.on("end", () => {
  console.log("CSV file read successfully.");
});

fs.writeFile("output.csv", "id,name,credits\n", (err) => {
  if (err) throw err;
  dataToWrite.forEach((row) => {
    fs.appendFile("output.csv", `${row.id},${row.name},${row.credits}\n`, (err) => {
      if (err) throw err;
    });
  });
});

// fs.writeFile(`./students/${fileName}`, "utf8")
//   .on("data", (row) => {
//     let students = 0;
//     let credits = 0;

//     row.forEach((student) => csvWriter.writeRecords(student));
//     if (row.id) {
//       students++;
//     } else if ("quit" === make) {
//       quit();
//     }
//   });

// function calculateTuition() {}
