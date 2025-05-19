import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CollectionService } from '../../services/collection.service';
import { CollectionStatus } from '../../models/collection-model';
import { NgFor, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-collection-modal',
  imports: [NgFor, NgIf, MatDialogClose, MatDialogActions, NgxSpinnerComponent, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './collection-modal.component.html',
  styleUrl: './collection-modal.component.css'
})
export class CollectionModalComponent implements OnInit{
  private allCollections : CollectionStatus[] = []
  protected isFormVisible : boolean = false;
  protected collectionsFormGroup : FormGroup
  
  constructor(
    public dialogRef: MatDialogRef<CollectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, objectId: number, type: string},
    private fb: FormBuilder,
    private toastr: HotToastService,
    private spinner: NgxSpinnerService,
    private collectionService: CollectionService
  ){
    this.collectionsFormGroup = this.fb.group({})
  }

  ngOnInit(): void {
    this.collectionService.getCollectionsWithItemStatus(this.data.objectId, this.data.type).subscribe({
      next: (response : any) => {
        this.allCollections = response as CollectionStatus[]
        this.loadCollectionsForm()
      },
      error: (error : Error) => {
        console.error
      }
    })
  }
  
  onSaveClick() {
    const formValues = this.collectionsFormGroup.value.collections;

    formValues.forEach((entry : any, index : any) => {
      const originalStatus = this.allCollections[index].itemStatus;
      const currentStatus = entry.itemStatus;

      if (originalStatus !== currentStatus) {
        const collectionName = entry.collectionName;

        if (currentStatus) {
          this.collectionService.addItemToCollection(collectionName, this.data.objectId).subscribe({
            next: (response : any) => {
              this.toastr.success(`${this.data.name} added to ${collectionName}`)
              this.dialogRef.close()
            },
            error: (error: Error) => {
              this.toastr.error("Erroir while adding")
              console.error(error)
            }
          });
        } else {
          this.collectionService.removeItemFromCollection(collectionName, this.data.objectId).subscribe({
            next: (response : any) => {
              this.toastr.success(`${this.data.name} removed from ${collectionName}`)
              this.dialogRef.close()
            },
            error: (error: Error) => {
              this.toastr.error("Erroir while adding")
              console.error(error)
            }
          });
        }
      }
    });
  }


  loadCollectionsForm(){
    this.collectionsFormGroup = this.fb.group({
      collections: this.fb.array(
        this.allCollections.map(c =>
          this.fb.group({
            collectionName: [c.collectionName],
            itemStatus: [c.itemStatus]
          })
        )
      )
    });

    this.isFormVisible = true
  }

  get collectionsFormArray(): FormArray {
    return this.collectionsFormGroup.get('collections') as FormArray;
  }
}
