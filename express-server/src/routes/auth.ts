import * as express from 'express';
import * as passport from 'passport';

import { CONFIG } from '../config';
import * as utils from '../lib/utils';
import { User } from '../database/user.model';
import { IGetUserAuthInfoRequest } from '../lib/definitions';

const router = express.Router();

router.get('/profile', passport.authenticate('jwt', { session: false }),
  async (req: IGetUserAuthInfoRequest, res, next) => {
    console.log("--protected");

    const user = await User.findOne({ _id: req.user._id })
      .exec()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        return 'error occured';
      });

    res.status(200).json(user);
  });
router.get('/test', (req, res, next) => {
  res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});

router.get('/google',
  passport.authenticate('google', {
    session: false,
    scope: CONFIG.oAuth_scope,
    prompt : "select_account", // put this at last
  }));

router.get('/' + CONFIG.oAuth_redirect_postfix,
  passport.authenticate('google', { session: false }),
  (req: IGetUserAuthInfoRequest, res) => {

    const tokenObject = utils.issueJWT(req.user);
    const data = { success: true, token: tokenObject.token, expiresIn: tokenObject.expires };

    const escape = encodeURIComponent(JSON.stringify(data));

    res.redirect('/?authtoken=' + escape);
  });

module.exports = router;