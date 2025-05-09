import { Component } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { MatDialog } from '@angular/material/dialog';
import { AddListModalComponent } from '../../components/add-list-modal/add-list-modal.component';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";

@Component({
  selector: 'app-saved',
  imports: [HeadingComponent, ButtonRegularComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent {
  dialogResult = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListModalComponent, {
      width: '500px',
      data: { message: 'This is a simple message inside the modal!' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.dialogResult = result;
    });
  }
}
