import { Component, Input, OnInit } from '@angular/core';
import { AdminOverviewBaseTable } from '../../admin-overview-table';
import { SpotOverviewModel, SpotShorthandModel } from '../../../../shared/models/spot.model';
import { ButtonPrimary } from "../../../button-primary/button-primary";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-spot-overview-table',
  imports: [ButtonPrimary, TranslocoPipe],
  templateUrl: './spot-overview-table.html',
  styleUrl: './spot-overview-table.css',
  host: {
    class: 'w-full'
  }
})
export class SpotOverviewTable extends AdminOverviewBaseTable implements OnInit{
  @Input() tableData: SpotShorthandModel[] = []
  @Input() itemOverview: SpotOverviewModel | null = null

  ngOnInit(): void {
    
  }
}
