import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagService } from '../../services/tag.service';
import { CategoryService } from '../../services/category.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { NgFor, NgIf } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { EventCreateModel, EventModel } from '../../models/event-model';
import { EventService } from '../../services/event.service';
import { MediaCreate } from '../../models/media-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  imports: [NgIf, NgFor, HeadingComponent, ReactiveFormsModule, NgMultiSelectDropDownModule, ButtonPrimaryComponent, NgxSpinnerComponent],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit {
  protected addForm: FormGroup
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
    private eventService: EventService,
    private tagService: TagService,
    private categoryService: CategoryService,
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

      // Date and time
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      locationDescription: ['', Validators.required],
      address: ['', Validators.required],

      // Event specific data
      entryPrice: [''],
      ageLimit: [''],
      reservation: [''],
      cancelRefund: [''],
      openStatus: [''],
      eventLanguage: [''],
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

        console.log(this.tagDropdownAllItems)
        console.log(this.tagDropdownSelectedItems)
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

      const newEvent = new EventCreateModel(
        formValues.slug,
        formValues.officialName,
        formValues.smallDescription,
        formValues.fullDescription,
        formValues.categoryName,
        formValues.tags,
        formValues.startDate,
        formValues.endDate,
        formValues.entryPrice,
        formValues.ageLimit,
        formValues.reservation,
        formValues.openStatus,
        formValues.cancelRefund,
        formValues.eventLanguage,
        formValues.address,
        formValues.locationDescription
      );

      this.eventService.addEvent(newEvent).subscribe({
        next: (response: EventModel) => {
          this.spinner.hide()
          this.toastr.success(`${response.officialName} added!`)

          if(imageUrl != null){
            const mediaCreate = new MediaCreate(
              "EVENT",
              response.id,
              imageUrl,
              true
            )

            this.mediaService.addMedia(mediaCreate).subscribe({
              next: (response : any) => {},
              error: (response : HttpErrorResponse) => {}
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
}
