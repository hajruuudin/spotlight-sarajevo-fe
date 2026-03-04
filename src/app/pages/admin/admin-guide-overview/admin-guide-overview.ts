import { ChangeDetectorRef, Component } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';
import {
  TouristGuideOverviewModel,
  TouristGuideShorthandModel,
} from '../../../shared/models/tourist.guide.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TouristGuideService } from '../../../services/tourist.guide.service';
import { SessionService } from '../../../core/services/session.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from '../../../core/services/modal.service';
import { DeleteModal } from '../../../components/modals/delete-modal/delete-modal';

@Component({
  selector: 'app-admin-guide-overview',
  imports: [PageHeader, TranslocoPipe],
  templateUrl: './admin-guide-overview.html',
  styleUrl: './admin-guide-overview.css',
})
export class AdminGuideOverview {
  tableDefinitions: string[] = [
    'ID',
    'SLUG',
    'OFFICIAL NAME',
    'SMALL DESCRIPTION',
    'CATEGORY NAME',
    'START DATE',
  ];

  tableSelectedItem: TouristGuideOverviewModel | null = null;
  tableShorthandData: TouristGuideShorthandModel[] = [];
  tableSearchForm: FormGroup;

  currentPage: number = 0;
  pageSize: number = 4;
  totalItems: number = 999;
  totalPages: number = 999;

  constructor(
    protected guideService: TouristGuideService,
    protected sessionService: SessionService,
    protected spinnerService: SpinnerService,
    protected toastr: HotToastService,
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected modal: ModalService,
  ) {
    this.tableSearchForm = this.fb.group({
      searchTerm: [''],
    });
  }

  ngOnInit(): void {
    this.loadGuides();
  }

  handleGuideSearch() {
    this.loadGuides();
  }

  handleOverviewSelect(eventId: number): void {}

  handleUpdateItem(finalPayload: any): void {}

  async handleDeleteItem(spotId: number): Promise<void> {
    const result = await this.modal.openAsync<{ confirmed: boolean }>(DeleteModal, {
      titleKey: 'Delete Tourist Guide',
      confirmMessageKey:
        'Are You sure You want to delete this guide from the system? This is an IRREVERSIBLE process?',
    });

    if (!result.confirmed) return;
  }

  handleNextPage(page: number): void {
    this.currentPage++;
    this.loadGuides();
  }

  handlePreviousPage(page: number): void {
    this.currentPage--;
    this.loadGuides();
  }

  // Will be fixed. Pagination will be added to the backend
  private loadGuides(): void {
    this.guideService.findAllGuides().subscribe({
      next: (response: TouristGuideShorthandModel[]) => {
        this.tableShorthandData = response;
        this.cdr.detectChanges();
      },
    });
  }
}
