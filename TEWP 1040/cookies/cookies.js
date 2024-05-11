const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.cookie("mycookie", "myvalue", { httpOnly: true });
  res.send("hello world");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  req.status(500).send("something broke");
});

app.listen(3000, () => {
  console.log("port 3000");
});
