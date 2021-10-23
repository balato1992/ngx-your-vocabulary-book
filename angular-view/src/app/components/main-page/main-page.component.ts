import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Types } from 'mongoose';

import { Word } from '../../../../../common-code/models/word';
import { WordManagerService } from '../../service/word-manager.service';
import { WebSpeechService } from '../../service/web-speech.service';
import { VoiceItem } from '../../class/voice-item';
import { SeletionInfo, RowSelectionMode, RowDisplayMode, ConfirmData } from '../../class/word-list-classes';
import { YesNoDialogComponent, YesNoDialogComponentData } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainComponent implements OnInit {

  addTheWord: Word | undefined;
  words: Word[] = [];
  currentHoverIndex: number = -1;

  voiceItems: VoiceItem[] = [];
  selectedVoiceItem: VoiceItem | undefined = undefined;

  seletionInfo: SeletionInfo | undefined = undefined;

  constructor(
    private wordManagerService: WordManagerService,
    private webSpeechService: WebSpeechService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getWordsFromService();

    this.initVoices();
    this.webSpeechService.voicesChangedEvent.subscribe((o) => {
      this.initVoices();
    });
  }

  initVoices() {
    console.log("--initVoices");

    let voiceItems = this.webSpeechService.getVoicesData();

    this.voiceItems = voiceItems;
    console.log(JSON.stringify(voiceItems));
    if (voiceItems.length > 0 &&
      (this.selectedVoiceItem === undefined || voiceItems.findIndex(v => v.name === this.selectedVoiceItem?.name) < 0)) {
      this.selectedVoiceItem = voiceItems[0];

      console.log(JSON.stringify(this.selectedVoiceItem));
    }
    else {
      this.selectedVoiceItem = undefined;

      console.log("undefined");
      console.log(JSON.stringify(this.selectedVoiceItem));
    }
  }


  getDisplayMode(word: Word) {
    let mode = RowDisplayMode.View;

    if (this.seletionInfo !== undefined) {
      if (this.seletionInfo.word === word) {
        switch (this.seletionInfo.mode) {
          case RowSelectionMode.Add:
            mode = RowDisplayMode.Add;
            break;
          case RowSelectionMode.Edit:
            mode = RowDisplayMode.Edit;
            break;
          case RowSelectionMode.Delete:
            mode = RowDisplayMode.Delete;
            break;
          default:
            break;
        }
      } else {
        mode = RowDisplayMode.Disabled;
      }
    }

    return mode;
  }
  getWordsForView(): Word[] {
    let words = [];

    if (this.addTheWord !== undefined) {
      words.push(this.addTheWord);
    }

    return words.concat(this.words);
  }



  getWordsFromService(): void {
    this.wordManagerService.get()
      .subscribe(viewItems => this.words = viewItems);
  }
  newaddWord(): void {
    this.addTheWord = new Word();
    this.rowSelected(new SeletionInfo(this.addTheWord, RowSelectionMode.Add));
  }


  highlightWord(obj: { uid: Types.ObjectId, start: number, end: number }): void {
    this.wordManagerService.addHighlight(obj.uid, obj.start, obj.end);
    this.getWordsFromService();
  }
  confirm(data: ConfirmData) {

    try {
      switch (data.mode) {
        case RowSelectionMode.Add:
          this.wordManagerService.newadd(data.word);
          break;
        case RowSelectionMode.Edit:
          this.wordManagerService.edit(data.word);
          break;
        case RowSelectionMode.Delete:
          this.wordManagerService.delete(data.word._id);
          break;
        default:
          alert("發生錯誤: 0011");
          break;
      }
      data.done();
    }
    catch
    {
      // TODO
      alert("發生錯誤: 0012");
    }

    this.addTheWord = undefined;
    this.seletionInfo = undefined;
    this.getWordsFromService();
  }
  rowSelected(selection: SeletionInfo) {

    if (selection?.word !== undefined
      && selection?.mode !== undefined
      && (this.seletionInfo?.word !== selection.word) // select again
    ) {
      this.seletionInfo = selection;
    } else {
      this.addTheWord = undefined;
      this.seletionInfo = undefined;
    }
  }
  speak(text: string) {

    if (this.selectedVoiceItem !== undefined) {

      this.webSpeechService.speak(text, this.selectedVoiceItem.name);
    }
  }


  manualSync(): void {

    this.wordManagerService.manualSync(() => {
      this.getWordsFromService();
    });
  }
  clearItem(): void {
    const text = "Clear all data?"

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: new YesNoDialogComponentData('Confirm Deletion', text)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.wordManagerService.clear();
        this.getWordsFromService();
      }
    });
  }


  mouseEnter(index: number) {
    this.currentHoverIndex = index;
  }
  mouseLeave() {
    this.currentHoverIndex = -1;
  }
}
