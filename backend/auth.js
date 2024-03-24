require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require('./api/models/userModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      refreshToken: true,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.email },
          defaults: {
              firstName: profile.name['givenName'],
              lastName: profile.name['familyName'],
              token: accessToken,
              refreshToken: refreshToken,
              uniqueId: profile.id,
          }
        });
        return done(created, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
