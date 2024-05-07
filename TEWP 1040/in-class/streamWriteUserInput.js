const fs = require("fs");

let stream = fs.createWriteStream("sayings.txt");

process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  if (data.toLowerCase().trim() === "exit") {
    stream.close();
    process.exit();
  } else {
    stream.write(data);
  }
});
