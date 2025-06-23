import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpotModel, SpotShorthand, SpotUpdateModel } from '../../models/spot-model';
import { EventModel, EventShorthand } from '../../models/event-model';
import { DatePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { SpotService } from '../../services/spot.service';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagService } from '../../services/tag.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ButtonPrimaryComponent } from "../button-primary/button-primary.component";
import { ButtonRegularComponent } from "../button-regular/button-regular.component";
import { MatIconModule } from '@angular/material/icon';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-ss-table',
  imports: [NgFor, NgIf, DatePipe, NgMultiSelectDropDownModule, ReactiveFormsModule, FormsModule, ButtonPrimaryComponent, UpperCasePipe, MatIconModule],
  templateUrl: './ss-table.component.html',
  styleUrl: './ss-table.component.css',
  host: {
    class: 'w-full h-auto'
  }
})
export class SsTableComponent implements OnInit {
  @Input() tableType: Boolean = false;
  @Input() tableData: (SpotShorthand | EventShorthand)[] = [];
  @Input() tablePageNumber: number = 0;
  @Input() tableMaxPage: number = 55;
  @Input() tablePageSize: number = 999;
  @Output() itemInfoSaved = new EventEmitter<any>();
  @Output() eventItemInfoSaved = new EventEmitter<any>();
  @Output() itemNextPage = new EventEmitter<any>();
  @Output() itemPreviousPage = new EventEmitter<any>();

  protected days: string[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  protected isItemInfoShowed: Boolean = false;
  protected selectedSlug: string = ''
  protected fullItemInfo: (SpotModel | EventModel) | null = null;

  protected tagDropdownSettings = {
    singleSelection: false,
    idField: 'tagId',
    textField: 'tagName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    limitSelection: 5
  }

  protected eventTagDropdownSettings = {
    singleSelection: false,
    idField: 'tagId',
    textField: 'tagName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    limitSelection: 5
  }

  protected tagDropdownAllItems: { tagId: number, tagName: string }[] = []
  // Tags and Category selection for spots
  protected tagDropdownSelectedItems: { tagId: number; tagName: string }[] = [];
  protected categorySelectItems: any = {}
  // Tags and Category selection for events
  protected eventTagDropdownSelectedItems: { tagId: number; tagName: string }[] = [];
  protected eventCategorySelectItems: any = {}

  protected detailsSectionForm: FormGroup
  protected eventDetailsSectionForm: FormGroup

  constructor(
    private spotService: SpotService,
    private eventService: EventService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: HotToastService
  ) {
    this.detailsSectionForm = this.fb.group({
      id: ['', Validators.required],
      slug: ['', Validators.required],
      officialName: ['', Validators.required],
      smallDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      tags: [[], Validators.required],

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
    });

    this.eventDetailsSectionForm = this.fb.group({
      id: ['', Validators.required],
      slug: ['', Validators.required],
      officialName: ['', Validators.required],
      smallDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      tags: [[], Validators.required],

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
      }
    })

    this.categoryService.fetchCategories().subscribe({
      next: (response: any) => {
        this.categorySelectItems = response['content']
      }
    })
  }

  isSpot(
    row: SpotShorthand | SpotModel | EventShorthand | EventModel | null | undefined
  ): row is SpotShorthand | SpotModel {
    return !!row && 'rating' in row;
  }

  isEvent(
    row: SpotShorthand | SpotModel | EventShorthand | EventModel | null | undefined
  ): row is EventShorthand | EventModel {
    return !!row && ('startDateFormatted' in row || 'startDate' in row);
  }

  nextPage() {
    if (this.tableMaxPage != this.tablePageNumber + 1) {
      if (this.tableType) {
        this.itemNextPage.emit("SPOT")
      } else {
        this.itemNextPage.emit("EVENT")
      }
    } else {
      return
    }
  }

  previousPage() {
    if (this.tablePageNumber != 0) {
      if (this.tableType) {
        this.itemPreviousPage.emit("SPOT")
      } else {
        this.itemPreviousPage.emit("EVENT")
      }
    } else {
      return;
    }
  }

  saveItemInfo() {
    if (this.detailsSectionForm.invalid) {
      this.detailsSectionForm.markAllAsTouched();
      this.toastr.warning("All fields except the work hours must be set!")
      return;
    }

    const formData = this.detailsSectionForm.value;
    this.itemInfoSaved.emit(formData as SpotUpdateModel);
  }

  saveEventItemInfo() {
    if (this.eventDetailsSectionForm.invalid) {
      this.eventDetailsSectionForm.markAllAsTouched();
      this.toastr.warning("All fields except the event details must be set!")
      return;
    }

    const formData = this.eventDetailsSectionForm.value;
    this.eventItemInfoSaved.emit(formData);
  }


  loadItemInfoSection(itemSlug: string, itemType: string) {
    this.selectedSlug = itemSlug;
    this.isItemInfoShowed = true
    this.getFullItemInfo(itemSlug, itemType);
  }

  closeItemInfoSection() {
    this.isItemInfoShowed = false;
    this.fullItemInfo = null;
  }

  getFullItemInfo(itemSlug: string, itemType: string) {
    if (itemType == "SPOT") {
      this.spotService.getSpotOverviewBySlug(itemSlug).subscribe({
        next: (response: any) => {
          this.fullItemInfo = response as SpotModel

          this.detailsSectionForm.patchValue({
            id: this.fullItemInfo.id,
            slug: this.fullItemInfo.slug,
            officialName: this.fullItemInfo.officialName,
            smallDescription: this.fullItemInfo.smallDescription,
            fullDescription: this.fullItemInfo.fullDescription,
            categoryName: this.fullItemInfo.categoryName,
            tags: this.fullItemInfo.tagNames,

            mondayStartTime: this.fullItemInfo.workHours[0]?.startTime || '',
            mondayEndTime: this.fullItemInfo.workHours[0]?.endTime || '',
            tuesdayStartTime: this.fullItemInfo.workHours[1]?.startTime || '',
            tuesdayEndTime: this.fullItemInfo.workHours[1]?.endTime || '',
            wednesdayStartTime: this.fullItemInfo.workHours[2]?.startTime || '',
            wednesdayEndTime: this.fullItemInfo.workHours[2]?.endTime || '',
            thursdayStartTime: this.fullItemInfo.workHours[3]?.startTime || '',
            thursdayEndTime: this.fullItemInfo.workHours[3]?.endTime || '',
            fridayStartTime: this.fullItemInfo.workHours[4]?.startTime || '',
            fridayEndTime: this.fullItemInfo.workHours[4]?.endTime || '',
            saturdayStartTime: this.fullItemInfo.workHours[5]?.startTime || '',
            saturdayEndTime: this.fullItemInfo.workHours[5]?.endTime || '',
            sundayStartTime: this.fullItemInfo.workHours[6]?.startTime || '',
            sundayEndTime: this.fullItemInfo.workHours[6]?.endTime || '',

            overallQuality: this.fullItemInfo.quality,
            atmosphere: this.fullItemInfo.atmosphere,
            staffKindness: this.fullItemInfo.staffKindness,
            cleanliness: this.fullItemInfo.cleanliness,
            affordability: this.fullItemInfo.affordability,
            accessibility: this.fullItemInfo.accessibility,
            address: this.fullItemInfo.address,
            lat: this.fullItemInfo.latitude,
            lon: this.fullItemInfo.longitude
          });


          this.tagDropdownSelectedItems = this.tagDropdownAllItems.filter(tag =>
            this.fullItemInfo!.tagNames.includes(tag.tagName)
          );
          this.setPreselectedTags(this.fullItemInfo.tagNames)
        },
        error: (error: HttpErrorResponse) => {
          console.error(error)
        }
      })
    } else if (itemType == "EVENT") {
      this.eventService.getEventOverviewBySlug(itemSlug).subscribe({
        next: (response: any) => {
          this.fullItemInfo = response as EventModel

          this.eventDetailsSectionForm.patchValue({
            id: this.fullItemInfo.id,
            slug: this.fullItemInfo.slug,
            officialName: this.fullItemInfo.officialName,
            smallDescription: this.fullItemInfo.smallDescription,
            fullDescription: this.fullItemInfo.fullDescription,
            categoryName: this.fullItemInfo.categoryName,
            tags: this.fullItemInfo.tagNames,
            startDate: this.fullItemInfo.startDate,
            endDate: this.fullItemInfo.endDate,
            locationDescription: this.fullItemInfo.locationDescription,
            address: this.fullItemInfo.address,
            entryPrice: this.fullItemInfo.entryPrice,
            ageLimit: this.fullItemInfo.ageLimit,
            reservation: this.fullItemInfo.reservation,
            cancelRefund: this.fullItemInfo.cancelRefund,
            openStatus: this.fullItemInfo.openStatus,
            eventLanguage: this.fullItemInfo.eventLanguage,
          });

          this.eventTagDropdownSelectedItems = this.tagDropdownAllItems.filter(tag =>
            this.fullItemInfo!.tagNames.includes(tag.tagName)
          );
          this.setPreselectedEventTags(this.fullItemInfo.tagNames)

          console.log("Selected tags are:", this.eventTagDropdownSelectedItems)
          
        },
        error: (error: HttpErrorResponse) => {
          console.error(error)
        }
      })
    }
  }

  setPreselectedTags(fullItemTagNames: string[]) {
    this.tagDropdownSelectedItems = this.tagDropdownAllItems.filter(tagItem =>
      fullItemTagNames.includes(tagItem.tagName)
    );
  }

  setPreselectedEventTags(fullItemTagNames: string[]){
     this.eventTagDropdownSelectedItems = this.tagDropdownAllItems.filter(tagItem =>
      fullItemTagNames.includes(tagItem.tagName)
    );
  }

  onItemSelect(item: any) {
    if (!this.tagDropdownSelectedItems.some(i => i.tagName === item.tagName)) {
      this.tagDropdownSelectedItems.push(item);
    }
  }

  onItemDeSelect(item: any) {
    this.tagDropdownSelectedItems = this.tagDropdownSelectedItems.filter(i => i.tagName !== item.tagName);
  }

  onEventItemSelect(item: any){
    if (!this.eventTagDropdownSelectedItems.some(i => i.tagName === item.tagName)) {
      this.eventTagDropdownSelectedItems.push(item);
    }
  }

  onEventItemDeSelect(item: any){
    this.eventTagDropdownSelectedItems = this.eventTagDropdownSelectedItems.filter(i => i.tagName !== item.tagName);
  }

  labelWorkDayAsClosed(workDay: string) {
    const startControlName = `${workDay}StartTime`;
    const endControlName = `${workDay}EndTime`;

    this.detailsSectionForm.patchValue({
      [startControlName]: '',
      [endControlName]: ''
    });
  }
}
