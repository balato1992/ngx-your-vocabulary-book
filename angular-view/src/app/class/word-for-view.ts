import { Word } from '../../../../express-server/src/shared/word';
import { HighlightIndex } from '../../../../express-server/src/shared/highlight-index';

import { HighlightText } from './highlight-text';

export class WordForView {
  word: Word;
  highlightTexts: HighlightText[];

  constructor(word: Word) {
    this.word = word;
    this.highlightTexts = WordForView.getHighlightText(this.word);
  }

  refresh() {
    this.highlightTexts = WordForView.getHighlightText(this.word);
  }

  static getHighlightText_(sentence1: string, highlights: HighlightIndex[]): HighlightText[] {

    let texts: HighlightText[] = [];
    let pushTextFunc = (start: number, end: number, hl: boolean = false) => {
      let str = sentence1.substring(start, end);
      //console.log("sentence:",sentence);
      //console.log("start:", start, "end:", end, "str:", str, ".");
      texts.push(new HighlightText(str, hl));
    };

    let currentIndex = 0;
    for (let h of highlights) {
      if (currentIndex < h.start) {
        pushTextFunc(currentIndex, h.start);
      }

      pushTextFunc(h.start, h.end, true);
      currentIndex = h.end;
    }

    if (currentIndex < sentence1.length) {
      pushTextFunc(currentIndex, sentence1.length);
    }

    return texts;
  }
  static getHighlightText(word: Word): HighlightText[] {

    if (word == null || word.sentence1 == null) {
      return [];
    }

    return WordForView.getHighlightText_(word.sentence1, word.highlights);
  }

  static createWordForViews(words: Array<Word>): Array<WordForView> {

    let arr: Array<WordForView> = [];

    for (let word of words) {
      arr.push(new WordForView(word));
    }

    return arr;
  }

}
