const express = require("express");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

const secret = "asdfoliver";

const users = [
  {
    username: "asdf",
    password: "asdf",
  },
];

const courses = [{ courseId: 1, courseName: "WEB 101" }];

const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((currUser) => (currUser.username = username));
  if (!user || user.password !== password) {
    return res.status(401).json({ errorMessage: "Invalid Credentials" });
  }
  const token = jwt.sign({ username: user.username }, secret, {
    algorithm: "HS256",
    expiresIn: "10d",
  });
  return res.json({ token: token });
});

app.get(
  "/courses",
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  (req, res) => {
    console.log(req.auth.username);
    res.json({ courses: JSON.stringify(courses) });
  }
);

app
  .use((err, req, res) => {
    if ((err.name = "UnauthorizedError")) {
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    } else {
      console.log(err.stack);
      res.status(500).json({ errorMessage: "Something went wrong" });
    }
  })

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
