import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-add-list-modal',
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose],
  templateUrl: './add-list-modal.component.html',
  styleUrl: './add-list-modal.component.css'
})
export class AddListModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
