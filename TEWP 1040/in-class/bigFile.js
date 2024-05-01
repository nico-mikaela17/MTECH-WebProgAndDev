const fs = require("node:fs");
const file = fs.createWriteStream("./sample.txt");
for (let i = 0; i < 80; i++) file.write("I love my cat");
file.end();
