const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "41531952449-kvfsvjrvilurd7uktr0rds44f005od20.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        //Might manipulate profile and use it to get our own users out of a db
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    //take the passed in user and pull a piece of it off that we want to use to serialize
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    //use the userid to find a user in the db
    done(null, user);
  });
};
