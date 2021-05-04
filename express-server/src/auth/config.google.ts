// reference: http://www.passportjs.org/docs/google/
import * as passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import * as mongoose from 'mongoose';

import { CONFIG } from '../config';
const User = mongoose.model('User');

passport.use(new GoogleStrategy({
  clientID: CONFIG.oAuth_id,
  clientSecret: CONFIG.oAuth_pass,
  callbackURL: CONFIG.oAuth_redirect
},
  (accessToken, refreshToken, profile, done) => {
    console.log("--google--");
    console.log(profile.displayName);
    console.log(profile.emails);

    (User as any).findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));
