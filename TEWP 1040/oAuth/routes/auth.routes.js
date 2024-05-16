const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

//when click on the link
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      //info that we want access to
      "profile",
      "email",
    ],
  })
);

//after getting info,has access code, access token
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/displayUserDetails",
    failureRedirect: "/",
  })
);

module.exports = authRouter;
