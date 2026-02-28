import { Component, OnInit } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { PageHeader } from '../../../components/page-header/page-header';
import { DecimalPipe } from '@angular/common';
import { TableColumnDefinitions } from '../../../shared/models/admin.table.model';
import { SpotOverviewTable } from "../../../components/admin-overview-base-table/admin-overview-entity-tables/spot-overview-table/spot-overview-table";

@Component({
  selector: 'app-admin-spot-overview',
  imports: [TranslocoPipe, PageHeader, SpotOverviewTable],
  templateUrl: './admin-spot-overview.html',
  styleUrl: './admin-spot-overview.css'
})
export class AdminSpotOverview implements OnInit {
  tableDefinitions: string[] = [
    "adminTable.id",
    "adminTable.thumbnail", 
    "adminTable.slug", 
    "adminTable.name", 
    "adminTable.category", 
    "adminTable.rating", 
    "adminTable.createdAt"
  ]

  ngOnInit(): void {
    
  }
  
}

