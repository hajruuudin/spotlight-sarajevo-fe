import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  TouristGuideOverviewModel,
  TouristGuideShorthandModel,
  TouristGuideSectionUpdateModel,
  TouristGuideUpdateModel,
} from '../../../../shared/models/tourist.guide.model';
import { AdminOverviewBaseTable } from '../../admin-overview-table';
import { ButtonPrimary } from '../../../button-primary/button-primary';
import { ButtonSecondary } from '../../../button-secondary/button-secondary';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../../text-input/text-input';
import { TextArea } from '../../../text-area/text-area';
import { SelectGroup } from '../../../select-group/select-group';
import { GuideType } from '../../../../shared/constants/ObjectTypes';
import { forkJoin, Observable, of } from 'rxjs';
import { ImageBBResponse } from '../../../../services/image-upload.service';
import { GuideCategoryModel } from '../../../../shared/models/category.model';

/**
 * Guide Overview Table Component
 *
 * Layout when expanded:
 *  Col 1 – Basic Details (slug, titles, descriptions)
 *  Col 2 – Category (editable select) + Contact Info (EXTERNAL only) + Thumbnail
 *  Col 3..N – One column per guide section (editable title, body, thumbnail; max 6)
 *  Col N+1 – "Add Section" action column (shown when sections < 6)
 */
@Component({
  selector: 'app-guide-overview-table',
  imports: [ButtonPrimary, ButtonSecondary, ReactiveFormsModule, TextInput, TextArea, SelectGroup],
  templateUrl: './guide-overview-table.html',
  styleUrl: './guide-overview-table.css',
  host: { class: 'w-full' },
})
export class GuideOverviewTable extends AdminOverviewBaseTable implements OnChanges, OnInit {
  @Input() tableData: TouristGuideShorthandModel[] = [];
  @Input() itemOverview: TouristGuideOverviewModel | null = null;

  @Output() onSaveChange: EventEmitter<TouristGuideUpdateModel> = new EventEmitter<TouristGuideUpdateModel>();

  protected basicInformationForm: FormGroup;
  protected sectionsFormArray: FormArray;

  protected categoryOptions: { label: string; value: any }[] = [];

  // Guide thumbnail
  protected newThumbnailFile: File | null = null;
  protected newThumbnailPreview: string | null = null;

  // Per-section parallel arrays (indexed by position in sectionsFormArray)
  protected sectionIds: (number | null)[] = [];
  protected sectionExistingThumbnailUrls: string[] = [];
  protected sectionNewThumbnailFiles: (File | null)[] = [];
  protected sectionNewThumbnailPreviews: (string | null)[] = [];

  readonly MAX_SECTIONS = 6;

  constructor() {
    super();
    this.sectionsFormArray = this.fb.array([]);
    this.basicInformationForm = this.fb.group({
      slug: [''],
      guideTitleBs: [''],
      guideTitleEn: [''],
      guideSmallDescriptionBs: [''],
      guideSmallDescriptionEn: [''],
      guideFullDescriptionBs: [''],
      guideFullDescriptionEn: [''],
      categoryId: [null],
    });
  }

  /* ===================================================== */
  /* ============ LIFECYCLE UPDATE FUNCTIONS ============= */
  /* ===================================================== */

  ngOnInit(): void {
    this.categoryService.getAllGuideCategories().subscribe({
      next: (categories: GuideCategoryModel[]) => {
        this.categoryOptions = categories.map((c) => ({
          label: c.guideCategoryNameEn,
          value: c.id,
        }));
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemOverview']?.currentValue) {
      const overview: TouristGuideOverviewModel = changes['itemOverview'].currentValue;

      this.basicInformationForm.patchValue(
        {
          slug: overview.slug,
          guideTitleBs: overview.guideTitleBs,
          guideTitleEn: overview.guideTitleEn,
          guideSmallDescriptionBs: overview.guideSmallDescriptionBs,
          guideSmallDescriptionEn: overview.guideSmallDescriptionEn,
          guideFullDescriptionBs: overview.guideFullDescriptionBs,
          guideFullDescriptionEn: overview.guideFullDescriptionEn,
          categoryId: overview.categoryId ?? null,
        },
        { emitEvent: false },
      );

      // Rebuild sections FormArray
      this.sectionsFormArray.clear();
      this.sectionIds = [];
      this.sectionExistingThumbnailUrls = [];
      this.sectionNewThumbnailFiles = [];
      this.sectionNewThumbnailPreviews = [];

      for (const section of overview.sections) {
        this.sectionsFormArray.push(
          this.fb.group({
            sectionTitleBs: [section.sectionTitleBs],
            sectionTitleEn: [section.sectionTitleEn],
            sectionBodyBs: [section.sectionBodyBs],
            sectionBodyEn: [section.sectionBodyEn],
          }),
        );
        this.sectionIds.push(section.id);
        this.sectionExistingThumbnailUrls.push(section.thumbnailImage ?? '');
        this.sectionNewThumbnailFiles.push(null);
        this.sectionNewThumbnailPreviews.push(null);
      }

      this.newThumbnailFile = null;
      this.newThumbnailPreview = null;
    }
  }

  /* ============================ Getters ============================ */

  get sectionControls(): FormGroup[] {
    return this.sectionsFormArray.controls as FormGroup[];
  }

  /* =================================================================================== */
  /* ============ DATA MANIPULATION FUNCTIONS WHICH ARE SENT TO THE PARENT ============= */
  /* =================================================================================== */

  protected addSection(): void {
    if (this.sectionsFormArray.length >= this.MAX_SECTIONS) return;
    this.sectionsFormArray.push(
      this.fb.group({
        sectionTitleBs: [''],
        sectionTitleEn: [''],
        sectionBodyBs: [''],
        sectionBodyEn: [''],
      }),
    );
    this.sectionIds.push(null);
    this.sectionExistingThumbnailUrls.push('');
    this.sectionNewThumbnailFiles.push(null);
    this.sectionNewThumbnailPreviews.push(null);
  }

  override onSaveChangeSelected(): void {
    if (!this.itemOverview) return;

    this.spinnerService.showNavigateSpinner();

    const guideThumb$: Observable<ImageBBResponse | null> = this.newThumbnailFile
      ? this.imageUploadService.uploadImage(this.newThumbnailFile)
      : of(null);

    const sectionUploadParts$: Observable<ImageBBResponse | null>[] =
      this.sectionNewThumbnailFiles.map((file) =>
        file ? this.imageUploadService.uploadImage(file) : of(null),
      );

    const sectionUploads$: Observable<(ImageBBResponse | null)[]> =
      sectionUploadParts$.length > 0 ? forkJoin(sectionUploadParts$) : of([]);

    forkJoin({ guide: guideThumb$, sections: sectionUploads$ }).subscribe({
      next: (results: { guide: ImageBBResponse | null; sections: (ImageBBResponse | null)[] }) => {
        const thumbnailUrl = results.guide
          ? results.guide.data.url
          : this.itemOverview!.thumbnailImage;

        const sections: TouristGuideSectionUpdateModel[] = this.sectionControls.map((group, i) => {
          const thumbUrl = results.sections[i]
            ? results.sections[i]!.data.url
            : this.sectionExistingThumbnailUrls[i] ?? '';

          return new TouristGuideSectionUpdateModel(
            this.sectionIds[i],
            group.value.sectionTitleBs,
            group.value.sectionTitleEn,
            group.value.sectionBodyBs,
            group.value.sectionBodyEn,
            thumbUrl,
            i,
          );
        });

        const payload = new TouristGuideUpdateModel(
          this.itemOverview!.id,
          this.basicInformationForm.value.slug,
          this.basicInformationForm.value.guideTitleBs,
          this.basicInformationForm.value.guideTitleEn,
          this.basicInformationForm.value.guideSmallDescriptionBs,
          this.basicInformationForm.value.guideSmallDescriptionEn,
          this.basicInformationForm.value.guideFullDescriptionBs,
          this.basicInformationForm.value.guideFullDescriptionEn,
          this.basicInformationForm.value.categoryId,
          thumbnailUrl,
          sections,
        );

        this.spinnerService.hideNavigateSpinner();
        this.onSaveChange.emit(payload);
      },
      error: () => {
        this.spinnerService.hideNavigateSpinner();
        this.toastService.error('Failed to upload image. Please try again.');
      },
    });
  }

  override onDeleteItemSelected(): void {
    if (this.selectedItemId !== null) {
      this.onDeleteItem.emit(this.selectedItemId);
    }
  }

  /* ============================================================================================ */
  /* ============ UI INTERFACE FUNCTIONS AND HELPERS USED ONLY TO SHOWCASE THE DATA ============= */
  /* ============================================================================================ */

  protected onThumbnailSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.newThumbnailFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.newThumbnailPreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  protected removeThumbnailSelection(): void {
    this.newThumbnailFile = null;
    this.newThumbnailPreview = null;
  }

  protected onSectionThumbnailSelected(index: number, event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.sectionNewThumbnailFiles[index] = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.sectionNewThumbnailPreviews[index] = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  protected removeSectionThumbnail(index: number): void {
    this.sectionNewThumbnailFiles[index] = null;
    this.sectionNewThumbnailPreviews[index] = null;
  }

  protected contactInfoEntries(): { key: string; value: string }[] {
    if (!this.itemOverview?.contactInfo) return [];
    return Object.entries(this.itemOverview.contactInfo).map(([key, value]) => ({ key, value }));
  }

  protected isExternal(): boolean {
    return this.itemOverview?.guideType === GuideType.EXTERNAL;
  }
}

