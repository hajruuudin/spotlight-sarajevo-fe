import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgFor, NgIf } from '@angular/common';
import { SmallcategorylabelComponent } from '../../components/small-category-label/smallcategorylabel.component';
import { CategoryService } from '../../services/category.service';
import { QuestionComponentComponent } from "../../components/question-component/question-component.component";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreferencesModel } from '../../models/preferences.model';
import { SystemUserModel } from '../../models/system-user.model';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-register',
  imports: [NgIf, NgFor, ReactiveFormsModule, NgxSpinnerModule, SmallcategorylabelComponent, QuestionComponentComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  credentialsSection : Boolean = true;
  categoriesSection : Boolean = false;
  questionsSection : Boolean = false;
  successSection : Boolean = false;
  registerCredentialsForm! : FormGroup;
  addedFirstName : string = "";

  progressBar : String = "w-0";
  progressLabel : String = "Register";
  categories : any = [];
  categoriesSelected : string[] = [];
  maxSelectedCategories = 3;

  questions = [
    {
      id: 1,
      question: "Have you visited Sarajevo's historical sites before?",
      isASelected: false,
      isBSelected: false
    },
    {
      id: 2,
      question: "Are you interested in exploring less popular spots?",
      isASelected: false,
      isBSelected: false
    },
    {
      id: 3,
      question: "Do you enjoy loud and open audience events, like concerts, pubs, clubs?",
      isASelected: false,
      isBSelected: false
    },
    {
      id: 4,
      question: "Are you intereseted in attending educational and community events?",
      isASelected: false,
      isBSelected: false
    }
  ]

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private toastr : ToastrService
  ) {}

  ngOnInit(){
    this.registerCredentialsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });
    this.progressBar = "w-1/4"
    this.initializeGoogleSignIn();
      this.categoryService.fetchCategories().subscribe(
        response => {
          console.log(response)
          this.categories = response
        },
        error => {
          console.error(error)
        }
      )
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.controls['password'].value;
    const repeatPassword = group.controls['repeatPassword'].value;

    return password === repeatPassword ? null : { notSame: true };
  }

  onSystemCredentialSubmit() {
    if (this.registerCredentialsForm.valid) {
      const password = this.registerCredentialsForm.get('password')?.value;
      const repeatPassword = this.registerCredentialsForm.get('repeatPassword')?.value;

      if (password.length < 6) {
        this.toastr.error('Password must be longer than 6 characters.', 'Validation Error');
        return;
      }

      if (!/[A-Z]/.test(password)) {
        this.toastr.error('Password must contain at least one uppercase letter.', 'Validation Error');
        return;
      }

      if (password !== repeatPassword) {
        this.toastr.error('Passwords do not match.', 'Validation Error');
        return;
      }

      console.log('Form submitted:', this.registerCredentialsForm.value);
      let systemUser = new SystemUserModel(
        this.registerCredentialsForm.get('firstName')?.value,
        this.registerCredentialsForm.get('lastName')?.value,
        this.registerCredentialsForm.get('email')?.value,
        this.registerCredentialsForm.get('password')?.value
      )

      this.authService.checkEmailTaken(this.registerCredentialsForm.get('email')?.value).subscribe(
        response => {
          if(response){
            this.authService.handleSystemSignIn(systemUser).subscribe(
              (response : any) => {
               console.log(response)
               this.addedFirstName = response['payload']['firstName']
               this.moveToCategoriesSection()
              },
              error => {
               console.error(error)
               this.toastr.error("Error occured with system register", "Error")
              }
             )
          }
        },
        error => {
          this.toastr.error("Email already associated with an account", "Oops!")
        }
      )
    } 
  }


  signInWithGoogleCustom(): void {
    console.log(this.authService.googleClientId)
    this.spinner.show()
    window.google.accounts.id.prompt();
  }

  initializeGoogleSignIn(): void {
    console.log(this.authService.googleClientId)
    window.google.accounts.id.initialize({      
      client_id: this.authService.googleClientId,
      callback: (credentialResponse : any) => {
        const idToken = credentialResponse?.credential;
        if (idToken) {
          this.authService.sendIdTokenToBackend(idToken).subscribe(
            (response : any) => {
              console.log('ID token sent and temporarily stored on backend', response);
              this.spinner.hide()
              this.moveToCategoriesSection()
              this.addedFirstName = response['firstName']
            },
            (error) => {
              this.spinner.hide()
              this.toastr.error(error.error.message, "Error")
            }
          );
        } else {
          console.error('No ID token received.');
        }
      }
    });
  }

  onCategorySelected(isSelected: boolean, categoryName: string) {
    if (isSelected) {
      if (this.categoriesSelected.length < this.maxSelectedCategories && !this.categoriesSelected.includes(categoryName)) {
        this.categoriesSelected.push(categoryName);
      } 
    } else {
      const index = this.categoriesSelected.indexOf(categoryName);
      if (index > -1) {
        this.categoriesSelected.splice(index, 1);
      }
    }
    console.log('Selected Categories:', this.categoriesSelected);
  }

  isCategorySelected(categoryName: string): boolean {
    return this.categoriesSelected.includes(categoryName);
  }

  moveToCategoriesSection(){
    this.categoriesSection = true;
    this.credentialsSection = false;
    this.progressBar = "w-2/4"
    this.progressLabel = "Categories"
  }

  moveToQuestionsSection(){
    if(this.categoriesSelected.length < this.maxSelectedCategories){
      this.toastr.error('Please select at least 3 categories!', 'Hold up!', {
        tapToDismiss: true,
        positionClass: 'toast-top-left',
        progressBar: true,
        progressAnimation: 'decreasing',
        timeOut: 2000
      });
      return;
    }
    this.categoriesSection = false;
    this.questionsSection = true;
    this.progressBar = "w-3/4"
    this.progressLabel = "Information"
  }

  moveToSuccessSection(){
    this.spinner.show()
    if(!this.verifyQuestionsSelected()){
      this.toastr.error('Please answer all of the questions!', 'Hold up!', {
        tapToDismiss: true,
        positionClass: 'toast-top-left',
        progressBar: true,
        progressAnimation: 'decreasing',
        timeOut: 2000
      });
      return;
    } else {
      let request = new PreferencesModel(
        this.getQuestionAnswer(this.questions[0]),
        this.getQuestionAnswer(this.questions[1]),
        this.getQuestionAnswer(this.questions[2]),
        this.getQuestionAnswer(this.questions[3]),
        "ENGLISH",
        this.categories[0]['id'],
        this.categories[1]['id'],
        this.categories[2]['id']
      )
    
      this.authService.registerWithSurveyData(request).subscribe(
        response => {
          this.spinner.hide()
          this.questionsSection = false;
          this.successSection = true;
          this.progressBar = "w-full"
          this.progressLabel = "Success"
        },
        error => {
          // OVDE TREBA BIT ERROR SECTION :()
        }
      )
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


  // onYesSelected(value: boolean) {
  //   if (value) {
  //     this.isYesSelected = true;
  //     this.isNoSelected = false;
  //   } else {
  //     this.isYesSelected = false;
  //   }
  // }

  // onNoSelected(value: boolean) {
  //   if (value) {
  //     this.isNoSelected = true;
  //     this.isYesSelected = false;
  //   } else {
  //     this.isNoSelected = false;
  //   }
  // }

  get progressBarWidth(){
    return this.progressBar;
  }

  get progressBarLabel(){
    return this.progressLabel;
  }
}
