import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleLogin } from '@react-oauth/google';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../controller/services/auth.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerCredentialsForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerCredentialsForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    console.log(this.authService.googleClientId)
    window.google.accounts.id.initialize({
      client_id: this.authService.googleClientId,
      callback: (credentialResponse : any) => {
        this.authService.handleGoogleSignInSuccess(credentialResponse);
      }
    });
  }

  signInWithGoogleCustom(): void {
    console.log(this.authService.googleClientId)
    window.google.accounts.id.prompt();
  }

}
