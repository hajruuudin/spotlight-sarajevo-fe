import { Component } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-admin-request-overview',
  imports: [PageHeader, TranslocoPipe],
  templateUrl: './admin-request-overview.html',
  styleUrl: './admin-request-overview.css'
})
export class AdminRequestOverview {
  
}
