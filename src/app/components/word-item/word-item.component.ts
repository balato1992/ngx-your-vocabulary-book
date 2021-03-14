import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { WordForView } from '../../class/word-for-view';
import { YesNoDialogComponent, YesNoDialogComponentData } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: '[app-word-tr]',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.css']
})
export class WordItemComponent implements OnInit {
  @Input() wordForView: WordForView = new WordForView();
  @Output() highlightEvent = new EventEmitter<{ uid: string, start: number, end: number }>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() speakEvent = new EventEmitter<string>();
  currentRange: Range | undefined = undefined;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  highlight() {
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
  delete() {
    const text = "Delete '" + this.wordForView.word.sentence + "'?"

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: new YesNoDialogComponentData('Confirm Deletion', text)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit(this.wordForView.word.uid);
      }
    });
  }
  speak() {
    this.speakEvent.emit(this.wordForView.word.sentence);
  }
}
