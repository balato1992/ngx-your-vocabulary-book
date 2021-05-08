import * as express from 'express';
import * as passport from 'passport';
import { User } from '../database/user.model';
import { WordItem } from '../database/word-item.model';

var router = express.Router();

router.get('/word-items', passport.authenticate('jwt', { session: false }),
  (req: any, res) => {
    let userId = req.user._id;

    WordItem.find({ user: userId }).
      populate('user').
      exec()
      .then(wordItems => {
        res.status(200).json(wordItems);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });

router.post('/word-items', passport.authenticate('jwt', { session: false }),
  async (req: any, res) => {

    console.log("post");
    console.log(req.body);
    let userId = req.user._id;

    let item = {
      uid: 'id',
      sentence: 'ss',
      insertDate: new Date(),
      highlights: [{
        start: 1,
        end: 2
      }, {
        start: 3,
        end: 4
      }],

      user: userId
    };

    const session = await WordItem.startSession();

    await session.withTransaction((): Promise<any> => {
      return WordItem.create([item, item], { session: session });
    });

    session.endSession();

    res.status(200).json('rr');
  });

module.exports = router;
