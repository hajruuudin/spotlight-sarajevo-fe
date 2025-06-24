import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagService } from '../../services/tag.service';
import { CategoryService } from '../../services/category.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-event',
  imports: [NgFor, HeadingComponent, ReactiveFormsModule, NgMultiSelectDropDownModule, ButtonPrimaryComponent],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit{
  protected addForm: FormGroup
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
    private fb: FormBuilder,
    private toastr: HotToastService,
    private spinner: NgxSpinnerService
  ){
    this.addForm = this.fb.group({
      slug: ['', Validators.required],
      officialName: ['', Validators.required],
      smallDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      tags: [[], Validators.required],

      // Date and time
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      locationDescription: ['', Validators.required],
      address: ['', Validators.required],

      // Event specific data
      entryPrice: [''],
      ageLimit: [''],
      reservation: [''],
      cancelRefund: [''],
      openStatus: [''],
      eventLanguage: [''],
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

  onItemSave() {
    if(!this.addForm.valid){
      this.toastr.warning('All fields except event details need to be filled!')
    } else {
      console.log(this.addForm)
    }
  }
}
