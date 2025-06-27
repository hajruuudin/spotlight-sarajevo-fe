import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpotShorthand } from '../../models/spot-model';
import { SpotService } from '../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpotSearchComponent } from "../../components/spot-search/spot-search.component";
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { Title } from '@angular/platform-browser';
import { SpotDataService } from '../../services/spot-data.service';
import { Router } from '@angular/router';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";

@Component({
  selector: 'app-spots',
  imports: [NgFor, NgIf, HeadingComponent, SearchBarComponent, ReactiveFormsModule, SpotSearchComponent, MatSelectModule, MatFormFieldModule, ButtonRegularComponent, NotFoundComponent, ButtonPrimaryComponent],
  templateUrl: './spots.component.html',
  styleUrl: './spots.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ]),

    trigger('fadeInOutComponents', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('50ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('50ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SpotsComponent implements OnInit{
  searchForm : FormGroup;
  filterForm : FormGroup;
  currentSearchTerm : string = '';

  pageNumber : number = 0;
  pageSize : number = 5;
  totalElements : number = 100;

  searchResult: SpotShorthand[] = [];

  sortOptions : string[] = ["alphabetical", "rating", "popularity"]
  categories : CategoryModel[] = []

  constructor(
    private formBuilder : FormBuilder,
    private spotService : SpotService,
    private spotDataService: SpotDataService,
    private categoryService: CategoryService,
    private titleService: Title,
    private router: Router,
    private toastr : HotToastService
  )
  {
    this.searchForm = this.formBuilder.group({})
    this.filterForm = this.formBuilder.group({
      "sortOptions": [''],
      "categoryOptions" : ['']
    })
  }

  ngOnInit(): void {
    this.spotService.getSpotShorthands('', '', [], this.pageNumber, this.pageSize).subscribe({
      next: (response : any) => {
        this.searchResult = response['content'] as SpotShorthand[]
        this.totalElements = response['totalElements']
        this.titleService.setTitle("Search Spots")
      },
      error: (error : Error) => {
        console.error(error)
        this.toastr.error('Search error! Try again later.')
      }
    })

    this.categoryService.fetchCategories().subscribe({
      next: (response : any) => {
        this.categories = response['content'] as CategoryModel[]
      },
      error: (error : Error) => {
        console.error(error)
      }
    })
  }

  onSearchSubmit(searchTerm: string) {
    this.pageNumber = 0;
    this.currentSearchTerm = searchTerm;

    let categoryIds = this.getSelectedCategoryIds()
  
    this.spotService.getSpotShorthands(searchTerm, this.filterForm.get('sortOptions')?.value, categoryIds, this.pageNumber, this.pageSize).subscribe({
      next: (response : any) => {
        this.searchResult = response['content'] as SpotShorthand[]
        this.totalElements = response['totalElements']
      },
      error: (error : Error) => {
        console.error(error)
      }
    })
  }

  onCategoryCheckboxChange(event: any): void {
    const categoryId = parseInt(event.target.value, 10);
    const isChecked = event.target.checked;
    const categoryOptionsControl = this.filterForm.get('categoryOptions');
    let currentCategories = categoryOptionsControl?.value as number[];

    if (isChecked) {
      currentCategories = [...currentCategories, categoryId];
    } else {
      currentCategories = currentCategories.filter(id => id !== categoryId);
    }

    categoryOptionsControl?.setValue(currentCategories);
  }

  getSelectedCategoryIds(): number[] {
    return this.filterForm.get('categoryOptions')?.value || [];
  }

  onLoadMoreClick(){
    this.pageNumber++
    this.spotService.getSpotShorthands(this.currentSearchTerm, this.filterForm.get('sortOptions')?.value, this.getSelectedCategoryIds(), this.pageNumber, this.pageSize).subscribe({
      next: (response : any) => {
        this.searchResult = this.searchResult.concat(response['content'] as SpotShorthand[])
      },
      error: (error : Error) => {
        console.error(error)
      }
    })
  }

   navigateToSpotOverview(spotSlug: string) {
    this.spotDataService.fetchAndSetSpotOverview(spotSlug).subscribe({
      next: (response : any) => {
        this.router.navigate([`spot/${spotSlug}`])
      }
    })
  };

  navigateToMapOverview(){
    this.router.navigate(['map-view'])
  }
}
