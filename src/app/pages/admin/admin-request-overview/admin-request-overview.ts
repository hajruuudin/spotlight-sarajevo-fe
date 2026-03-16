import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';
import { CommunityRequestModel, CommunityRequestOverviewModel } from '../../../shared/models/community.request.model';
import { SortOptions } from '../../../shared/constants/SortOptions';
import { FilterOptions } from '../../../shared/constants/FilterOptions';
import { EventService } from '../../../services/event.service';
import { ReviewService } from '../../../services/review.service';
import { SessionService } from '../../../core/services/session.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CommunityRequestService } from '../../../services/community.request.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../core/services/modal.service';
import { CommunityOverviewTable } from "../../../components/admin-overview-base-table/admin-overview-entity-tables/community-overview-table/community-overview-table";

@Component({
  selector: 'app-admin-request-overview',
  imports: [PageHeader, TranslocoPipe, CommunityOverviewTable],
  templateUrl: './admin-request-overview.html',
  styleUrl: './admin-request-overview.css'
})
export class AdminRequestOverview implements OnInit{
  tableDefinitions: string[] = [
    'ID',
    'USERNAME & ID',
    'GUIDE TITLE',
    'REQUEST HEADER',
    'REQUEST TYPE',
    'OBJECT TYPE',
    'CREATED AT',
    'STATUS'
  ];

  tableSelectedItem: CommunityRequestOverviewModel | null = null
  tableShorthandData: CommunityRequestModel[] = []
  tableFilters: FilterOptions[] = [FilterOptions.ALL, FilterOptions.APPROVED, FilterOptions.PENDING, FilterOptions.REJECTED]
  
  currentPage: number = 0;
  pageSize: number = 5;
  totalItems: number = 999;
  totalPages: number = 999;

  constructor(
    protected requestService: CommunityRequestService,
    protected sessionService: SessionService,
    protected spinnerService: SpinnerService,
    protected toastr: HotToastService,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected modal: ModalService,
  ) {
  
  }

  ngOnInit(): void {
    
  }

  handleOverviewSelect(requestId: number): void{}

  handleFilterChange(filter: FilterOptions){}

  handleRequestApproval(requestId: number){}

  handleRequestRejection(requestId: number){}

  handleRequestIntegration(integrationInfo: any){}

  handleRequestDelete(requestId: number){}

  handleNextPage(page: number): void {
    this.currentPage++;
    this.loadCommunityRequests();
  }

  handlePreviousPage(page: number): void {
    this.currentPage--;
    this.loadCommunityRequests();
  }

  /* Loads all the requests initially upon page load, and upon refreshing the data */
  private loadCommunityRequests(){
    this.requestService.createCommunityRequest
  }

}
