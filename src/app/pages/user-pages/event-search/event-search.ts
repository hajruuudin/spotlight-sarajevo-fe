import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventCategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category-service';
import { SessionService } from '../../../services/session-service';
import { SpinnerService } from '../../../services/spinner-service';
import { HotToastService } from '@ngxpert/hot-toast';
import { EventShorthandModel } from '../../../models/event.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoPipe } from '@ngneat/transloco';
import { SearchBar } from "../../../components/search-bar/search-bar";
import { SortingSelector } from "../../../components/sorting-selector/sorting-selector";
import { ButtonSecondary } from "../../../components/button-secondary/button-secondary";
import { CategoryFilterSelector } from "../../../components/category-filter-selector/category-filter-selector";
import { SearchEventCard } from "../../../components/search-event-card/search-event-card";

@Component({
  selector: 'app-event-search',
  imports: [PageHeader, ReactiveFormsModule, TranslocoPipe, SearchBar, SortingSelector, ButtonSecondary, CategoryFilterSelector, SearchEventCard],
  templateUrl: './event-search.html',
  styleUrl: './event-search.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class EventSearch {
  protected eventSearchForm: FormGroup
  protected eventCategories: EventCategoryModel[] = []
  protected sortingMethods: string[] = ['SORT_01', 'SORT_04', 'SORT_03']

  protected selectedCategoryIds: number[] = []
  protected selectedSortingMethod: string = 'Alphabetical'

  protected isFilterPopupLoaded: boolean = false
  protected isSortingPopupLoaded: boolean = false

  constructor(
    private categoryService: CategoryService,
    //====== COMMON NON-OBJECT SERVICES =====//
    public session: SessionService,
    private fb: FormBuilder,
    private spinner: SpinnerService,
    private toastr: HotToastService,
    private cdr: ChangeDetectorRef
  ){
    this.eventSearchForm = this.fb.group({
      'searchTerm' : ['', Validators.required],
      'sortOption' : ['', Validators.required],
      'filterCategoryIds' : [[], Validators.required]
    })
  }

  public testEvent = new EventShorthandModel(
      1,
      "Zeljko Joksimovic",
      "This is just a test event for the frotnend",
      "Concert",
      "https://i.ibb.co/q3TzQ4FH/Screenshot-2025-10-30-at-9-43-55-PM.png",
      "2024 august 12",
      ['Alcohol', 'Dance', 'Live']
  )

  public testEventArray = [
    this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, this.testEvent, 
  ]

  ngOnInit(): void {
    this.categoryService.getAllEventCategories().subscribe({
      next: (response : EventCategoryModel[]) => {
        this.eventCategories = response
        this.cdr.detectChanges()
      },
      error: (error : HttpErrorResponse) => {
        // probably redirect to error
      }
    })
  }

  onSearchTriggered(searchValue: string) {
    console.log('Search Term:', searchValue);
    console.log('Form Value:', this.eventSearchForm.value);
  }

  onCategoryCheckboxChange(categoryID: number){
    this.selectedCategoryIds.push(categoryID);
  }

  toggleFilterPopup(){
    this.isFilterPopupLoaded = !this.isFilterPopupLoaded
  }

  toggleSortingPopup(){
    this.isSortingPopupLoaded = !this.isSortingPopupLoaded
  }
}
