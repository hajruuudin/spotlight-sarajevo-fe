import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumnDefinitions, TableDataModel } from '../../shared/models/admin.table.model';

@Component({
  selector: 'app-admin-overview-table',
  imports: [],
  templateUrl: './admin-overview-table.html',
  styleUrl: './admin-overview-table.css'
})
export abstract class AdminOverviewBaseTable {
  @Input() tableHeader: string = ''
  @Input() columnDefinitions: string[] = []

  @Input() currentPage: number = 0
  @Input() maxPages: number = 99
  @Input() totalItems: number = 999

  @Output() onNextPage: EventEmitter<number> = new EventEmitter
  @Output() onPreviousPage: EventEmitter<number> = new EventEmitter

  @Output() onOverviewSelect: EventEmitter<number> = new EventEmitter //send the ID to the overlying component
  @Output() onDeleteItem: EventEmitter<number> = new EventEmitter //send the ID to the overlying component
  
  showItemOverview: boolean = false

  onDeleteItemSelected(){}
  onSaveChangeSelected(){}
  nextPage(){}
  previousPage(){}
}
