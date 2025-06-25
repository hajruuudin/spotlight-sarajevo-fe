import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { TagService } from '../../services/tag.service';
import { SpotService } from '../../services/spot.service';
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { MediaService } from '../../services/media.service';
import { SpotCreateModel, SpotModel } from '../../models/spot-model';
import { MediaCreate } from '../../models/media-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-spot',
  imports: [NgIf, NgFor, HeadingComponent, ReactiveFormsModule, NgMultiSelectDropDownModule, UpperCasePipe, NgxSpinnerComponent, ButtonPrimaryComponent],
  templateUrl: './add-spot.component.html',
  styleUrl: './add-spot.component.css'
})
export class AddSpotComponent implements OnInit {
  protected addForm: FormGroup
  protected days: string[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];
  protected tagDropdownSettings = {
    singleSelection: false,
    idField: 'tagId',
    textField: 'tagName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    limitSelection: 5
  }
  protected tagDropdownAllItems: { tagId: number, tagName: string }[] = []
  protected tagDropdownSelectedItems: { tagId: number; tagName: string }[] = [];
  protected categorySelectItems: any = {}
  protected selectedFile: File | null = null;

  constructor(
    private tagService: TagService,
    private categoryService: CategoryService,
    private spotService: SpotService,
    private mediaService: MediaService,
    private fb: FormBuilder,
    private toastr: HotToastService,
    private spinner: NgxSpinnerService
  ) {
    this.addForm = this.fb.group({
      slug: ['', Validators.required],
      officialName: ['', Validators.required],
      smallDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      tags: [[]],

      // Work hours — optional
      mondayStartTime: [''],
      mondayEndTime: [''],
      tuesdayStartTime: [''],
      tuesdayEndTime: [''],
      wednesdayStartTime: [''],
      wednesdayEndTime: [''],
      thursdayStartTime: [''],
      thursdayEndTime: [''],
      fridayStartTime: [''],
      fridayEndTime: [''],
      saturdayStartTime: [''],
      saturdayEndTime: [''],
      sundayStartTime: [''],
      sundayEndTime: [''],

      // Ratings — required
      rating: ['', Validators.required],
      overallQuality: ['', Validators.required],
      atmosphere: ['', Validators.required],
      staffKindness: ['', Validators.required],
      cleanliness: ['', Validators.required],
      affordability: ['', Validators.required],
      accessibility: ['', Validators.required],

      // Location — required
      address: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.tagService.fetchData().subscribe({
      next: (response: any) => {
        let tagArray = response['content']
        tagArray.forEach((tag: any) => {
          this.tagDropdownAllItems.push({
            tagId: tag.id,
            tagName: tag.tagName
          })
        });
      }
    })

    this.categoryService.fetchCategories().subscribe({
      next: (response: any) => {
        this.categorySelectItems = response['content']
      }
    })
  }

  onItemSelect(item: any) {
    if (!this.tagDropdownSelectedItems.some(i => i.tagName === item.tagName)) {
      this.tagDropdownSelectedItems.push(item);
    }
  }

  onItemDeSelect(item: any) {
    this.tagDropdownSelectedItems = this.tagDropdownSelectedItems.filter(i => i.tagName !== item.tagName);
  }

  async onItemSave() {
    if (!this.addForm.valid) {
      this.toastr.warning('All fields except event details need to be filled!')
    } else {
      this.spinner.show()

      let imageUrl: string | null = null;

      if (this.selectedFile) {
        imageUrl = await this.mediaService.uploadImage(this.selectedFile);
        console.log('Uploaded image URL:', imageUrl);
      }

      const formValues = this.addForm.value;

      const newSpot = new SpotCreateModel(
        formValues.officialName,
        formValues.slug,
        formValues.categoryName,
        formValues.address,
        Number(formValues.lat),
        Number(formValues.lon),
        formValues.fullDescription,
        formValues.smallDescription,

        formValues.mondayStartTime,
        formValues.mondayEndTime,
        formValues.tuesdayStartTime,
        formValues.tuesdayEndTime,
        formValues.wednesdayStartTime,
        formValues.wednesdayEndTime,
        formValues.thursdayStartTime,
        formValues.thursdayEndTime,
        formValues.fridayStartTime,
        formValues.fridayEndTime,
        formValues.saturdayStartTime,
        formValues.saturdayEndTime,
        formValues.sundayStartTime,
        formValues.sundayEndTime,

        Number(formValues.rating),
        Number(formValues.affordability),
        Number(formValues.atmosphere),
        Number(formValues.overallQuality),
        Number(formValues.cleanliness),
        Number(formValues.staffKindness),
        Number(formValues.accessibility),

        formValues.tags
      );


      this.spotService.addSpot(newSpot).subscribe({
        next: (response: SpotModel) => {
          this.spinner.hide()
          this.toastr.success(`${response.officialName} added!`)

          if (imageUrl != null) {
            const mediaCreate = new MediaCreate(
              "SPOT",
              response.id,
              imageUrl,
              true
            )

            this.mediaService.addMedia(mediaCreate).subscribe({
              next: (response: any) => { },
              error: (response: HttpErrorResponse) => { }
            })
          }
        },
        error: (error: HttpErrorResponse) => {
          this.spinner.hide()
          this.toastr.error(error.message)
        }
      })
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file is:', this.selectedFile);
    }
  }

  labelWorkDayAsClosed(workDay: string) {
    const startControlName = `${workDay}StartTime`;
    const endControlName = `${workDay}EndTime`;

    this.addForm.patchValue({
      [startControlName]: '',
      [endControlName]: ''
    });
  }

}
