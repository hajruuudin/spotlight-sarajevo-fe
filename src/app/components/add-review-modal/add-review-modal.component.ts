import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatSlider, MatSliderModule} from '@angular/material/slider';
import { DialogData } from '../add-list-modal/add-list-modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ReviewService } from '../../services/review.service';
import { ReviewModel } from '../../models/review-model';

@Component({
  selector: 'app-add-review-modal',
  imports: [NgxSpinnerComponent, MatSliderModule, ReactiveFormsModule],
  templateUrl: './add-review-modal.component.html',
  styleUrl: './add-review-modal.component.css'
})
export class AddReviewModalComponent {
  reviewForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, spotId: number},
    private fb: FormBuilder,
    private toastr: HotToastService,
    private spinner: NgxSpinnerService,
    private reviewService: ReviewService
  ){
    this.reviewForm = this.fb.group({
      'reviewTitle': ['', Validators.required],
      'reviewContent': ['', Validators.required],
      'rating': [5],
      'cleanliness': [5],
      'affordability': [5],
      'overal-quality': [5],         // <-- also a possible typo
      'staff-kindness': [5],         // <-- same here
      'accessibility': [5],
      'atmosphere': [5]
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSaveClick(){
    if(!this.reviewForm.valid){
      this.toastr.error("Review Title & Content are required!")
    } else {
      this.spinner.show()
      let review  = new ReviewModel(
        this.reviewForm.get('reviewTitle')?.value,
        this.reviewForm.get('reviewContent')?.value,
        this.reviewForm.get('rating')?.value,
        this.reviewForm.get('cleanliness')?.value,
        this.reviewForm.get('affordability')?.value,
        this.reviewForm.get('overal-quality')?.value,
        this.reviewForm.get('staff-kindness')?.value,
        this.reviewForm.get('accessibility')?.value,
        this.reviewForm.get('atmosphere')?.value,
        this.data.spotId
      )

      this.reviewService.addReviewForSpot(review).subscribe({
        next: (response: any) => {
          this.spinner.hide()
          this.toastr.success("Review added!")
          this.dialogRef.close({status: true})
        },
        error: (error: Error) => {
          this.spinner.hide()
          this.toastr.error("Error while adding review! Try again later")
          this.dialogRef.close({status: false})
          console.error(error)
        }
      })
    }
  }
}
