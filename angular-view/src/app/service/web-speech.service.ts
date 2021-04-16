import { Injectable, Output, EventEmitter } from '@angular/core';

import { VoiceItem } from '../class/voice-item';

// reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
// reference:https://github.com/mdn/web-speech-api/tree/master/speak-easy-synthesis

@Injectable({
  providedIn: 'root'
})
export class WebSpeechService {
  @Output() voicesChangedEvent: EventEmitter<SpeechSynthesisVoice[]>;

  get synthesis(): SpeechSynthesis {
    return window.speechSynthesis;
  }

  private _voices: SpeechSynthesisVoice[] = [];
  get voices(): SpeechSynthesisVoice[] {
    return this._voices;
  }
  set voices(voices: SpeechSynthesisVoice[]) {
    this._voices = voices;
    this.voicesChangedEvent.emit(this._voices);
  }


  constructor() {
    this.voicesChangedEvent = new EventEmitter<SpeechSynthesisVoice[]>()

    if (!this.checkAvalible()) {
      console.error('window.speechSynthesis not supported.');
      return;
    }

    let populateVoiceList = () => {
      let voices = window.speechSynthesis.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
      });

      const avalibleLang = ["zh-TW", "en-US", "ja-JP"];

      voices = voices.filter(voice => avalibleLang.includes(voice.lang));

      this.voices = voices;
    };

    // TODO: 'this' in listener may direct to wrong object, try fix it
    populateVoiceList();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.addEventListener("voiceschanged", populateVoiceList);
    }
  }

  public checkAvalible() {
    return window.speechSynthesis !== undefined;
  }
  public getVoicesData(): VoiceItem[] {
    return this.voices.map(voice => {
      let text = voice.name + ' (' + voice.lang + ')';
      if (voice.default) {
        text += ' -- DEFAULT';
      }

      return new VoiceItem(voice.name, text);
    });
  }
  public speak(text: string, voiceName: string) {
    let synth = this.synthesis;

    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }

    if (text !== '') {
      let utterThis = new SpeechSynthesisUtterance(text);

      utterThis.addEventListener("end", (event) => {
        console.log('SpeechSynthesisUtterance.onend');
      });
      utterThis.addEventListener("onerror", (event) => {
        console.log('SpeechSynthesisUtterance.onerror');
      });
      for (let voice of this.voices) {
        if (voice.name === voiceName) {
          utterThis.voice = voice;
          break;
        }
      }
      utterThis.pitch = 1;
      utterThis.rate = 0.8;
      synth.speak(utterThis);
    }
  }
}
