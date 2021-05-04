var express = require('express');
var logInfosService = require('../database/logInfo.service');

var router = express.Router();

router.get('/infos', (req, res) => {
  logInfosService.getLogInfos(req, res);
});

module.exports = router;
