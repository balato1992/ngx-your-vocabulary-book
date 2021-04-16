import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class YesNoDialogComponentData {
  title: string = "";
  text: string = "";

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
  }
}

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html'
})
export class YesNoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: YesNoDialogComponentData) {
  }

  ngOnInit(): void {
  }
}
