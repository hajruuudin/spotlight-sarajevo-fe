import { Component, Input, OnInit } from '@angular/core';
import { ButtonPrimary } from "../../button-primary/button-primary";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { TextInput } from "../../text-input/text-input";
import { TextArea } from "../../text-area/text-area";
import { SliderInput } from "../../slider-input/slider-input";
import { SessionService } from '../../../core/services/session.service';
import { SpotOverviewModel, SpotReviewCreateModel, SpotReviewModel } from '../../../shared/models/spot.model';
import { SpotService } from '../../../services/spot.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-review-modal',
  imports: [ButtonPrimary, ReactiveFormsModule, TextInput, TextArea, SliderInput],
  templateUrl: './edit-review-modal.html',
  styleUrl: './edit-review-modal.css',
  host: {
    class: `fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]`
  }
})
export class EditReviewModal implements OnInit {
  @Input() protected reviewModel!: SpotReviewModel
  @Input() protected spotId!: number;

  protected close!: (result?: any) => void;

  protected form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      header: [this.reviewModel.header, Validators.required],
      body: [this.reviewModel.body, Validators.required],
      overallRating: [this.reviewModel.userOverallRating, Validators.required],
      affordability: [this.reviewModel.userAffordability, Validators.required],
      accessibility: [this.reviewModel.userAccessibility, Validators.required],
      atmosphere: [this.reviewModel.userAtmosphere, Validators.required],
      localeQuality: [this.reviewModel.userLocaleQuality, Validators.required],
      staffKindness: [this.reviewModel.userStaffKindness, Validators.required],
      cleanliness: [this.reviewModel.userCleanliness, Validators.required]
    });
  }

  onFormSubmit() {
    if (!this.form.valid) {
      return this.close({ type: 'invalid' });
    }

    const reviewData = {
      spotId: this.spotId,
      ...this.form.value
    };

    this.close({
      type: 'add',
      data: reviewData
    });
  }

  onClose() {
    this.close({ type: 'cancel' });
  }
}

