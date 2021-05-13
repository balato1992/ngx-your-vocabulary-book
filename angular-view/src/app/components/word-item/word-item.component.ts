import { Component, Input, Output, OnInit, OnChanges, DoCheck, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Types } from 'mongoose';

import { Word } from '../../../../../common-code/models/word';
import { Highlight } from '../../../../../common-code/models/highlight';
import { WordForView } from '../../class/word-for-view';
import { HighlightText } from '../../class/highlight-text';
import { YesNoDialogComponent, YesNoDialogComponentData } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: '[app-word-tr]',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss']
})
export class WordItemComponent implements DoCheck {
  @Input() word!: Word;
  @Input() btnVisibility: boolean = false;
  @Input() editMode: boolean = false;

  @Output() editEvent = new EventEmitter<string>();
  @Output() highlightEvent = new EventEmitter<{ uid: Types.ObjectId, start: number, end: number }>();
  @Output() deleteEvent = new EventEmitter<Types.ObjectId>();
  @Output() speakEvent = new EventEmitter<string>();

  highlightTexts: HighlightText[] | undefined;
  private _oldWordHighlights: Highlight[] | undefined = undefined;

  constructor(public dialog: MatDialog) {
  }

  ngDoCheck() {
    let word = this.word;

    if (this._oldWordHighlights === undefined || !Highlight.equalsForArray(this._oldWordHighlights, word.highlights)) {
      this._oldWordHighlights = Highlight.copyArray(word.highlights);

      this.highlightTexts = WordForView.getHighlightText(word);
    }
  }

  edit() {
  }
  highlight() {
    let selection = window.getSelection();
    let htis = this.highlightTexts;
    if (selection && selection.rangeCount > 0 && htis !== undefined) {
      let range = selection.getRangeAt(0);
      // selection.toString();

      // TODO: error handling
      let startElementIndex: number = parseInt(range.startContainer.parentElement?.getAttribute("index")?.toString() ?? "-1");
      let endElementIndex: number = parseInt(range.endContainer.parentElement?.getAttribute("index")?.toString() ?? "-1");

      let realStart = 0;
      let realEnd = 0;

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

      this.highlightEvent.emit({
        uid: this.word._id,
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
    const text = "Delete '" + this.word.sentence + "'?"

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: new YesNoDialogComponentData('Confirm Deletion', text)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit(this.word._id);
      }
    });
  }
  speak() {
    this.speakEvent.emit(this.word.sentence);
  }
}
