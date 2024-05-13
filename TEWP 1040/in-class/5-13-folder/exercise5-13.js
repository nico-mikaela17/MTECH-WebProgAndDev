const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.use(express.static("5-13-folder"));
app.use(express.urlencoded({ extended: false }));

app.get("/students?/:id", (req, res) => {
  res.send(`arrived ${req.params.id}\n`);
});

app.post("/newStudent", (req, res) => {
  const fName = req.body.fName;
  res.send(fName);
});

app.listen(port, () => {
  console.log("port 3000");
});
