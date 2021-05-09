import * as express from 'express';
import * as passport from 'passport';
import { User } from '../database/user.model';
import { WordItem } from '../database/word-item.model';
import { Word } from '../../../common-code/models/word';

var router = express.Router();

router.get('/word-items', passport.authenticate('jwt', { session: false }),
  (req: any, res) => {
    let userId = req.user._id;

    WordItem.find({ user: userId }).
      //populate('user').
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
    let words: Array<any> = req.body;

    let dbWords: any = await WordItem.find({ user: userId }).
      exec()
      .catch(error => {
        res.status(500).send(error);
      });

    let tagOfSameId = '_tagOfSameId';

    for (let dbWord of dbWords) {
      dbWord[tagOfSameId] = false;
      for (let word of words) {
        if (String(word._id) === String(dbWord._id)) {
          dbWord[tagOfSameId] = true;
          word[tagOfSameId] = true;
          break;
        }
      }
    }

    let deleteList = dbWords.filter(w => {
      return w[tagOfSameId] !== true;
    });
    console.log('----deleteList');
    console.log(deleteList);
    deleteList.forEach(async w => {
      await WordItem.deleteOne({ _id: w._id }).exec();
    });

    let createList = words.filter(w => {
      return w[tagOfSameId] !== true;
    });
    console.log('----createList');
    console.log(createList);
    createList.forEach(async w => {
      w.user = userId;
      await WordItem.create(w);
    });

    let updateList = words.filter(w => {
      // check same data
      return w[tagOfSameId] === true;
    });
    console.log('----updateList');
    console.log(updateList);
    updateList.forEach(async w => {
      await WordItem.updateOne({ _id: w._id }, w).exec();
    });


    /*
    const session = await WordItem.startSession();
    
    await session.withTransaction((): Promise<any> => {
      return WordItem.create(items, { session: session });
    });

    session.endSession();*/

    res.status(200).json('success');
  });

module.exports = router;
