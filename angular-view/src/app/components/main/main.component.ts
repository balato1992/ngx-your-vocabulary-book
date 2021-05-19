import { Component, OnInit } from '@angular/core';
import { Types } from 'mongoose';

import { Word } from '../../../../../common-code/models/word';
import { WordManagerService } from '../../service/word-manager.service';
import { WebSpeechService } from '../../service/web-speech.service';
import { VoiceItem } from '../../class/voice-item';
import { WordForView } from '../../class/word-for-view';
import { SeletionInfo, RowSelectionMode, RowDisplayMode, ConfirmData } from '../word-item/word-item.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sentence: string = "";
  wordForViews: WordForView[] = [];
  currentHoverIndex: number = -1;

  voiceItems: VoiceItem[] = [];
  selectedVoiceItem: VoiceItem | undefined = undefined;

  seletionInfo: SeletionInfo | undefined = undefined;

  constructor(
    private wordManagerService: WordManagerService,
    private webSpeechService: WebSpeechService) { }

  ngOnInit(): void {
    this.getWords();

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
    let currentType = RowDisplayMode.View;

    if (this.seletionInfo !== undefined) {
      if (this.seletionInfo.word === word) {
        switch (this.seletionInfo.mode) {
          case RowSelectionMode.Add:
            currentType = RowDisplayMode.Add;
            break;
          case RowSelectionMode.Edit:
            currentType = RowDisplayMode.Edit;
            break;
          case RowSelectionMode.Delete:
            currentType = RowDisplayMode.Delete;
            break;
          default:
            break;
        }
      } else {
        currentType = RowDisplayMode.Disabled;
      }
    }

    return currentType;
  }


  getWords(): void {
    this.wordManagerService.get()
      .subscribe(viewItems => this.wordForViews = viewItems);
  }
  addWord(): void {
    this.wordManagerService.add(this.sentence);
    this.getWords();
    this.sentence = "";
  }
  highlightWord(obj: { uid: Types.ObjectId, start: number, end: number }): void {
    this.wordManagerService.addHighlight(obj.uid, obj.start, obj.end);
    this.getWords();
  }
  speak(text: string) {

    if (this.selectedVoiceItem !== undefined) {

      this.webSpeechService.speak(text, this.selectedVoiceItem.name);
    }
  }
  rowSelected(selection: SeletionInfo) {

    if (selection?.word !== undefined
      && selection?.mode !== undefined
      && (this.seletionInfo?.word !== selection.word)
    ) {
      this.seletionInfo = selection;
    } else {
      this.seletionInfo = undefined;
    }
  }
  confirm(data: ConfirmData) {

    try {
      switch (data.mode) {
        // TODO
        /*case RowSelectionMode.Add:
          this.wordManagerService.add(data.word);
          break;*/
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

    this.seletionInfo = undefined;
    this.getWords();
  }

  manualSync(): void {

    this.wordManagerService.manualSync(() => {
      this.getWords();
    });
  }
  clearItem(): void {
    this.wordManagerService.clear();
    this.getWords();
  }

  mouseEnter(index: number) {
    this.currentHoverIndex = index;
  }
  mouseLeave() {
    this.currentHoverIndex = -1;
  }
}
