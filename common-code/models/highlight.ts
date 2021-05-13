export class Highlight {
    start: number = 0;
    end: number = 0;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    static isCover(h1: Highlight, h2: Highlight): boolean {
        return (h1.start >= h2.start && h1.start >= h2.end)
            === (h1.end <= h2.start && h1.end <= h2.end);
    }


    static equals(h1: Highlight, h2: Highlight): boolean {
        return h1.start == h2.start && h1.end == h2.end;
    }
    static copy(h: Highlight): Highlight {
        return new Highlight(h.start, h.end);
    }

    static equalsForArray(arr1: Array<Highlight>, arr2: Array<Highlight>): boolean {

        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (!Highlight.equals(arr1[i], arr2[i])) {
                return false;
            }
        }

        return true;
    }
    static copyArray(arr: Array<Highlight>): Array<Highlight> {
        let result = [];

        for (let h of arr) {
            result.push(Highlight.copy(h));
        }

        return result;
    }
}