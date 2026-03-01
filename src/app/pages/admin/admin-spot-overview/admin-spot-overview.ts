import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { PageHeader } from '../../../components/page-header/page-header';
import { SpotOverviewTable } from '../../../components/admin-overview-base-table/admin-overview-entity-tables/spot-overview-table/spot-overview-table';
import { SpotOverviewModel, SpotShorthandModel } from '../../../shared/models/spot.model';
import { SpotService } from '../../../services/spot.service';
import { SessionService } from '../../../core/services/session.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SortOptions } from '../../../shared/constants/SortOptions';
import { PageResponseModel } from '../../../shared/models/shared.model';

@Component({
  selector: 'app-admin-spot-overview',
  imports: [TranslocoPipe, PageHeader, SpotOverviewTable],
  templateUrl: './admin-spot-overview.html',
  styleUrl: './admin-spot-overview.css',
})
export class AdminSpotOverview implements OnInit {
  tableDefinitions: string[] = [
    'admin.spotOverview.tableKeys.id',
    'admin.spotOverview.tableKeys.slug',
    'admin.spotOverview.tableKeys.officialName',
    'admin.spotOverview.tableKeys.smallDescription',
    'admin.spotOverview.tableKeys.categoryName',
    'admin.spotOverview.tableKeys.combinedRating',
  ];

  tableSelectedItem: SpotOverviewModel | null = null;
  tableShorthandData: SpotShorthandModel[] = [];

  currentPage: number = 0;
  pageSize: number = 5;
  totalItems: number = 999;
  totalPages: number = 999;

  constructor(
    protected spotService: SpotService,
    protected sessionService: SessionService,
    protected toastr: HotToastService,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.spotService
      .findSpotsPaginated(this.currentPage, this.pageSize, '', SortOptions.ALPHABETICAL, [])
      .subscribe({
        next: (response: PageResponseModel<SpotShorthandModel>) => {
          this.tableShorthandData = response.content;
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
          this.cdr.detectChanges();
        },
      });
  }

  handleOverviewSelect(spotId: number): void {
    console.log('Selected spot ID:', spotId);
    const spot = this.tableShorthandData.find((s) => s.id === spotId);
    if (spot?.slug) {
      this.spotService.findSpotOverview(spot.slug).subscribe({
        next: (overview) => {
          this.tableSelectedItem = overview;
          this.cdr.detectChanges();
        },
      });
    }
  }

  handleDeleteItem(spotId: number): void {
    console.log('Delete spot ID:', spotId);
    // Call delete service
  }

  handleNextPage(page: number): void {
    this.currentPage = page;
    this.loadSpots();
  }

  handlePreviousPage(page: number): void {
    this.currentPage = page;
    this.loadSpots();
  }

  private loadSpots(): void {
    this.spotService
      .findSpotsPaginated(this.currentPage, this.pageSize, '', SortOptions.ALPHABETICAL, [])
      .subscribe({
        next: (response) => {
          this.tableShorthandData = response.content;
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
        },
      });
  }
}
