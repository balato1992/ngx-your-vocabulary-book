import { Highlight } from './highlight';
import { HighlightText } from './highlight-text';

export class Word {
    uid: string = "";
    private sentence: string = "";
    private highlights: Highlight[] = [];

    constructor(sentence: string = "") {
        this.uid = Word.getUid();
        this.sentence = sentence;
    }

    private static getUid(): string {
        return "" + Date.now() + Math.random();
    }

    static getHighlightText(word: Word): HighlightText[] {

        let texts: HighlightText[] = [];
        let pushTextFunc = (start: number, end: number, hl: boolean = false) => {
            let str = word.sentence.substring(start, end);
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

        if (currentIndex < word.sentence.length) {
            pushTextFunc(currentIndex, word.sentence.length);
        }

        return texts;
    }
    static addHighlight(word: Word, start: number, end: number) {
        if (start < 0 || end < 0 || start >= end) {
            return;
        }

        let newHli = new Highlight(start, end);

        let covered: Highlight[] = [];
        for (let hli of word.highlights) {
            if (Highlight.isCover(hli, newHli)) {
                covered.push(hli);
            }
        }

        word.highlights = word.highlights.filter(hl => !covered.includes(hl));
        word.highlights.push(newHli);
        word.highlights.sort((a, b) => {
            return a.start - b.start;
        });
    }
}