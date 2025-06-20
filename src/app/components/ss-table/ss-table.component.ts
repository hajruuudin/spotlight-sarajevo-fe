import { Component, Input, OnInit } from '@angular/core';
import { SpotModel, SpotShorthand } from '../../models/spot-model';
import { EventModel, EventShorthand } from '../../models/event-model';
import { DatePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { SpotService } from '../../services/spot.service';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagService } from '../../services/tag.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ButtonPrimaryComponent } from "../button-primary/button-primary.component";
import { ButtonRegularComponent } from "../button-regular/button-regular.component";

@Component({
  selector: 'app-ss-table',
  imports: [NgFor, NgIf, DatePipe, NgMultiSelectDropDownModule, ReactiveFormsModule, FormsModule, ButtonPrimaryComponent, UpperCasePipe],
  templateUrl: './ss-table.component.html',
  styleUrl: './ss-table.component.css',
  host: {
    class: 'w-full h-auto'
  }
})
export class SsTableComponent implements OnInit {
  days: string[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];


  @Input() tableType: Boolean = false;
  @Input() tableData: (SpotShorthand | EventShorthand)[] = [];

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
  protected tagDropdownSelectedItems: { tagId: number; tagName: string }[] = [];
  protected categorySelectItems: any = {}
  protected tagDropdownAllItems: { tagId: number, tagName: string }[] = []
  protected detailsSectionForm: FormGroup

  constructor(
    private spotService: SpotService,
    private eventService: EventService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.detailsSectionForm = this.fb.group({
      slug: [''],
      officialName: [''],
      smallDescription: [''],
      fullDescription: [''],
      categoryName: [''],
      tagNames: [[]],

      // Work hours per day
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

      // Rating fields
      overallQuality: [''],
      atmosphere: [''],
      staffKindness: [''],
      cleanliness: [''],
      affordability: [''],
      accessibility: [''],

      // Location
      address: [''],
      lat: [''],
      long: ['']
    });
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
    return !!row && 'startDateFormatted' in row;
  }

  saveItemInfo(){
      console.log(this.detailsSectionForm.value);
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
            slug: this.fullItemInfo.slug,
            officialName: this.fullItemInfo.officialName,
            smallDescription: this.fullItemInfo.smallDescription,
            fullDescription: this.fullItemInfo.fullDescription,
            categoryName: this.fullItemInfo.categoryName,
            tagNames: this.fullItemInfo.tagNames,

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
            long: this.fullItemInfo.longitude
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


  onItemSelect(item: any) {
    if (!this.tagDropdownSelectedItems.some(i => i.tagName === item.tagName)) {
      this.tagDropdownSelectedItems.push(item);
    }
    console.log(this.tagDropdownSelectedItems);
  }

  onItemDeSelect(item: any) {
    this.tagDropdownSelectedItems = this.tagDropdownSelectedItems.filter(i => i.tagName !== item.tagName);
    console.log(this.tagDropdownSelectedItems);
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
