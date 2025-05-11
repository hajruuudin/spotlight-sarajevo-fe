import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CollectionService } from '../../services/collection.service';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-add-list-modal',
  imports: [MatDialogActions, MatDialogClose, ReactiveFormsModule, NgxSpinnerComponent],
  templateUrl: './add-list-modal.component.html',
  styleUrl: './add-list-modal.component.css'
})
export class AddListModalComponent {
  newCollectionForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<AddListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private toastr: HotToastService,
    private spinner: NgxSpinnerService,
    private collectionService: CollectionService
  ) {
    this.newCollectionForm = this.fb.group({
      'collection-name' : ['', Validators.required],
      'collection-type' : ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(){
    if(!this.newCollectionForm.valid){
      this.toastr.error('Please give the collection a name and type!')
    } else {
      this.spinner.show()

      this.collectionService.addCustomCollection(
        this.newCollectionForm.get('collection-name')?.value,
        this.newCollectionForm.get('collection-type')?.value
      )
    }
  }
}
