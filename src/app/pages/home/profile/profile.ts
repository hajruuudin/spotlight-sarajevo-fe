import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { ButtonRegular } from "../../../components/button-regular/button-regular";
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-profile',
  imports: [PageHeader, ButtonRegular],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Profile implements OnInit{
  constructor(
    private authService: AuthService,
    private session: SessionService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout().subscribe({
      next: (response: any) => {
        this.session.clearSession()
        this.router.navigate(['/auth/login'])
      }
    })
  }
}
