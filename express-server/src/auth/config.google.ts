// reference: http://www.passportjs.org/docs/google/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const CONFIG = require('../config');
const User = require('mongoose').model('User');

passport.use(new GoogleStrategy({
  clientID: CONFIG.oAuth_id,
  clientSecret: CONFIG.oAuth_pass,
  callbackURL: CONFIG.oAuth_redirect
},
  (accessToken, refreshToken, profile, done) => {
    console.log("--google--");
    console.log(profile.displayName);
    console.log(profile.emails);

    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));
