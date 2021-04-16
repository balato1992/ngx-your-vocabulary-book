import { Word } from './word';
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
}
