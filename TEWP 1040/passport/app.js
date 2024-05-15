const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const users = require("./db/users");
const student = require("./protected/student");
const passport = require("passport");
const login = require("connect-ensure-login");
const bycript = require("bcryptjs");
const { Strategy } = require("passport-local");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  require("express-session")({
    secret: "WhyPassportLocal!",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  new Strategy((username, password, cb) => {
    console.log(
      `in passport local strategy checking user ${username} ${password}`
    );
    users.findByUsername(username, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      let isMatched = bycript.compareSync(password, user.password);
      if (!isMatched) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  users.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/login", (req, res) => {
  res.redirect("/login.html");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(`Login success`);
    res.redirect("/");
  }
);

app.use("/students?", login.ensureLoggedIn(), student);
app.get("/test", login.ensureLoggedIn(), (req, res) => {
  res.send("This is protected");
});

app.get("/logout", (req, res, cb) => {
  req.logout((err) => {
    if (err) {
      return cb(err);
    }
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`"${bycript.hashSync("password12345", 10)}"`);
});
