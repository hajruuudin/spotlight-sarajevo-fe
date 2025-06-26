import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { SessionService } from '../../services/session.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggedUserProfile } from '../../models/user-model';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [HeadingComponent, ButtonPrimaryComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  protected loggedUser : LoggedUserProfile | null = null;

  constructor(
    private sessionService: SessionService,
    private toastr: HotToastService,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.titleService.setTitle(`Profile - Spotlight Sarajevo`)
    this.sessionService.currentUser$.subscribe({
      next: (response : any) => {
        console.log(this.sessionService.currentUserValue)
        this.loggedUser = response
      }
    })
  }

  onLogoutPressed(){
    this.spinner.show()
    this.authService.handleSystemLogOut().subscribe({
      next: (resonse : any) => {
        this.spinner.hide()
        this.router.navigate(['/auth/login'])
      }
    })
  }

  navigateToCommunityRequestPage(){
    this.router.navigate(['/add-community-request'])
  }
}
