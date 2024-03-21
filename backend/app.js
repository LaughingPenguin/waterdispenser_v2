require("./database/db.js");
require("dotenv").config()

const express = require("express");
const session = require("express-session");
const passport = require("passport");

const auth = require("./auth");
const index = require('./api/routes/index.js');
const rating = require('./api/routes/rating.js');
const dispenser = require('./api/routes/dispenser.js');

const app = express();
/* See session attribute documentation here
   https://expressjs.com/en/resources/middleware/session.html
*/
app.use(session({
  secret: process.env.SECRET_SESSION_KEYS.split(' '),
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use("/", index);
app.use("/rating", rating);
app.use("/dispenser", dispenser);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    accessType: "offline",
    prompt: "consent",
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong! :(");
});

app.get("/auth/success", (req, res) => {
  res.send("Yay! :)");
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
})

module.exports = app;