import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { PageHeader } from '../../../components/page-header/page-header';

@Component({
  selector: 'app-admin-event-overview',
  imports: [TranslocoPipe, PageHeader],
  templateUrl: './admin-event-overview.html',
  styleUrl: './admin-event-overview.css'
})
export class AdminEventOverview {

}
