import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { SearchBar } from "../../../components/search-bar/search-bar";
import { TranslocoPipe } from '@ngneat/transloco';
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
import { SortOptions } from '../../../utils/enums/SortOptions';
import { SpotService } from '../../../services/spot-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spot-search',
  imports: [PageHeader, SearchBar, TranslocoPipe, ReactiveFormsModule, CategoryFilterSelector, ButtonSecondary, SortingSelector, SearchSpotCard],
  templateUrl: './spot-search.html',
  styleUrl: './spot-search.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class SpotSearch implements OnInit{
  protected lang: String = 'en'
  protected sub!: Subscription
  protected spotSearchForm: FormGroup
  protected spotCategories: SpotCategoryModel[] = []
  protected sortingMethods: string[] = [
    SortOptions.ALPHABETICAL.toString(), 
    SortOptions.RATING.toString()
  ]

  protected selectedCategoryIds: number[] = []
  protected selectedSortingMethod: string = SortOptions.ALPHABETICAL.toString()

  protected isFilterPopupLoaded: boolean = false
  protected isSortingPopupLoaded: boolean = false

  protected spotSearchResults: SpotShorthandModel[] = []

  constructor(
    private categoryService: CategoryService,
    private spotService: SpotService,
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

  // public testSpot = new SpotShorthandModel(
  //     1,
  //     "Kilim Ilidza",
  //     "This is just a test spot for the frotnend",
  //     "Cafe",
  //     "https://i.ibb.co/7HWPLBJ/Screenshot-2025-10-30-at-9-13-33-PM.png",
  //     "9.4",
  //     ['Alcohol', 'Dance', 'Live']
  // )

  // public testSpotArray = [
  //   this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot, this.testSpot
  // ]

  ngOnInit(): void {
    this.sub = this.session.language.subscribe(lang => {
      this.lang = lang;
    });

    this.categoryService.getAllSpotCategories().subscribe({
      next: (response : SpotCategoryModel[]) => {
        this.spotCategories = response
        this.cdr.detectChanges()
      },
      error: (error : HttpErrorResponse) => {}
    })

    this.spotService.findSpotsPaginated(0, 10, '', SortOptions.ALPHABETICAL.toString(), []).subscribe({
      next: (response : any) => {
        this.spotSearchResults = response['content']
        this.cdr.detectChanges()
        console.log(this.spotSearchResults)
      },
      error: (response : HttpErrorResponse) => {
        this.toastr.error(response.message)
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
