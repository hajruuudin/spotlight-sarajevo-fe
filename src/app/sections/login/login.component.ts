import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SystemLogin } from '../../models/system-login.model';
import { SessionService } from '../../services/session.service';
import { LoggedUserProfile } from '../../models/user-model';
import { HotToastService } from '@ngxpert/hot-toast';
import { Title } from '@angular/platform-browser';

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
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: HotToastService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.initializeGoogleLogIn()
    this.titleService.setTitle('Login - Spotlight Sarajevo')
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
      )).subscribe({
        next: (response : any) => {
          this.spinner.hide()

          const loggedUserProfile: LoggedUserProfile = {
            id: response.user.id,
            firstName:  response.user.firstName,
            lastName: response.user.lastName,
            email: response.user.systemEmail,
            isAdmin: response.user.isAdmin,
            isPremium: response.user.isPremium,
            imageUrl: response.user.imageUrl
          }

          this.session.setCurrentUser(loggedUserProfile)
          this.router.navigate(['/homepage'])
        },
        error: (error) => {
          this.spinner.hide()
          this.toastr.error('Login error!', {
            position: 'top-right',
            style: {
              border: "2px solid red",
              padding: "16px",
              background: ""
            },
            theme: "toast"
          })
          console.error('Error logging in to backend with system', error)
        }
      })
    } else {
      this.toastr.error('Credentials missing', {
        position: 'top-right',
        style: {
          border: "2px solid red",
          padding: "16px",
          background: ""
        },
        theme: "toast"
      })
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

              const loggedUserProfile: LoggedUserProfile = {
                id: response.user.id,
                firstName:  response.user.firstName,
                lastName: response.user.lastName,
                email: response.user.systemEmail,
                isAdmin: response.user.isAdmin,
                isPremium: response.user.isPremium,
                imageUrl: response.user.imageUrl
              }
    
              this.session.setCurrentUser(loggedUserProfile)
              this.router.navigate(['/homepage'])
            },
            (error) => {
              this.spinner.hide()
              this.toastr.error('Login error', {
                position: 'top-right',
                style: {
                  border: "2px solid red",
                  padding: "16px",
                  background: ""
                },
                theme: "toast"
              })
              console.error('Error logging in to backend with google', error)
            }
          );
        } else {
          console.error('No ID token received.');
        }
      }
    });
  }

}
