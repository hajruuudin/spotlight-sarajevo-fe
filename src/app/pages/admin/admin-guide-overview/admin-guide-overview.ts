import { Component } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-admin-guide-overview',
  imports: [PageHeader, TranslocoPipe],
  templateUrl: './admin-guide-overview.html',
  styleUrl: './admin-guide-overview.css'
})
export class AdminGuideOverview {

}
