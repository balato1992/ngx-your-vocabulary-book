import { Word } from '../../../../common-code/models/word';
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

  static getHighlightText(word: Word): HighlightText[] {

    let texts: HighlightText[] = [];
    let pushTextFunc = (start: number, end: number, hl: boolean = false) => {
      let str = word.sentence1.substring(start, end);
      //console.log("sentence:",sentence);
      //console.log("start:", start, "end:", end, "str:", str, ".");
      texts.push(new HighlightText(str, hl));
    };

    let currentIndex = 0;
    for (let h of word.highlights) {
      if (currentIndex < h.start) {
        pushTextFunc(currentIndex, h.start);
      }

      pushTextFunc(h.start, h.end, true);
      currentIndex = h.end;
    }

    if (currentIndex < word.sentence1.length) {
      pushTextFunc(currentIndex, word.sentence1.length);
    }

    return texts;
  }

  static createWordForViews(words: Array<Word>): Array<WordForView> {

    let arr: Array<WordForView> = [];

    for (let word of words) {
      arr.push(new WordForView(word));
    }

    return arr;
  }

}
