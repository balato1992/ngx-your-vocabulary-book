// reference: http://www.passportjs.org/docs/google/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const CONFIG = require('../config');
var User = require('../database/user.model');

passport.use(new GoogleStrategy({
  clientID: CONFIG.oAuth_id,
  clientSecret: CONFIG.oAuth_pass,
  callbackURL: CONFIG.oAuth_redirect
},
  (accessToken, refreshToken, profile, done) => {
    console.log("--google--");
    console.log(profile.name);
    console.log(profile.displayName);
    console.log(profile.username);

    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
