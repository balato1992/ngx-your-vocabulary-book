import { HighlightIndex } from './highlight-index';

import { Types } from 'mongoose';

export class Word {
    _id: Types.ObjectId;
    sentence1: string;
    sentence2: string;
    highlights: HighlightIndex[];

    client: WordClient;
    server: WordServer;

    constructor(sentence1: string = "", sentence2: string = "") {
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

        let tmpHighlights = word.highlights.filter(hl => !covered.includes(hl));
        tmpHighlights.push(newHli);
        tmpHighlights.sort((a, b) => {
            return a.start - b.start;
        });

        word.highlights = tmpHighlights;
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
    isDeleted: boolean;

    constructor() {
        this.isNew = false;
        this.isUpdate = false;
        this.isDeleted = false;
    }
}
export class WordServer {

    userId: string | null;
    isDeleted: boolean| null;

    constructor() {
        this.userId = null;
        this.isDeleted = null;
    }
}