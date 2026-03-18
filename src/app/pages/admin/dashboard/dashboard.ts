import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dashboard',
  imports: [PageHeader, TranslocoPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboard {

}
