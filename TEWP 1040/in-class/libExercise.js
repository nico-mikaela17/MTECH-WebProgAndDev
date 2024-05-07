const fs = require("fs");

//what's in the lib folder?
fs.readdir("./lib", (err, data) => {
  if (err) throw err;
  console.log(`Contents of lib folder: ${data}`);
  data.forEach((element) =>
    fs.stat(`./lib/${element}`, (err, data) => {
      if (err) throw err;
      if (data.isFile()) {
        fs.readFile(`./lib/${element}`, "utf-8", (err, moreData) => {
          if (err) throw err;
          console.log(moreData);
        });
      }
    })
  );
});

//array, loop over that, call fs.stats in each, callback - isFile(), if true - readFile

//asynchronous version
async function readFiles() {
  const files = await fsp.readdir("./lib");
  files.forEach(async (fileName) => {
    const file = path.join(__dirname, "lib", fileName);

    const stats = await fsp.stat(file);
    if (stats.isFile()) {
      const contents = await fsp.readFile(file, "utf8");
      console.log(`${fileName}: ${contents}`);
    }
  });
}
