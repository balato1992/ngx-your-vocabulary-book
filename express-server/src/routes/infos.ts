import * as express from 'express';
import * as logInfosService from '../database/logInfo.service';

var router = express.Router();

router.get('/infos', (req, res) => {
  logInfosService.getLogInfos(req, res);
});

module.exports = router;
