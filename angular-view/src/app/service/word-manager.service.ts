import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Types } from 'mongoose';

import { WordForView } from '../class/word-for-view';
import { WordItemsService } from '../service/server/word-items.service';

import { Word } from '../../../../express-server/src/shared/word';

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
    return of(this.words);
  }
  public newadd(word: Word) {
    this.words.unshift(word);
    this.store();
  }
  public edit(word: Word) {

    let index = this.words.findIndex(w => Word.checkId(w, word));
    if (index >= 0) {

      this.words.splice(index, 1, word);
      this.store();
    }
  }
  public addHighlight(uid: Types.ObjectId, start: number, end: number) {
    let find = this.words.find(word => Word.checkIdWithObject(word, uid));

    if (find !== undefined) {
      Word.addHighlight(find, start, end);
      this.store();
    }
  }
  public delete(uid: Types.ObjectId) {

    this.words = this.words.filter(word => {
      return !Word.checkIdWithObject(word, uid);
    })
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