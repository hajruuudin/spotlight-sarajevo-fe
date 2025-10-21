import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../services/spinner-service';
import { CategoryService } from '../../../services/category-service';
import { EventCategoryModel, SpotCategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  host: {
    class: "dark:bg-(--primary-200) bg-(--primary-700) rounded-2xl w-3/5 max-w-5xl h-auto hover:outline-4 dark:hover:outline-(--primary-600) hover:outline-(--primary-600) transition-all flex flex-col jusitfy-center items-center space-y-2 px-12 py-4 shadow-xl"
  }
})
export class Signup implements OnInit{
  protected progressBarWidth: String = 'w-1/5'
  protected isCredentialsSectionLoaded: Boolean = true;
  protected isSpotCategoriesSectionLoaded: Boolean = false;
  protected isEventCategoriesSectionLoaded: Boolean = false;
  protected isSurveySectionLoaded: Boolean = false;
  protected isCompleteSectionLoaded: Boolean = false;

  protected systemCredentialsForm!: FormGroup;

  protected allSpotCategories: SpotCategoryModel[] = [];
  protected allEventCategories: EventCategoryModel[] = [];
  protected selectedSpotCategories: SpotCategoryModel[] = [];
  protected selectedEventCategories: EventCategoryModel[] = [];

  constructor(
    private categoryService: CategoryService,
    private spinner: SpinnerService,
    private toastr: HotToastService
  ){}

  ngOnInit(): void {
    this.categoryService.getAllSpotCategories().subscribe({
      next: (response : SpotCategoryModel[]) => {
        this.allSpotCategories = response;
      }
    })

    this.categoryService.getAllEventCategories().subscribe({
      next: (response : EventCategoryModel[]) => {
        this.allEventCategories = response;
      }
    })
  }
}
