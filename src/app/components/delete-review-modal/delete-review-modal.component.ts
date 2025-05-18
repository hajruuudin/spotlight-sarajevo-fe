import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-delete-review-modal',
  imports: [NgxSpinnerComponent],
  templateUrl: './delete-review-modal.component.html',
  styleUrl: './delete-review-modal.component.css'
})
export class DeleteReviewModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, spotId: number},
    private toastr: HotToastService,
    private spinner: NgxSpinnerService,
    private reviewService: ReviewService
  ){}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onYesClick(): void{
    this.spinner.show()
    this.reviewService.deleteUserReview(this.data.spotId).subscribe({
      next: (response : any) => {
        this.spinner.hide()
        this.toastr.success("Review deleted!")
        this.dialogRef.close({deleted: true})
      },
      error: (error: Error) => {
        this.spinner.hide()
        this.toastr.error("Error while removing spot!")
        this.dialogRef.close({deleted: false})
      }
    })
  }

}
