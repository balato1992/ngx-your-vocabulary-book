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
}