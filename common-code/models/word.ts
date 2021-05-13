import { Highlight } from './highlight';
import { HighlightText } from '../../angular-view/src/app/class/highlight-text';

import { Types } from 'mongoose';

export class Word {
    _id: Types.ObjectId;
    sentence: string;
    highlights: Highlight[];

    client: WordClient;
    server: WordServer;

    constructor(sentence: string = "") {
        this._id = new Types.ObjectId();
        this.sentence = sentence;
        this.highlights = [];
        this.client = new WordClient();
        this.server = new WordServer();
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

export class WordClient {

    isNew: boolean;
    isUpdate: boolean;

    constructor(isNew: boolean = false) {
        this.isNew = isNew;
        this.isUpdate = false;
    }
}
export class WordServer {

    user: string | null;
    updateDate: Date | null;

    constructor() {
        this.user = null;
        this.updateDate = null;
    }
}