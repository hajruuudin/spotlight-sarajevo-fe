import { ChangeDetectorRef, Component, computed } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { SortOptions } from '../../../utils/enums/SortOptions';
import { EventService } from '../../../services/event-service';
import { PageResponseModel } from '../../../models/shared.model';

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
  protected lang!: string
  protected sub!: Subscription
  protected eventSearchForm: FormGroup
  protected eventCategories: EventCategoryModel[] = []
  protected sortingMethods: string[] = [
    SortOptions.ALPHABETICAL.toString(),
    SortOptions.DATE.toString()
  ]

  protected selectedCategoryIds: number[] = []
  protected selectedSortingMethod: string = SortOptions.ALPHABETICAL.toString()

  protected isFilterPopupLoaded: boolean = false
  protected isSortingPopupLoaded: boolean = false

  protected pageNumber: number = 0
  protected pageSize: number = 4
  protected totalElements: number = 0
  protected totalPages: number = 0
  
  protected eventSearchResults: EventShorthandModel[] = []

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
    //====== COMMON NON-OBJECT SERVICES =====//
    public session: SessionService,
    private fb: FormBuilder,
    private spinner: SpinnerService,
    private toastr: HotToastService,
    private cdr: ChangeDetectorRef
  ){
    this.eventSearchForm = this.fb.group({
      'searchTerm' : ['', Validators.required],
      'sortOption' : ['', Validators.required]
    })
  }

  protected isSectionLoading = computed(() => this.spinner.loadingSection())

  getCurrentLanguage() : string {
    return this.session.getStoredLanguage()
  }

  ngOnInit(): void {
    this.sub = this.session.language.subscribe(lang => {
      this.lang = lang;
    });

    this.categoryService.getAllEventCategories().subscribe({
      next: (response : EventCategoryModel[]) => {
        this.eventCategories = response
        this.cdr.detectChanges()
      },
      error: (error : HttpErrorResponse) => {
        // probably redirect to error
      }
    })

    this.fetchEvents(this.pageNumber, this.pageSize, '', this.selectedSortingMethod, this.selectedCategoryIds, true, false)
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

  fetchEvents(pageNumber: number, pageSize: number, searchTerm: string, sortOption: string, categoryIds: number[], resetPages: boolean, extendResultSet: boolean){
    if(resetPages){
      pageNumber = 0
    }

    this.spinner.showSectionSpinner()
    this.eventService.findEventsPaginated(pageNumber, pageSize, searchTerm, sortOption, categoryIds).subscribe({
      next: (response : PageResponseModel<EventShorthandModel>) => {
        this.spinner.hideSectionSpinner()

        if(extendResultSet){
          this.eventSearchResults = this.eventSearchResults.concat(response.content)
        } else {
          this.eventSearchResults = response.content
        }

        if(resetPages){
          this.totalElements = response.totalElements
          this.totalPages = response.totalPages
          this.pageNumber = 0
        }

        this.cdr.detectChanges()
      }
    })
  }

  loadMore(){
    if(this.totalElements <= (this.pageNumber + 1 * this.pageSize)){
      return;
    }
    this.pageNumber++
    this.fetchEvents(this.pageNumber, this.pageSize, this.eventSearchForm.get('searchTerm')?.value, this.selectedSortingMethod, this.selectedCategoryIds, false, true)
  }
}
