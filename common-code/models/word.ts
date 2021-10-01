import { HighlightIndex } from './highlight-index';

import { Types } from 'mongoose';

export class Word {
    _id: Types.ObjectId;
    sentence1: string;
    sentence2: string;
    highlights: HighlightIndex[];

    client: WordClient;
    server: WordServer;

    constructor(sentence1: string = "",sentence2: string = "") {
        this._id = new Types.ObjectId();
        this.sentence1 = sentence1;
        this.sentence2 = sentence2;
        this.highlights = [];
        this.client = new WordClient();
        this.server = new WordServer();
    }

    static addHighlight(word: Word, start: number, end: number) {
        if (start < 0 || end < 0 || start >= end) {
            return;
        }

        let newHli = new HighlightIndex(start, end);

        let covered: HighlightIndex[] = [];
        for (let hli of word.highlights) {
            if (HighlightIndex.isCover(hli, newHli)) {
                covered.push(hli);
            }
        }

        word.highlights = word.highlights.filter(hl => !covered.includes(hl));
        word.highlights.push(newHli);
        word.highlights.sort((a, b) => {
            return a.start - b.start;
        });
    }
    static checkId(w1: Word, w2: Word) {
        return String(w1._id) === String(w2._id)
    }
    static checkIdWithObject(w1: Word, id: Types.ObjectId) {
        return String(w1._id) === String(id)
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