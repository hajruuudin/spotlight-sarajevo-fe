import { ChangeDetectorRef, Component, computed, OnInit } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { SearchBar } from '../../../components/search-bar/search-bar';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../../core/services/session.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CategoryService } from '../../../services/category.service';
import { SpotCategoryModel } from '../../../shared/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryFilterSelector } from '../../../components/category-filter-selector/category-filter-selector';
import { ButtonSecondary } from '../../../components/button-secondary/button-secondary';
import { SortingSelector } from '../../../components/sorting-selector/sorting-selector';
import { SpotShorthandModel } from '../../../shared/models/spot.model';
import { SearchSpotCard } from '../../../components/search-spot-card/search-spot-card';
import { SortOptions } from '../../../shared/constants/SortOptions';
import { SpotService } from '../../../services/spot.service';
import { Subscription } from 'rxjs';
import { SpinnerSmallComponent } from '../../../components/spinner-small-component/spinner-small-component';
import { PageResponseModel } from '../../../shared/models/shared.model';
import { NotFoundComponent } from '../../../components/not-found-component/not-found-component';

@Component({
  selector: 'app-spot-search',
  imports: [
    PageHeader,
    SearchBar,
    TranslocoPipe,
    ReactiveFormsModule,
    CategoryFilterSelector,
    ButtonSecondary,
    SortingSelector,
    SearchSpotCard,
    SpinnerSmallComponent,
    NotFoundComponent,
  ],
  templateUrl: './spot-search.html',
  styleUrl: './spot-search.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class SpotSearch implements OnInit {
  protected lang: String = 'en';
  protected sub!: Subscription;
  protected spotSearchForm: FormGroup;
  protected spotCategories: SpotCategoryModel[] = [];
  protected sortingMethods: string[] = [
    SortOptions.ALPHABETICAL.toString(),
    SortOptions.RATING.toString(),
  ];

  protected selectedCategoryIds: number[] = [];
  protected selectedSortingMethod: string = SortOptions.ALPHABETICAL.toString();

  protected isFilterPopupLoaded: boolean = false;
  protected isSortingPopupLoaded: boolean = false;

  protected pageNumber: number = 0;
  protected pageSize: number = 4;
  protected totalElements: number = 0;
  protected totalPages: number = 0;

  protected spotSearchResults: SpotShorthandModel[] = [];

  constructor(
    private categoryService: CategoryService,
    private spotService: SpotService,
    //====== COMMON SERVICES =====//
    private session: SessionService,
    private fb: FormBuilder,
    private spinner: SpinnerService,
    private toastr: HotToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.spotSearchForm = this.fb.group({
      searchTerm: ['', Validators.required],
      sortOption: ['', Validators.required],
    });
  }

  protected isSectionLoading = computed(() => this.spinner.loadingSection());

  getCurrentLanguage(): string {
    return this.session.getStoredLanguage();
  }

  ngOnInit(): void {
    this.sub = this.session.language.subscribe((lang) => {
      this.lang = lang;
    });

    this.categoryService.getAllSpotCategories().subscribe({
      next: (response: SpotCategoryModel[]) => {
        this.spotCategories = response;
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {},
    });

    this.spinner.showSectionSpinner();
    this.fetchSpots(
      this.pageNumber,
      this.pageSize,
      '',
      this.selectedSortingMethod,
      this.selectedCategoryIds,
      true,
      false
    );
  }

  onSearchTriggered() {
    this.fetchSpots(
      this.pageNumber,
      this.pageSize,
      this.spotSearchForm.get('searchTerm')?.value,
      this.selectedSortingMethod,
      this.selectedCategoryIds,
      true,
      false
    );
  }

  onCategoryCheckboxChange(categoryID: number) {
    const index = this.selectedCategoryIds.indexOf(categoryID);

    if (index === -1) {
      this.selectedCategoryIds.push(categoryID);
    } else {
      this.selectedCategoryIds.splice(index, 1);
    }
  }

  toggleFilterPopup() {
    this.isFilterPopupLoaded = !this.isFilterPopupLoaded;
  }

  toggleSortingPopup() {
    this.isSortingPopupLoaded = !this.isSortingPopupLoaded;
  }

  resetCategoryFilters() {
    this.selectedCategoryIds = [];
    this.fetchSpots(
      this.pageNumber,
      this.pageSize,
      this.spotSearchForm.get('searchTerm')?.value,
      this.selectedSortingMethod,
      this.selectedCategoryIds,
      true,
      false
    );
  }

  resetSortingFilters() {
    this.selectedSortingMethod = SortOptions.ALPHABETICAL.toString();
    this.fetchSpots(
      this.pageNumber,
      this.pageSize,
      this.spotSearchForm.get('searchTerm')?.value,
      this.selectedSortingMethod,
      this.selectedCategoryIds,
      true,
      false
    );
  }

  fetchSpots(
    pageNumber: number,
    pageSize: number,
    searchValue: string,
    sortingMethod: string,
    categoryIds: number[],
    resetPages: boolean,
    extendResultSet: boolean
  ) {
    if (resetPages) {
      pageNumber = 0;
    }

    this.spinner.showSectionSpinner();
    this.spotService
      .findSpotsPaginated(pageNumber, pageSize, searchValue, sortingMethod, categoryIds)
      .subscribe({
        next: (response: PageResponseModel<SpotShorthandModel>) => {
          this.spinner.hideSectionSpinner();

          if (extendResultSet) {
            this.spotSearchResults = this.spotSearchResults.concat(response.content);
          } else {
            this.spotSearchResults = response.content;
          }

          if (resetPages) {
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
            this.pageNumber = 0;
          }

          this.cdr.detectChanges();
        },
      });
  }

  loadMore() {
    if (this.totalElements <= this.pageNumber + 1 * this.pageSize) {
      return;
    }
    this.pageNumber++;
    this.fetchSpots(
      this.pageNumber,
      this.pageSize,
      this.spotSearchForm.get('searchTerm')?.value,
      this.selectedSortingMethod,
      this.selectedCategoryIds,
      false,
      true
    );
  }
}
