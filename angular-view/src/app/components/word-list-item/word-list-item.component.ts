import { Component, Input, Output, OnInit, OnChanges, DoCheck, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Types } from 'mongoose';

import { Word } from '../../../../../common-code/models/word';
import { HighlightIndex } from '../../../../../common-code/models/highlight-index';
import { WordForView } from '../../class/word-for-view';
import { HighlightText } from '../../class/highlight-text';
import { YesNoDialogComponent, YesNoDialogComponentData } from '../yes-no-dialog/yes-no-dialog.component';
import { SeletionInfo, RowSelectionMode, RowDisplayMode, ConfirmData } from '../../class/word-list-classes';


@Component({
  selector: 'app-word-list-item',
  templateUrl: './word-list-item.component.html',
  styleUrls: ['./word-list-item.component.scss']
})
export class WordListItemComponent implements DoCheck {
  @Input() word!: Word;
  @Input() mouseHover: boolean = false;
  @Input() displayMode: RowDisplayMode = RowDisplayMode.View;

  @Output() highlightEvent = new EventEmitter<{ uid: Types.ObjectId, start: number, end: number }>();
  @Output() speakEvent = new EventEmitter<string>();
  @Output() rowSelectedEvent = new EventEmitter<SeletionInfo>();
  @Output() confirmEvent = new EventEmitter<ConfirmData>();

  highlightTexts: HighlightText[] | undefined;
  private _oldWordHighlights: HighlightIndex[] | undefined = undefined;
  private _oldDisplayMode: RowDisplayMode = RowDisplayMode.View;
  editWord!: Word;

  constructor(public dialog: MatDialog) {
  }

  ngDoCheck() {
    let word = this.word;

    if (this._oldWordHighlights === undefined
      || !HighlightIndex.equalsForArray(this._oldWordHighlights, word.highlights)) {
      this._oldWordHighlights = HighlightIndex.copyArray(word.highlights);

      this.highlightTexts = WordForView.getHighlightText(word);
    }

    if (this._oldDisplayMode !== this.displayMode) {
      this._oldDisplayMode = this.displayMode;

      if (this.displayMode === RowDisplayMode.Add) {
      }
      if (this.displayMode === RowDisplayMode.Edit) {
        this.editWord = JSON.parse(JSON.stringify(word));
      }
    }
  }
  RowDisplayMode(): typeof RowDisplayMode {
    return RowDisplayMode;
  }

  edit() {
    this.rowSelectedEvent.emit(new SeletionInfo(this.word, RowSelectionMode.Edit));
  }
  cancelEdit() {
    this.rowSelectedEvent.emit(undefined);
  }
  submitEdit() {
    this.confirmEvent.emit(new ConfirmData(RowSelectionMode.Edit, this.editWord));
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
    const text = "Delete '" + this.word.sentence1 + "'?"

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: new YesNoDialogComponentData('Confirm Deletion', text)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmEvent.emit(new ConfirmData(RowSelectionMode.Delete, this.word));
      }
    });
  }
  speak() {
    this.speakEvent.emit(this.word.sentence1);
  }
}
