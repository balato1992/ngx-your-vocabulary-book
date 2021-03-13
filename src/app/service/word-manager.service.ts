import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Word } from '../class/word';
import { WordForView } from '../class/word-for-view';

@Injectable({
  providedIn: 'root'
})
// TODO: try catch errors, keep data is correct
export class WordManagerService {
  private wordForViews: WordForView[];

  constructor() {
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
  public addHighlight(uid: string, start: number, end: number) {
    let item = this.wordForViews.find(item => item.word.uid === uid);

    if (item !== undefined) {
      Word.addHighlight(item.word, start, end);
      item.refresh();
      this.store();
    }
  }
  public delete(uid: string) {

    this.wordForViews = this.wordForViews.filter(item => {
      return item.word.uid !== uid;
    })
    this.store();
  }

  public clear() {
    this.wordForViews = [];
    this.store();
  }
}

class StorageManager {

  private static key = 'vocabularyitems';

  public static store(words: Word[]) {
    localStorage.setItem(this.key, JSON.stringify(words));
  }

  public static retrieve(): Word[] {
    let json = localStorage.getItem(this.key);

    return (json) ? JSON.parse(json) : [];
  }
}