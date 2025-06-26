import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar-admin',
  imports: [RouterLink, RouterLinkActive, NgxSpinnerComponent],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  onLogout(){
    this.spinner.show()
    this.authService.handleSystemLogOut().subscribe({
      next: (resonse : any) => {
        this.spinner.hide()
        this.router.navigate(['/auth/login'])
      }
    })
  }
}
