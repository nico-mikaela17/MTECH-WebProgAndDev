const express = require("express");
const session = require("express-session");
const passport = require("passport");

const passportConfig = require("./config/passport.config");
const authRouter = require("./routes/auth.routes");

const app = express();
configureServer();
createRoutes();

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

function configureServer() {
  //using pug and where to find the files
  app.set("views", "./views");
  app.set("view engine", "pug");

  passportConfig(passport);

  app.use(
    session({
      secret: "asdf",
      resave: false,
      saveUninitialize: false,
      cookie: { maxAge: 60000 },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

function createRoutes() {
  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/displayUserDetails", (req, res) => {
    console.log(req.user);
    res.render("userDetails", { user: req.user });
  });
}
