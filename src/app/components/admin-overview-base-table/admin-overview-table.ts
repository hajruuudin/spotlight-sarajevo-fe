import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumnDefinitions, TableDataModel } from '../../shared/models/admin.table.model';

@Component({
  selector: 'app-admin-overview-table',
  imports: [],
  templateUrl: './admin-overview-table.html',
  styleUrl: './admin-overview-table.css'
})
export abstract class AdminOverviewBaseTable {
  @Input() columnDefinitions: string[] = []
  @Input() columnLang: string = 'en'

  @Input() currentPage: number = 0
  @Input() maxPages: number = 99
  @Input() totalItems: number = 999

  @Output() onNextPage: EventEmitter<number> = new EventEmitter
  @Output() onPreviousPage: EventEmitter<number> = new EventEmitter

  @Output() onOverviewSelect: EventEmitter<number> = new EventEmitter //send the ID to the overlying component
  @Output() onDeleteItem: EventEmitter<number> = new EventEmitter //send the ID to the overlying component
  
  selectedSpotId: number | null = null
  showItemOverview: boolean = false

  onDeleteItemSelected(){}
  onSaveChangeSelected(){}

  onOverviewSelected(id: number){
    console.log(id)
    // Toggle expansion: if clicking the same row, collapse it
    if (this.selectedSpotId === id) {
      this.selectedSpotId = null
    } else {
      this.selectedSpotId = id
      this.onOverviewSelect.emit(id)
    }
  }

  nextPage(){}
  previousPage(){}
}
