const express = require("express");
const fs = require("fs");

const app = express();
//able to use the form data
app.use(express.urlencoded({ extended: false }));

const port = 3001;

let fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "lemon", color: "yellow" },
  { name: "lime", color: "green" },
];

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post("/", (req, res) => {
  let fruit = req.body.fruit.toLowerCase();
  let message = `I don't know the color`;
  let askColor = `<form action="/" method="post"> <input name='askColor' placeholder="What color is ${fruit}?"></input></form>      <input type="submit" />
  `;
  let answer = "";

  fruits.forEach((element) => {
    if (fruit === element.name) {
      message = element.color;
      answer = `${fruit} is ${message}`;
    } else {
      answer = ` ${message}\n${askColor} `;
    }
  });
  res.send(answer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//form to put the fruit name and color, submit,server - look up for the fruit (if it knows - return color) else - message +  added to list
