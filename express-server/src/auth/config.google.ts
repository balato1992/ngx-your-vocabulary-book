// reference: http://www.passportjs.org/docs/google/
import * as passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

import { CONFIG } from '../config';
import { User } from '../database/user.model';


passport.use(new GoogleStrategy({
  clientID: CONFIG.oAuth_id,
  clientSecret: CONFIG.oAuth_pass,
  callbackURL: CONFIG.oAuth_redirect
},
  (accessToken, refreshToken, profile, done) => {
    console.log("--google--");
    console.log(profile.displayName);
    console.log(profile.emails);

    let findUser = { googleId: profile.id };

    User.findOne(findUser, (err, user) => {

      let createUser = {
        googleId: profile.id,
        displayName: profile.displayName
      };

      return user
        ? done(err, user)
        : User.create(createUser, (err, user) => { return done(err, user) })
    });
  }
));
