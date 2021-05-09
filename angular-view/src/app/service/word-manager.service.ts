import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Types } from 'mongoose';

import { WordForView } from '../class/word-for-view';
import { WordItemsService } from '../service/server/word-items.service';

import { Word } from '../../../../common-code/models/word';

@Injectable({
  providedIn: 'root'
})
// TODO: try catch errors, keep data is correct
export class WordManagerService {
  private wordForViews: WordForView[];

  constructor(private wordItemsService: WordItemsService) {
    let words = StorageManager.retrieve();

    let wfvs: WordForView[] = [];
    for (let word of words) {
      wfvs.push(new WordForView(word));
    }
    this.wordForViews = wfvs;
  }

  public store() {

    let words: Word[] = this.wordForViews.map(vi => vi.word);

    StorageManager.store(words);
  }

  public get(): Observable<WordForView[]> {
    return of(this.wordForViews);
  }

  public add(sentence: string) {
    let word = new Word(sentence);
    let wfv = new WordForView(word);

    this.wordForViews.push(wfv);
    this.store();
  }
  public addHighlight(uid: Types.ObjectId, start: number, end: number) {
    let item = this.wordForViews.find(item => String(item.word._id) === String(uid));

    if (item !== undefined) {
      Word.addHighlight(item.word, start, end);
      item.refresh();
      this.store();
    }
  }
  public delete(uid: Types.ObjectId) {

    this.wordForViews = this.wordForViews.filter(item => {
      return String(item.word._id) !== String(uid);
    })
    this.store();
  }

  public clear() {
    this.wordForViews = [];
    this.store();
  }


  public manualSync(callback: () => void) {

    let words = this.wordForViews.map(o => o.word);

    this.wordItemsService.post(words).subscribe(result => {

      if (result === "success") {
        this.wordItemsService.get().subscribe(result => {

          this.wordForViews = WordForView.createWordForViews(result);
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