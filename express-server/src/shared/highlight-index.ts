export class HighlightIndex {
    start: number = 0;
    end: number = 0;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    static isCover(h1: HighlightIndex, h2: HighlightIndex): boolean {
        return (h1.start >= h2.start && h1.start >= h2.end)
            === (h1.end <= h2.start && h1.end <= h2.end);
    }


    static equals(h1: HighlightIndex, h2: HighlightIndex): boolean {
        return h1.start == h2.start && h1.end == h2.end;
    }
    static copy(h: HighlightIndex): HighlightIndex {
        return new HighlightIndex(h.start, h.end);
    }

    static equalsForArray(arr1: Array<HighlightIndex>, arr2: Array<HighlightIndex>): boolean {

        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (!HighlightIndex.equals(arr1[i], arr2[i])) {
                return false;
            }
        }

        return true;
    }
    static copyArray(arr: Array<HighlightIndex>): Array<HighlightIndex> {
        let result = [];

        for (let h of arr) {
            result.push(HighlightIndex.copy(h));
        }

        return result;
    }
}