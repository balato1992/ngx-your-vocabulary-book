const router = require('express').Router();
const passport = require('passport');
const querystring = require("querystring");

const CONFIG = require('../config');
const utils = require('../lib/utils');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
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

    console.log("test");
    const escape = encodeURIComponent(JSON.stringify(data));
    console.log(escape);

    res.redirect('/t?token=' + escape);
  });

module.exports = router;