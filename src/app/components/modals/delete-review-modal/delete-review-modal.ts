import { Component } from '@angular/core';
import { ButtonPrimary } from "../../button-primary/button-primary";

@Component({
  selector: 'app-delete-review-modal',
  imports: [ButtonPrimary],
  templateUrl: './delete-review-modal.html',
  styleUrl: './delete-review-modal.css',
  host: {
    class: `fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]`
  }
})
export class DeleteReviewModal {
  protected close!: (result: {confirmed: boolean}) => void;

  confirm() {
    this.close({ confirmed: true });
  }

  cancel() {
    this.close({ confirmed: false });
  }
}
