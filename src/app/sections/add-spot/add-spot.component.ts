import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgFor, UpperCasePipe } from '@angular/common';
import { TagService } from '../../services/tag.service';
import { SpotService } from '../../services/spot.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-spot',
  imports: [NgFor, HeadingComponent, ReactiveFormsModule, NgMultiSelectDropDownModule, UpperCasePipe],
  templateUrl: './add-spot.component.html',
  styleUrl: './add-spot.component.css'
})
export class AddSpotComponent implements OnInit {
  protected addForm: FormGroup
  protected days: string[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];
  protected tagDropdownSettings = {
    singleSelection: false,
    idField: 'tagId',
    textField: 'tagName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    limitSelection: 5
  }
  protected tagDropdownAllItems: { tagId: number, tagName: string }[] = []
  protected tagDropdownSelectedItems: { tagId: number; tagName: string }[] = [];
  protected categorySelectItems: any = {}

  constructor(
    private tagService: TagService,
    private categoryService: CategoryService,
    private spotService: SpotService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      id: ['', Validators.required],
      slug: ['', Validators.required],
      officialName: ['', Validators.required],
      smallDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      tags: [[], Validators.required],

      // Work hours — optional
      mondayStartTime: [''],
      mondayEndTime: [''],
      tuesdayStartTime: [''],
      tuesdayEndTime: [''],
      wednesdayStartTime: [''],
      wednesdayEndTime: [''],
      thursdayStartTime: [''],
      thursdayEndTime: [''],
      fridayStartTime: [''],
      fridayEndTime: [''],
      saturdayStartTime: [''],
      saturdayEndTime: [''],
      sundayStartTime: [''],
      sundayEndTime: [''],

      // Ratings — required
      overallQuality: ['', Validators.required],
      atmosphere: ['', Validators.required],
      staffKindness: ['', Validators.required],
      cleanliness: ['', Validators.required],
      affordability: ['', Validators.required],
      accessibility: ['', Validators.required],

      // Location — required
      address: ['', Validators.required],
      lat: ['', Validators.required],
      lon: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.tagService.fetchData().subscribe({
      next: (response: any) => {
        let tagArray = response['content']
        tagArray.forEach((tag: any) => {
          this.tagDropdownAllItems.push({
            tagId: tag.id,
            tagName: tag.tagName
          })
        });
      }
    })

    this.categoryService.fetchCategories().subscribe({
      next: (response: any) => {
        this.categorySelectItems = response['content']
      }
    })
  }

  onItemSelect(item: any) {

  }

  onItemDeSelect(item: any) {

  }

  onItemSave(formData: any) {

  }

  labelWorkDayAsClosed(workDay: string) {
    const startControlName = `${workDay}StartTime`;
    const endControlName = `${workDay}EndTime`;

    this.addForm.patchValue({
      [startControlName]: '',
      [endControlName]: ''
    });
  }

}
