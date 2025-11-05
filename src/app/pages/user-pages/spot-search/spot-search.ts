import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { SearchBar } from "../../../components/search-bar/search-bar";
import { TranslocoPipe, TranslocoDirective } from '@ngneat/transloco';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../../services/session-service';
import { SpinnerService } from '../../../services/spinner-service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CategoryService } from '../../../services/category-service';
import { SpotCategoryModel } from '../../../models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryFilterSelector } from "../../../components/category-filter-selector/category-filter-selector";
import { ButtonSecondary } from "../../../components/button-secondary/button-secondary";
import { SortingSelector } from '../../../components/sorting-selector/sorting-selector';
import { SpotShorthandModel } from '../../../models/spot.model';
import { SearchSpotCard } from '../../../components/search-spot-card/search-spot-card';

@Component({
  selector: 'app-spot-search',
  imports: [PageHeader, SearchBar, TranslocoPipe, ReactiveFormsModule, CategoryFilterSelector, ButtonSecondary, SortingSelector, SearchSpotCard, TranslocoDirective],
  templateUrl: './spot-search.html',
  styleUrl: './spot-search.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class SpotSearch implements OnInit{
  protected spotSearchForm: FormGroup
  protected spotCategories: SpotCategoryModel[] = []
  protected sortingMethods: string[] = ['SORT_01', 'SORT_02', 'SORT_03']

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
    this.spotSearchForm = this.fb.group({
      'searchTerm' : ['', Validators.required],
      'sortOption' : ['', Validators.required],
      'filterCategoryIds' : [[], Validators.required]
    })
  }

  public testSpot = new SpotShorthandModel(
      1,
      "Kilim Ilidza",
      "This is just a test spot for the frotnend",
      "Cafe",
      "https://i.ibb.co/7HWPLBJ/Screenshot-2025-10-30-at-9-13-33-PM.png",
      "9.4",
      ['Alcohol', 'Dance', 'Live']
  )

  public testSpotArray = [
    this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot
  ]

  ngOnInit(): void {
    this.categoryService.getAllSpotCategories().subscribe({
      next: (response : SpotCategoryModel[]) => {
        this.spotCategories = response
        this.cdr.detectChanges()
      },
      error: (error : HttpErrorResponse) => {
        // probably redirect to error
      }
    })
  }

  onSearchTriggered(searchValue: string) {
    console.log('Search Term:', searchValue);
    console.log('Form Value:', this.spotSearchForm.value);
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
