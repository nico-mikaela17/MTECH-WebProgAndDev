const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
app.use(express.static("form"));
app.use(express.urlencoded({ extended: false }));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/recipe", (req, res) => {
  res.sendFile(`${__dirname}/recipe.txt`);
});

app.get("/form", (req, res) => {
  res.sendFile(`${__dirname}/form/index.html`);
});
app.post("/form", (req, res) => {
  let fName = req.body.fName;
  let lName = req.body.lName;
  res.send(`got it ${fName} ${lName}!`);
});

app.get("/time", (req, res) => {
  // Read the file asynchronously
  fs.readFile("./time.js", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }
    // Send the content of the file as the response
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
