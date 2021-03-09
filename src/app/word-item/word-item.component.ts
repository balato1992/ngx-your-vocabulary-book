import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { WordForView } from '../class/word-for-view';

@Component({
  selector: '[app-word-tr]',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.css']
})
export class WordItemComponent implements OnInit {
  @Input() wordForView: WordForView = new WordForView();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() highlightEvent = new EventEmitter<{ uid: string, start: number, end: number }>();
  currentRange: Range | undefined = undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  delete() {
    this.deleteEvent.emit(this.wordForView.word.uid);
  }
  highlightItem() {
    let selection = window.getSelection();
    if (selection) {
      let range = selection.getRangeAt(0);
      // selection.toString();

      // TODO: error handling
      let startElementIndex: number = parseInt(range.startContainer.parentElement?.getAttribute("index")?.toString() ?? "-1");
      let endElementIndex: number = parseInt(range.endContainer.parentElement?.getAttribute("index")?.toString() ?? "-1");

      let realStart = 0;
      let realEnd = 0;
      let htis = this.wordForView.highlightTexts;

      for (let i = 0; i < htis.length; i++) {
        let textLength = htis[i].text.length;

        if (i < startElementIndex) {
          realStart += textLength;
        }
        if (i < endElementIndex) {
          realEnd += textLength;
        }
      }
      realStart += range.startOffset;
      realEnd += range.endOffset;

      //console.log("*--");
      //console.log(range);
      //console.log(realStart);
      //console.log(realEnd);

      this.highlightEvent.emit({
        uid: this.wordForView.word.uid || "",
        start: realStart,
        end: realEnd
      });

      if (selection.empty) {  // Chrome
        selection.empty();
      } else if (selection.removeAllRanges) {  // Firefox
        selection.removeAllRanges();
      }
    }
  }

  mouseEnter() {
  }
  mouseLeave() {
  }
}
