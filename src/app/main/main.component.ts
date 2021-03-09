import { Component, OnInit } from '@angular/core';

import { WordManagerService } from '../service/word-manager.service';
import { WordForView } from '../class/word-for-view';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sentence: string = "";
  wordForViews: WordForView[] = [];
  currentHoverIndex: number = -1;

  constructor(private wordManagerService: WordManagerService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    this.wordManagerService.get()
      .subscribe(viewItems => this.wordForViews = viewItems);
  }
  addItem(): void {
    this.wordManagerService.add(this.sentence);
    this.getItem();
    this.sentence = "";
  }
  deleteItem(uid: string): void {
    this.wordManagerService.delete(uid);
    this.getItem();
  }
  highlightItem(obj: { uid: string, start: number, end: number }): void {
    this.wordManagerService.addHighlight(obj.uid, obj.start, obj.end);
    this.getItem();
  }
  clearItem(): void {
    this.wordManagerService.clear();
    this.getItem();
  }

  mouseEnter(index: number) {
    this.currentHoverIndex = index;
  }
  mouseLeave() {
    this.currentHoverIndex = -1;
  }
}
