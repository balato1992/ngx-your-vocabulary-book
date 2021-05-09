import { Word } from '../../../../common-code/models/word';
import { HighlightText } from './highlight-text';

export class WordForView {
  word: Word;
  highlightTexts: HighlightText[];

  constructor(word: Word = new Word()) {
    this.word = word;
    this.highlightTexts = Word.getHighlightText(this.word);
  }

  refresh() {
    this.highlightTexts = Word.getHighlightText(this.word);
  }

  static createWordForViews(words: Array<Word>): Array<WordForView> {

    let arr: Array<WordForView> = [];

    for (let word of words) {
      arr.push(new WordForView(word));
    }

    return arr;
  }
}
