const router = require('express').Router();
const passport = require('passport');
const querystring = require("querystring");
const User = require('mongoose').model('User');

import { CONFIG } from '../config';
const utils = require('../lib/utils');

router.get('/protected', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
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
    scope: CONFIG.oAuth_scope
  }));

router.get('/' + CONFIG.oAuth_redirect_postfix,
  passport.authenticate('google', { session: false }),
  function (req, res) {

    const tokenObject = utils.issueJWT(req.user);
    const data = { success: true, token: tokenObject.token, expiresIn: tokenObject.expires };

    const escape = encodeURIComponent(JSON.stringify(data));

    res.redirect('/?authtoken=' + escape);
  });

module.exports = router;