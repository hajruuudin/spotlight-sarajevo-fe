import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpotShorthand } from '../../models/spot-model';
import { SpotService } from '../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpotSearchComponent } from "../../components/spot-search/spot-search.component";
import { NgFor } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-spots',
  imports: [NgFor, HeadingComponent, SearchBarComponent, ReactiveFormsModule, SpotSearchComponent],
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
  ],
})
export class SpotsComponent implements OnInit{
  searchForm : FormGroup;
  filterForm : FormGroup;
  searchResult: SpotShorthand[] = [];

  categories : CategoryModel[] = []
  sortOptions : string[] = ["Alphabetical", "Rating", "Popularity"]

  constructor(
    private formBuilder : FormBuilder,
    private spotService : SpotService,
    private categoryService: CategoryService,
    private toastr : HotToastService
  )
  {
    this.searchForm = this.formBuilder.group({})
    this.filterForm = this.formBuilder.group({
      "sort-options": [''],
      "category-options" : ['']
    })
  }

  ngOnInit(): void {
    this.spotService.getAllSpots().subscribe({
      next: (response : any) => {
        this.searchResult = response['content'] as SpotShorthand[]
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

  onSearchInputChange(searchTerm: string) {
    console.log('Search input changed:', searchTerm);
    // Perform filtering or other actions based on the input
    // this.filterResults(searchTerm);
  }

  onSearchSubmit(searchTerm: string) {
    console.log('Search submitted:', searchTerm);
    // Perform the actual search action (e.g., API call)
    // this.performSearch(searchTerm);
  }
}
