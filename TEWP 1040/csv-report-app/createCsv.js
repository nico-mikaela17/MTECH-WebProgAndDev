const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "data/students.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "age", title: "Age" },
  ],
  append: false,
});

const students = [
  { name: 'Thor', age: 1500 },
  { name: 'Loki', age: 1050 },
];

csvWriter.writeRecords(students).then(() => console.log("Done"));
