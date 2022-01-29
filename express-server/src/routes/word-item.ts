import * as express from 'express';
import * as passport from 'passport';
import { WordItem } from '../database/word-item.model';

import { Word } from '../shared/word';

var router = express.Router();

router.get('/word-items', passport.authenticate('jwt', { session: false }),
  (req: any, res) => {
    let userId = req.user._id;

    WordItem.find({
      $and: [
        { user: userId },
        { "server.isDeleted": false }
      ]
    }).
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
    let words: Word[] = req.body;

    let dbWords: any = await WordItem.find({ user: userId }).
      exec()
      .catch(error => {
        res.status(500).send(error);
      });

    let tagOfSameId = '_tagOfSameId';

    let deleteList = [];

    for (let dbWord of dbWords) {
      dbWord[tagOfSameId] = false;

      for (let word of words) {
        if (Word.checkId(word, dbWord)) {
          dbWord[tagOfSameId] = true;
          word[tagOfSameId] = true;

          if (word.client.isDeleted == true) {
            deleteList.push(word._id);
          }

          break;
        }
      }
    }
    console.log('----deleteList');
    console.log(deleteList);
    deleteList.forEach(async id => {
      await WordItem.deleteOne({ _id: id }).exec();
    });

    let createList = [];
    let updateList = [];
    for (let word of words) {
      if (word.client.isNew == true) {
        createList.push(word);
      }
      if (word.client.isUpdate == true) {
        updateList.push(word);
      }
    }
    console.log('----createList');
    console.log(createList);
    createList.forEach(async w => {
      w.server.userId = userId;
      w.server.isDeleted = false;
      await WordItem.create(w);
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

    session.endSession();
    */

    res.status(200).json('success');
  });

module.exports = router;
