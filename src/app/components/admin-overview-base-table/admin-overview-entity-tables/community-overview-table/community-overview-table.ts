import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdminOverviewBaseTable } from '../../admin-overview-table';
import { CommunityRequestModel, CommunityRequestOverviewModel, CommunityRequestStatusUpdate } from '../../../../shared/models/community.request.model';
import { FilterOptions } from '../../../../shared/constants/FilterOptions';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal.service';
import { ButtonSecondary } from '../../../button-secondary/button-secondary';
import { DatePipe, CommonModule, JsonPipe } from '@angular/common';

/**
 * Community Overview Table Component
 * 
 * Implementation of AdminOverviewBaseTable for community requests. Displays community request shorthand data 
 * in a paginated tabular layout. When a row is expanded, an overview section is shown displaying:
 *   - Request full information (header, description, pending info)
 *   - User who submitted the request
 *   - Date of submission
 *   - Action buttons: Approve, Reject, and Integrate (disabled for v2)
 */
@Component({
  selector: 'app-community-overview-table',
  imports: [
    ButtonSecondary,
    ReactiveFormsModule,
    DatePipe,
    CommonModule,
    JsonPipe,
  ],
  templateUrl: './community-overview-table.html',
  styleUrl: './community-overview-table.css',
  host: {
    class: 'w-full',
  },
})
export class CommunityOverviewTable extends AdminOverviewBaseTable implements OnInit, OnChanges{
  @Input() tableData: CommunityRequestModel[] = [];
  @Input() itemOverview: CommunityRequestOverviewModel | null = null;

  @Output() onRequestApproval: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRequestRejection: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRequestIntegration: EventEmitter<number> = new EventEmitter<number>();
  @Output() onRequestDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() onFilterChange: EventEmitter<FilterOptions> = new EventEmitter<FilterOptions>();

  protected updateRequestForm: FormGroup;
  protected filterOptions: FilterOptions[] = [FilterOptions.ALL, FilterOptions.APPROVED, FilterOptions.PENDING, FilterOptions.REJECTED]
  protected currentFilterOption: FilterOptions = FilterOptions.ALL;

  private readonly modal = inject(ModalService);
  
  constructor(){
    super()

    this.updateRequestForm = this.fb.group({
      'status' : ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  /* ===================================================== */
  /* ============ ACTION BUTTON FUNCTIONS ================ */
  /* ===================================================== */
  
  onApprove(): void {
    if (this.selectedItemId) {
      this.onRequestApproval.emit(this.selectedItemId);
    }
  }

  onReject(): void {
    if (this.selectedItemId) {
      this.onRequestRejection.emit(this.selectedItemId);
    }
  }

  onIntegrate(): void {
    if (this.selectedItemId) {
      this.onRequestIntegration.emit(this.selectedItemId);
    }
  }

}
