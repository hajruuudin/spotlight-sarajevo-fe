import { Component, OnInit } from '@angular/core';
import { TextInput } from "../../../components/text-input/text-input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { LoginModel } from '../../../models/auth.model';
import { ButtonRegular } from "../../../components/button-regular/button-regular";
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../services/spinner-service';
import { RouterLink } from "@angular/router";
import { LanguageService } from '../../../services/language-service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  imports: [TextInput, ReactiveFormsModule, ButtonRegular, RouterLink, TranslocoPipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: {
    class: "dark:bg-(--primary-200) bg-(--primary-700) md:rounded-2xl w-full md:w-3/5 xl:w-2/5 max-w-5xl h-full md:h-auto hover:outline-4 dark:hover:outline-(--primary-600) hover:outline-(--primary-600) transition-all flex flex-col jusitfy-center items-center space-y-2 px-12 py-4 shadow-xl"
  }
})
export class Login implements OnInit{
  protected loginForm! : FormGroup;

  constructor(
    public lang: LanguageService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private spinner: SpinnerService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onFormSubmit(){
    if(!this.loginForm.valid){
      this.toast.error("Email and password are required!")
    } else {
      this.spinner.show();
      const loginObject = new LoginModel(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      
      console.log(loginObject)
    }
  }
}
