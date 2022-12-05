import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  title: string = 'title';
  message: string = 'message';

  constructor(
    public dialogConfirmation: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogConfirmation.close(false);
  }

  go(): void {
    this.dialogConfirmation.close(true);
  }
}
