import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../services/spinner-service';
import { CategoryService } from '../../../services/category-service';
import { EventCategoryModel, SpotCategoryModel } from '../../../models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { TextInput } from "../../../components/text-input/text-input";
import { ButtonRegular } from "../../../components/button-regular/button-regular";
import { RouterLink } from "@angular/router";
import { CategorySelector } from '../../../components/category-selector/category-selector';
import { QuestionComponent } from "../../../components/question-component/question-component";
import { TranslocoPipe } from '@ngneat/transloco';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-signup',
  imports: [NgClass, ReactiveFormsModule, TextInput, ButtonRegular, RouterLink, CategorySelector, QuestionComponent, TranslocoPipe],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  host: {
    class: "dark:bg-(--primary-200) bg-(--primary-700) md:rounded-2xl md:w-3/5 w-full max-w-5xl h-full md:h-auto md:max-h-6/7 hover:outline-4 dark:hover:outline-(--primary-600) hover:outline-(--primary-600) transition-all flex flex-col justify-start items-center space-y-2 shadow-xl relative overflow-auto"
  }
})
export class Signup implements OnInit{
  protected progressBarWidth: String = 'w-1/5'
  protected isCredentialsSectionLoaded: Boolean = false;
  protected isSpotCategoriesSectionLoaded: Boolean = false;
  protected isEventCategoriesSectionLoaded: Boolean = false;
  protected isSurveySectionLoaded: Boolean = false;
  protected isCompleteSectionLoaded: Boolean = true;

  protected systemCredentialsForm!: FormGroup;

  protected allSpotCategories: SpotCategoryModel[] = [];
  protected allEventCategories: EventCategoryModel[] = [];
  protected selectedSpotCategories: number[] = [];
  protected selectedEventCategories: number[] = [];

  protected questions = [
    {
      id: 1,
      questionEn: "Have you visited Sarajevo's historical sites and iconic landmarks, focusing on exploring the hsitorical aspect of Sarajevo? (1/4)",
      questionBa: "Da li ste posjetili Sarajevsku kulturnu baštinu i ikonične historijske tačke te kultna, poznata mjesta? (1/4)",
      isASelected: false,
      isBSelected: false
    },
    {
      id: 2,
      questionEn: "Are you interested in exploring less popular spots instead of commonly accessed and vanilla-esque places? (2/4)",
      questionBa: "Da li ste zainteresovani u istraživanju i posjećivanju manje poznatih mjesta i lokala u sarajevu umjesto popularnih 'standardica'? (2/4)",
      isASelected: false,
      isBSelected: false
    },
    {
      id: 3,
      questionEn: "Do you enjoy loud and open audience events, like concerts, pubs, clubs and events which orientate around live performances and energy? (3/4)",
      questionBa: "Da li volite bučnu atmosferu, otvorene događaje i energične lokale kao što su pabovi, klubovi i muzika uživo? (3/4)",
      isASelected: false,
      isBSelected: false
    },
    {
      id: 4,
      questionEn: "Are you intereseted in attending educational and community events to improve Your social-educative status and learn/explore various topics? (4/4)",
      questionBa: "Da li ste zainteresovani u učestvovanju u raznim edukacionim, humanitarnim i socijalnim događajima u cilju poboljšanja Vašeg znanja i vještina u raznim tematikama? (4/4)",
      isASelected: false,
      isBSelected: false
    }
  ]

  protected registeredFirstName: String = "Hajrudin"
  protected currentCategoryDescription: String = ''

  constructor(
    private categoryService: CategoryService,
    public lang: LanguageService,
    private fb: FormBuilder,
    private spinner: SpinnerService,
    private toastr: HotToastService
  ){}

  ngOnInit(): void {
    this.systemCredentialsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })

    this.categoryService.getAllSpotCategories().subscribe({
      next: (response : SpotCategoryModel[]) => {
        this.allSpotCategories = response;
      },
      error: (response : HttpErrorResponse) => {
        console.error(response.message)
      }
    })

    this.categoryService.getAllEventCategories().subscribe({
      next: (response : EventCategoryModel[]) => {
        this.allEventCategories = response;
      },
      error: (response : HttpErrorResponse) => {
        console.error(response.message)
      }
    })
  }

  onCategoryHover(description: String): void {
    this.currentCategoryDescription = description;
  }


  updateCategoryDescription(newDescription: string){
    this.currentCategoryDescription = newDescription
  }

  resetCategoryDescription(){
    this.currentCategoryDescription = 'Hover over a cateogry to see its description!'
  }

  addCategoryToSelected(categoryType: boolean, categoryId: number) {
    let selectedArray = categoryType ? this.selectedSpotCategories : this.selectedEventCategories;

    if (selectedArray.includes(categoryId)) {
      if (categoryType) {
        this.selectedSpotCategories = this.selectedSpotCategories.filter(id => id !== categoryId);
      } else {
        this.selectedEventCategories = this.selectedEventCategories.filter(id => id !== categoryId);
      }
      return;
    }

    if (selectedArray.length < 3) {
      if (categoryType) {
        this.selectedSpotCategories = [...this.selectedSpotCategories, categoryId];
      } else {
        this.selectedEventCategories = [...this.selectedEventCategories, categoryId];
      }
    } else {
      this.toastr.error("You've already selected three categories!");
    }
  }

   questionASelected(q : any, value : boolean){
    let newQuestions = this.questions.map(question => {
      if(question.id === q.id){
        return {...question, isASelected: value}
      } else {
        return question
      }
    })

    this.questions = newQuestions
    console.log(this.questions)
  }

  questionBSelected(q : any, value : boolean){
    let newQuestions = this.questions.map(question => {
      if(question.id === q.id){
        return {...question, isBSelected: value}
      } else {
        return question
      }
    })

    this.questions = newQuestions
    console.log(this.questions)
  }

  verifyQuestionsSelected(){
    let check = true;

    this.questions.forEach(question => {
      if(!question.isASelected && !question.isBSelected ){
        check = false;
      }
    })

    return check;
  }

  getQuestionAnswer(question : any){
    if(question.isASelected){
      return true;
    } else {
      return false;
    }
  }

}

