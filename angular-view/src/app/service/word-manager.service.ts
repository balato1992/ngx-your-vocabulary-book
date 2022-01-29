import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Types } from 'mongoose';

import { WordItemsService } from '../service/server/word-items.service';
import { Word, WordClient } from '../../../../express-server/src/shared/word';

@Injectable({
  providedIn: 'root'
})
// TODO: try catch errors, keep data is correct
export class WordManagerService {
  private words: Word[];

  constructor(private wordItemsService: WordItemsService) {
    let words = StorageManager.retrieve();

    this.words = words;
  }

  public store() {

    StorageManager.store(this.words);
  }

  public get(): Observable<Word[]> {

    return of(this.words.filter(w => w.client.isDeleted === false));
  }
  public newadd(word: Word) {
    word.client.isNew = true;
    this.words.unshift(word);
    this.store();
  }
  public edit(word: Word) {
    word.client.isUpdate = true;

    let index = this.words.findIndex(w => Word.checkId(w, word));
    if (index >= 0) {

      this.words.splice(index, 1, word);
      this.store();
    }
  }
  public addHighlight(uid: Types.ObjectId, start: number, end: number) {
    let find = this.words.find(word => Word.checkIdWithObject(word, uid));

    if (find !== undefined) {
      find.client.isUpdate = true;

      Word.addHighlight(find, start, end);
      this.store();
    }
  }
  public delete(uid: Types.ObjectId) {

    let find = this.words.find(word => Word.checkIdWithObject(word, uid));

    if (find !== undefined) {
      find.client.isDeleted = true;
    }

    /*
    this.words = this.words.filter(word => {
      return !Word.checkIdWithObject(word, uid);
    })
    */

    this.store();
  }

  public clear() {
    this.words = [];
    this.store();
  }


  public manualSync(callback: () => void) {

    this.wordItemsService.post(this.words).subscribe(result => {

      if (result === "success") {
        this.wordItemsService.get().subscribe((result: Word[]) => {

          for (let word of result) {
            word.client = new WordClient();
          }

          this.words = result;
          this.store();

          callback();
        });
      }
    });
  }
}

class StorageManager {

  private static cloudVersionKey = 'vocabularyitems';
  private static dataKey = 'vocabularyitems';

  public static storeCloudVersion(version: string) {
    localStorage.setItem(this.cloudVersionKey, version);
  }
  public static retrieveCloudVersion(): string {
    return localStorage.getItem(this.dataKey) ?? "";
  }

  public static store(words: Word[]) {
    localStorage.setItem(this.dataKey, JSON.stringify(words));
  }

  public static retrieve(): Word[] {
    let json = localStorage.getItem(this.dataKey);

    return (json) ? JSON.parse(json) : [];
  }
}