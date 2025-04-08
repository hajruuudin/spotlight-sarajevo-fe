import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../controller/services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgFor, NgIf } from '@angular/common';
import { SmallcategorylabelComponent } from '../../components/smallcategorylabel/smallcategorylabel.component';
import { CategoryService } from '../../controller/services/category.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-register',
  imports: [NgIf, NgFor, ReactiveFormsModule, NgxSpinnerModule, SmallcategorylabelComponent],
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

  categories : any = [];

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit(){
    this.registerCredentialsForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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
              this.categoriesSection = true;
              this.credentialsSection = false;
              this.addedFirstName = response['firstName']
            },
            (error) => {
              console.error('Error sending ID token to backend', error)
            }
          );
        } else {
          console.error('No ID token received.');
        }
      }
    });
  }
}
