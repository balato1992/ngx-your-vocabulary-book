export class HighlightText {
    public text: string = "";
    public hl: boolean = false;

    constructor(text: string, hl: boolean = false) {
        this.text = text;
        this.hl = hl;
    }
}