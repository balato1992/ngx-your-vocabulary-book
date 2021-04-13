import { Component, OnInit } from '@angular/core';

import { WordManagerService } from '../../service/word-manager.service';
import { WebSpeechService } from '../../service/web-speech.service';
import { VoiceItem } from '../../class/voice-item';
import { WordForView } from '../../class/word-for-view';

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

  constructor(private wordManagerService: WordManagerService, private webSpeechService: WebSpeechService) {
  }

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

  getWords(): void {
    this.wordManagerService.get()
      .subscribe(viewItems => this.wordForViews = viewItems);
  }
  addWord(): void {
    this.wordManagerService.add(this.sentence);
    this.getWords();
    this.sentence = "";
  }
  deleteWord(uid: string): void {
    this.wordManagerService.delete(uid);
    this.getWords();
  }
  highlightWord(obj: { uid: string, start: number, end: number }): void {
    this.wordManagerService.addHighlight(obj.uid, obj.start, obj.end);
    this.getWords();
  }
  speak(text: string) {

    if (this.selectedVoiceItem !== undefined) {

      this.webSpeechService.speak(text, this.selectedVoiceItem.name);
    }
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
