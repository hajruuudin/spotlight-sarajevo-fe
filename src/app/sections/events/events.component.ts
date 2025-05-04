import { Component } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventShorthand } from '../../models/event-model';
import { CategoryModel } from '../../models/category-model';
import { EventService } from '../../services/event.service';
import { CategoryService } from '../../services/category.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";
import { SpotSearchComponent } from "../../components/spot-search/spot-search.component";
import { EventSearchComponent } from "../../components/event-search/event-search.component";
import { NgFor, NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotFoundComponent } from "../../components/not-found/not-found.component";

@Component({
  selector: 'app-events',
  imports: [NgFor, NgIf, HeadingComponent, ReactiveFormsModule, SearchBarComponent, MatSelectModule, MatFormFieldModule, ButtonRegularComponent, EventSearchComponent, NotFoundComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
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
export class EventsComponent {
  searchForm : FormGroup;
  filterForm : FormGroup;
  currentSearchTerm : string = '';

  pageNumber : number = 0;
  pageSize : number = 5;
  totalElements : number = 100;

  searchResult: EventShorthand[] = [];

  sortOptions : string[] = ["alphabetical", "date"]
  categories : CategoryModel[] = []

  constructor(
    private formBuilder : FormBuilder,
    private eventService : EventService,
    private categoryService: CategoryService,
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
    this.eventService.getEventsShorthand('', '', [], this.pageNumber, this.pageSize).subscribe({
      next: (response : any) => {
        this.searchResult = response['content'] as EventShorthand[]
        this.totalElements = response['totalElements']
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
  
    this.eventService.getEventsShorthand(searchTerm, this.filterForm.get('sortOptions')?.value, categoryIds, this.pageNumber, this.pageSize).subscribe({
      next: (response : any) => {
        this.searchResult = response['content'] as EventShorthand[]
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
    this.eventService.getEventsShorthand(this.currentSearchTerm, this.filterForm.get('sortOptions')?.value, this.getSelectedCategoryIds(), this.pageNumber, this.pageSize).subscribe({
      next: (response : any) => {
        this.searchResult = this.searchResult.concat(response['content'] as EventShorthand[])
      },
      error: (error : Error) => {
        console.error(error)
      }
    })
  }
}
