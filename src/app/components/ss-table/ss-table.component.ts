import { Component, Input, OnInit } from '@angular/core';
import { SpotModel, SpotShorthand } from '../../models/spot-model';
import { EventModel, EventShorthand } from '../../models/event-model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SpotService } from '../../services/spot.service';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagService } from '../../services/tag.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-ss-table',
  imports: [NgFor, NgIf, DatePipe, NgMultiSelectDropDownModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ss-table.component.html',
  styleUrl: './ss-table.component.css',
  host: {
    class: 'w-full h-auto'
  }
})
export class SsTableComponent implements OnInit{
  @Input() tableType : Boolean = false;
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
    itemsShowLimit: 3,
    allowSearchFilter: true
  }
  protected tagDropdownSelectedItems : string[]= []
  protected categorySelectItems : any = {}
  protected tagDropdownAllItems : {tagId: number, tagName: string}[] = []
  protected detailsSectionForm : FormGroup

  constructor(
    private spotService: SpotService,
    private eventService: EventService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ){ 
    this.detailsSectionForm = this.fb.group({
      "slug" : [''],
      "officialName" : [''],
      "smallDescription" : [''],
      "fullDescription" : [''],
      "categoryId" : [''],
      "tagNames" : [[]],
      "mondayTime" : [''],
      "tuesdayTime" : [''],
      "wednesdayTime" : [''],
      "thursdayTime" : [''],
      "fridayTime" : [''],
      "saturdayTime" : [''],
      "sundayTime" : ['']
    })
  }

  ngOnInit(): void {
    this.tagService.fetchData().subscribe({
      next: (response : any) => {
        let tagArray = response['content']
        tagArray.forEach((tag : any) => {
          this.tagDropdownAllItems.push({
            tagId: tag.id,
            tagName: tag.tagName
          })
        });
      }
    })

    this.categoryService.fetchCategories().subscribe({
      next: (response : any) => {
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


  loadItemInfoSection(itemSlug: string, itemType: string){
    this.selectedSlug = itemSlug;
    this.isItemInfoShowed = true
    this.getFullItemInfo(itemSlug, itemType);
  }

  closeItemInfoSection(){
    this.isItemInfoShowed = false;
    this.fullItemInfo = null;
  }

  getFullItemInfo(itemSlug: string, itemType: string){
    if(itemType == "SPOT"){
      this.spotService.getSpotOverviewBySlug(itemSlug).subscribe({
        next: (response : any) => {
          this.fullItemInfo = response as SpotModel
          this.tagDropdownSelectedItems = this.fullItemInfo.tagNames
        },
        error: (error : HttpErrorResponse) => {
          console.error(error)
        }
      })
    } else if (itemType == "EVENT"){
      this.eventService.getEventOverviewBySlug(itemSlug).subscribe({
        next: (response : any) => {
          this.fullItemInfo = response as EventModel
        },
        error: (error : HttpErrorResponse) => {
          console.error(error)
        }
      })
    }
  }

  onItemSelect(item: any){

  }

  onSelectAll(items: any){

  }

  labelWorkDayAsClosed(wordkDay: string){

  }
}
