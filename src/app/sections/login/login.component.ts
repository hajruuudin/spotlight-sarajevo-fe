import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SystemLogin } from '../../models/system-login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.initializeGoogleLogIn()
  }

  logInWithGoogleCustom(): void {
    this.spinner.show()
    window.google.accounts.id.prompt();
  }

  logInWithSystem(): void {
    if (this.loginForm.valid) {
      this.spinner.show()
      this.authService.handleSystemLogIn(
        new SystemLogin(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
      )).subscribe(
        response => {
          this.spinner.hide()
          this.router.navigate(['/homepage'])
        },
        error => {
          this.spinner.hide()
          this.toastr.error(error.error.message, "Error")
          console.error('Error logging in to backend', error)
        }
      )
    } else {
      this.toastr.error('Credentials Missing!', 'Error')
    }
  }

  initializeGoogleLogIn(): void {
    window.google.accounts.id.initialize({      
      client_id: this.authService.googleClientId,
      callback: (credentialResponse : any) => {
        const idToken = credentialResponse?.credential;
        if (idToken) {
          this.authService.sendIdTokenToBackendLogin(idToken).subscribe(
            (response : any) => {
              this.spinner.hide()
              this.router.navigate(['/homepage'])
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

}
