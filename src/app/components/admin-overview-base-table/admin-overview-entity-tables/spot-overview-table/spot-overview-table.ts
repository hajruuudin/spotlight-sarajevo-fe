import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminOverviewBaseTable } from '../../admin-overview-table';
import {
  SpotOverviewModel,
  SpotReviewModel,
  SpotShorthandModel,
  SpotUpdateModel,
  SpotWorkHoursModel,
} from '../../../../shared/models/spot.model';
import { ButtonPrimary } from '../../../button-primary/button-primary';
import { TranslocoPipe } from '@ngneat/transloco';
import { DecimalPipe } from '@angular/common';
import { ZeroReview } from '../../../../shared/pipes/zero-review-pipe';
import { ButtonSecondary } from '../../../button-secondary/button-secondary';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextHolder } from '../../../text-holder/text-holder';
import { TextInput } from '../../../text-input/text-input';
import { TextArea } from '../../../text-area/text-area';
import { SelectGroup } from '../../../select-group/select-group';
import { CategoryService } from '../../../../services/category.service';
import { SpotCategoryModel, TagModel } from '../../../../shared/models/category.model';
import { TagService } from '../../../../services/tag.service';
import { MultiSelectGroup } from '../../../multiselect-group/multiselect-group';
import { ImageUploadService } from '../../../../services/image-upload.service';
import { MediaCreateModel } from '../../../../shared/models/shared.model';
import { forkJoin, of } from 'rxjs';
import { SpotService } from '../../../../services/spot.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-spot-overview-table',
  imports: [
    ButtonPrimary,
    TranslocoPipe,
    ZeroReview,
    ButtonSecondary,
    ReactiveFormsModule,
    TextInput,
    TextArea,
    SelectGroup,
    MultiSelectGroup
  ],
  templateUrl: './spot-overview-table.html',
  styleUrl: './spot-overview-table.css',
  host: {
    class: 'w-full',
  },
})
export class SpotOverviewTable extends AdminOverviewBaseTable implements OnInit, OnChanges {
  @Input() tableData: SpotShorthandModel[] = [];
  @Input() itemOverview: SpotOverviewModel | null = null;
  @Input() spotReviews: SpotReviewModel[] = [];

  // Forms
  protected basicInformationForm: FormGroup;
  protected attributeInformationForm: FormGroup;
  protected workHoursForm: FormGroup;

  // Category options for the selector
  protected categoryOptions: { label: string; value: any }[] = [];
  protected tagOptions: { label: string; value: any }[] = [];

  // Image management state
  protected newThumbnailFile: File | null = null;
  protected newThumbnailPreview: string | null = null;
  protected newImageFiles: File[] = [];
  protected newImagePreviews: string[] = [];
  protected imagesToDelete: Set<number> = new Set(); // Stores image IDs, not indices

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private tagService: TagService,
    private imageUploadService: ImageUploadService,
    private spotService: SpotService,
    private spinnerService: SpinnerService,
    private toastService: HotToastService
  ) {
    super();
    this.basicInformationForm = this.fb.group({
      slug: [this.itemOverview?.slug ?? ''],
      officialNameEn: [this.itemOverview?.officialNameEn ?? ''],
      officialNameBs: [this.itemOverview?.officialNameBs ?? ''],
      smallDescriptionEn: [this.itemOverview?.smallDescriptionEn ?? ''],
      smallDescriptionBs: [this.itemOverview?.smallDescriptionBs ?? ''],
      fullDescriptionEn: [this.itemOverview?.fullDescriptionEn ?? ''],
      fullDescriptionBs: [this.itemOverview?.fullDescriptionBs ?? ''],
      address: [this.itemOverview?.address ?? ''],
    });

    this.attributeInformationForm = this.fb.group({
      latitude: [this.itemOverview?.latitude ?? 0],
      longitude: [this.itemOverview?.longitude ?? 0],
      categoryId: [this.itemOverview?.categoryId ?? ''],
      spotTagIds: [this.mapTagIds(this.itemOverview?.spotTags)],
      combinedRating: [this.itemOverview?.combinedRating ?? 0],
    });

    this.workHoursForm = this.fb.group({
      workHours: this.buildWorkHoursArray(this.itemOverview?.workHours),
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllSpotCategories().subscribe({
      next: (categories) => {
        this.categoryOptions = this.transformCategoriesForOptions(
        categories, 
        this.columnLang as 'bs' | 'en'
      );
      },
    });
    this.tagService.findAll().subscribe({
      next: (tags) => {
        this.tagOptions = this.transformTagsForOptions(tags);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemOverview']?.currentValue) {
      const overview: SpotOverviewModel = changes['itemOverview'].currentValue;

      this.basicInformationForm.patchValue(
        {
          slug: overview.slug,
          officialNameEn: overview.officialNameEn,
          officialNameBs: overview.officialNameBs,
          smallDescriptionEn: overview.smallDescriptionEn,
          smallDescriptionBs: overview.smallDescriptionBs,
          fullDescriptionEn: overview.fullDescriptionEn,
          fullDescriptionBs: overview.fullDescriptionBs,
          address: overview.address,
        },
        { emitEvent: false },
      );

      this.attributeInformationForm.patchValue(
        {
          latitude: overview.latitude,
          longitude: overview.longitude,
          categoryId: overview.categoryId,
          spotTagIds: this.mapTagIds(overview.spotTags),
          combinedRating: overview.combinedRating,
        },
        { emitEvent: false },
      );

      // Rebuild work hours array with all 7 days
      const workHoursArray = this.workHoursForm.get('workHours') as FormArray;
      workHoursArray.clear({ emitEvent: false });

      // Use buildWorkHoursArray to get all 7 days (closed or open)
      const newWorkHoursArray = this.buildWorkHoursArray(overview.workHours);
      newWorkHoursArray.controls.forEach((control) => {
        workHoursArray.push(control, { emitEvent: false });
      });
    }
  }

  override onSaveChangeSelected() {
    if (!this.itemOverview) {
      console.error('No item overview available');
      return;
    }

    console.log('Starting save process with image uploads...');
    console.log('- New thumbnail:', this.newThumbnailFile ? 'Yes' : 'No');
    console.log('- New images to upload:', this.newImageFiles.length);
    console.log('- Images marked for deletion:', this.imagesToDelete.size);

    // Show page-wide spinner
    this.spinnerService.showNavigateSpinner();

    // Upload new thumbnail if provided (backend will delete old one from ImageBB)
    const thumbnailUpload$ = this.newThumbnailFile
      ? this.imageUploadService.uploadImage(this.newThumbnailFile)
      : of(null);

    const newImagesUpload$ = this.newImageFiles.length > 0
      ? this.imageUploadService.uploadMultipleImages(this.newImageFiles)
      : of([]);

    // Note: ImageBB deletion has CORS restrictions from browser
    // Backend will handle deleting images from ImageBB using stored delete URLs
    // We just send the image IDs to be deleted

    forkJoin({
      thumbnail: thumbnailUpload$,
      newImages: newImagesUpload$
    }).subscribe({
      next: (results) => {
        const imagesToBeUploaded: MediaCreateModel[] = results.newImages.map(response => 
          new MediaCreateModel(
            this.itemOverview!.id,
            'SPOT',
            response.data.url,
            response.data.delete_url,
            false
          )
        );

        // Build thumbnail MediaCreateModel if new thumbnail was uploaded
        const newThumbnailImage = results.thumbnail 
          ? new MediaCreateModel(
              this.itemOverview!.id,
              'SPOT',
              results.thumbnail.data.url,
              results.thumbnail.data.delete_url,
              true
            )
          : null;

        // Update thumbnail URL if new one was uploaded, otherwise keep existing
        const thumbnailImageUrl = results.thumbnail 
          ? results.thumbnail.data.url 
          : (this.itemOverview?.thumbnailImage?.imageUrl || '');

        const finalPayload = new SpotUpdateModel(
          this.itemOverview!.id,
          this.basicInformationForm.value.slug,
          this.basicInformationForm.value.officialNameBs,
          this.basicInformationForm.value.officialNameEn,
          this.basicInformationForm.value.smallDescriptionBs,
          this.basicInformationForm.value.smallDescriptionEn,
          this.basicInformationForm.value.fullDescriptionBs,
          this.basicInformationForm.value.fullDescriptionEn,
          this.attributeInformationForm.value.latitude,
          this.attributeInformationForm.value.longitude,
          this.basicInformationForm.value.address,
          this.attributeInformationForm.value.categoryId,
          this.attributeInformationForm.value.spotTagIds || [],
          // Only send days that are NOT closed (backend deletes all and re-creates)
          this.workHoursArray.value
            .filter((wh: any) => !wh.isClosed)
            .map((wh: any) => new SpotWorkHoursModel(
              wh.dayIndex,
              wh.day,
              wh.startTime,
              wh.endTime,
              this.itemOverview!.id,
              false // Never send isClosed=true, just omit closed days
            )),
          thumbnailImageUrl,
          newThumbnailImage,
          imagesToBeUploaded,
          this.imagesToDelete.size > 0 ? Array.from(this.imagesToDelete) : []
        );

        console.log('FINAL_SAVE_PAYLOAD_WITH_IMAGES', finalPayload);
        
        // Send update request to backend
        this.spotService.updateSpot(finalPayload).subscribe({
          next: (response) => {
            console.log('Spot updated successfully:', response);
            // Hide spinner and show success toast
            this.spinnerService.hideNavigateSpinner();
            this.toastService.success('Spot updated successfully!');
            // Reset image state after successful save
            this.resetImageState();
          },
          error: (error) => {
            console.error('Error updating spot:', error);
            // Hide spinner and show error toast
            this.spinnerService.hideNavigateSpinner();
            this.toastService.error('Failed to update spot. Please try again.');
          }
        });
      },
      error: (error) => {
        console.error('Error during image upload/delete process:', error);
        // Hide spinner and show error toast
        this.spinnerService.hideNavigateSpinner();
        this.toastService.error('Failed to upload images. Please try again.');
      }
    });
  }

  private resetImageState(): void {
    this.newThumbnailFile = null;
    this.newThumbnailPreview = null;
    this.newImageFiles = [];
    this.newImagePreviews = [];
    this.imagesToDelete.clear();
  }

  override onDeleteItemSelected() {
    if (this.selectedSpotId == null) {
      console.log('PLACEHOLDER_DELETE_SPOT_SKIPPED_NO_SELECTION');
      return;
    }

    console.log('PLACEHOLDER_DELETE_SPOT_ID', this.selectedSpotId);
    this.onDeleteItem.emit(this.selectedSpotId);
  }

  transformCategoriesForOptions(
    categories: SpotCategoryModel[],
    language: 'bs' | 'en',
  ): { label: string; value: any }[] {
    return categories.map((category) => ({
      label: language === 'en' ? category.spotCategoryNameEn : category.spotCategoryNameBs,
      value: category.id,
    }));
  }

  transformTagsForOptions(
    tags: TagModel[],
  ): { label: string; value: any }[] {
    return tags.map((tag) => ({
      label: this.columnLang === 'en' ? tag.tagNameEn : tag.tagNameBs,
      value: tag.id,
    }));
  }

  private mapTagIds(tags: TagModel[] | null | undefined): number[] {
    if (!Array.isArray(tags)) {
      return [];
    }

    return tags
      .map((tag) => tag?.id)
      .filter((id): id is number => typeof id === 'number');
  }

  private buildWorkHoursArray(workHours: any[] | null | undefined): FormArray {
    const array = this.fb.array([] as any[]);
    
    // Define all 7 days
    const allDays = [
      { dayIndex: 0, day: 'Monday' },
      { dayIndex: 1, day: 'Tuesday' },
      { dayIndex: 2, day: 'Wednesday' },
      { dayIndex: 3, day: 'Thursday' },
      { dayIndex: 4, day: 'Friday' },
      { dayIndex: 5, day: 'Saturday' },
      { dayIndex: 6, day: 'Sunday' }
    ];

    // For each day, check if it exists in backend data
    allDays.forEach((dayInfo) => {
      const existingHours = Array.isArray(workHours) 
        ? workHours.find(wh => wh.dayIndex === dayInfo.dayIndex)
        : null;

      if (existingHours) {
        // Day has specific hours from backend
        array.push(
          this.fb.group({
            dayIndex: [existingHours.dayIndex],
            day: [existingHours.day],
            startTime: [existingHours.startTime],
            endTime: [existingHours.endTime],
            isClosed: [false],
          }) as any
        );
      } else {
        // Day not in backend = closed
        array.push(
          this.fb.group({
            dayIndex: [dayInfo.dayIndex],
            day: [dayInfo.day],
            startTime: ['09:00'],
            endTime: ['17:00'],
            isClosed: [true],
          }) as any
        );
      }
    });
    
    return array;
  }

  get workHoursArray(): FormArray {
    return this.workHoursForm.get('workHours') as FormArray;
  }

  getWorkHourDayControl(index: number): FormGroup {
    return this.workHoursArray.at(index) as FormGroup;
  }

  // Image management methods
  onThumbnailSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newThumbnailFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newThumbnailPreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeThumbnailSelection(): void {
    this.newThumbnailFile = null;
    this.newThumbnailPreview = null;
  }

  onNewImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        this.newImageFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newImagePreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeNewImage(index: number): void {
    this.newImageFiles.splice(index, 1);
    this.newImagePreviews.splice(index, 1);
  }

  toggleImageForDeletion(imageId: number): void {
    if (this.imagesToDelete.has(imageId)) {
      this.imagesToDelete.delete(imageId);
    } else {
      this.imagesToDelete.add(imageId);
    }
  }

  isImageMarkedForDeletion(imageId: number): boolean {
    return this.imagesToDelete.has(imageId);
  }
}