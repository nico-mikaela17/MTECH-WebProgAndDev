const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "aedcvegtrds",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 },
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// app.use(express.static)

app.get("/views", (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
    res.end("Welcome to the session demo. Refresh!");
  } else {
    req.session.views++;
    // res.setHeader()
    res.end(
      `<p>Views: ${req.session.views}</p>
      <p>Expires in ${req.session.cookie.maxAge}</p>`
    );
  }
});

app.listen(3000, () => {
  console.log("port 3000");
});
