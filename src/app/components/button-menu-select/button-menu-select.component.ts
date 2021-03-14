import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VoiceItem } from '../../class/voice-item';

@Component({
  selector: 'app-button-menu-select',
  templateUrl: './button-menu-select.component.html'
})
export class ButtonMenuSelectComponent implements OnInit {

  @Input() voiceItems: VoiceItem[] = [];
  @Input() selectedItem: VoiceItem | undefined = undefined;
  @Output() selectItemChanged: EventEmitter<VoiceItem> = new EventEmitter<VoiceItem>();

  constructor() {
  }

  ngOnInit(): void {
  }

  select(voiceItem: VoiceItem) {
    this.selectItemChanged.emit(voiceItem);
  }

}
