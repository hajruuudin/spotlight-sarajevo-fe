import { ChangeDetectorRef, Component, computed, ElementRef, HostListener, NgZone, OnInit } from '@angular/core';
import { SpotService } from '../../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SpotOverviewModel,
  SpotReviewCreateModel,
  SpotReviewModel,
  SpotReviewUpdateModel,
  SpotWorkHoursModel,
} from '../../../shared/models/spot.model';
import { PageHeader } from '../../../components/page-header/page-header';
import { SessionService } from '../../../core/services/session.service';
import { Subscription } from 'rxjs';
import { Subheading } from '../../../components/subheading/subheading';
import { ImageCarousel } from '../../../components/image-carousel/image-carousel';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MapRegular } from '../../../components/map-regular/map-regular';
import { SpotReviewCard } from '../../../components/spot-review-card/spot-review-card';
import { ButtonPrimary } from '../../../components/button-primary/button-primary';
import { ModalService } from '../../../core/services/modal.service';
import { AddReviewModal } from '../../../components/modals/add-review-modal/add-review-modal';
import { HttpErrorResponse } from '@angular/common/http';
import { NotFoundComponent } from '../../../components/not-found-component/not-found-component';
import { DeleteReviewModal } from '../../../components/modals/delete-review-modal/delete-review-modal';
import { EditReviewModal } from '../../../components/modals/edit-review-modal/edit-review-modal';
import { PageResponseModel } from '../../../shared/models/shared.model';
import { error } from 'console';
import { ReviewService } from '../../../services/review.service';
import { DecimalPipe } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-spot-overview',
  imports: [
    PageHeader,
    ImageCarousel,
    Subheading,
    BaseChartDirective,
    MapRegular,
    SpotReviewCard,
    ButtonPrimary,
    NotFoundComponent,
    DecimalPipe,
    TranslocoPipe
  ],
  templateUrl: './spot-overview.html',
  styleUrl: './spot-overview.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class SpotOverview implements OnInit {
  protected spotOverview!: SpotOverviewModel;
  protected lang: string = 'en';
  protected theme: string = 'light';
  protected langSub!: Subscription;
  protected themeSub!: Subscription;
  protected images: string[] = [];

  protected headerContainer!: HTMLElement;
  protected formattedSpotWorkHours: SpotWorkHoursModel[] = [];

  protected barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  protected barChartOptions: ChartConfiguration<'bar'>['options'] = {};

  protected userReview: SpotReviewModel | null = null;
  protected spotReviews: SpotReviewModel[] = [];

  protected reviewPageNumber: number = 0;
  protected reviewPageSize: number = 20;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spotService: SpotService,
    private reviewService: ReviewService,
    private el: ElementRef,
    private toastr: HotToastService,
    private modal: ModalService,
    private spinner: SpinnerService,
    protected session: SessionService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.headerContainer = this.el.nativeElement.querySelector('#headerContainer');

    this.langSub = this.session.language.subscribe((lang) => {
      this.lang = lang;
    });

    this.themeSub = this.session.theme.subscribe((theme) => {
      this.theme = theme;
    });

    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.spotOverview = data['0'];
        this.formatSpotWorkHours(this.spotOverview.workHours);
        this.initialiseRadarChart(this.lang, this.theme);
        this.loadUserSpotReview(this.spotOverview.id);
        this.loadOtherSpotReviews(this.spotOverview.id)

        this.images.push(this.spotOverview.thumbnailImage);
        this.images.push('https://i.ibb.co/QjqzJWm7/SFF-2025-Insta-Post-rz.jpg');
        this.images.push(this.spotOverview.thumbnailImage);
        this.images.push(this.spotOverview.thumbnailImage);
        this.images.push(this.spotOverview.thumbnailImage);
        this.images.push(this.spotOverview.thumbnailImage);
        this.images.push(this.spotOverview.thumbnailImage);
      },
      error: () => {
        this.toastr.error('Failed to load spot overview');
      },
    });
  }

  @HostListener('document:scroll')
  scrollHeaderSlow(): void {
    if (!this.headerContainer) return;

    scrollY = document.documentElement.scrollTop || document.body.scrollTop;

    const parallaxOffset = scrollY * 0.3;

    this.headerContainer.style.transform = `translateY(${parallaxOffset}px)`;
  }

  formatSpotWorkHours(hours: SpotWorkHoursModel[]) {
    const DAYS = [
      { index: 1, name: 'Monday' },
      { index: 2, name: 'Tuesday' },
      { index: 3, name: 'Wednesday' },
      { index: 4, name: 'Thursday' },
      { index: 5, name: 'Friday' },
      { index: 6, name: 'Saturday' },
      { index: 7, name: 'Sunday' },
    ];

    const map = new Map(hours.map((h) => [h.dayIndex, h]));

    const result: SpotWorkHoursModel[] = DAYS.map((d) => {
      const found = map.get(d.index);
      return found
        ? found
        : new SpotWorkHoursModel(d.index, d.name, 'Closed', 'Closed', hours[0]?.spotId ?? 0);
    });

    this.formattedSpotWorkHours = result;
  }

  loadUserSpotReview(spotId: number) {
    if(this.session.getUser() == null){
      return
    } else {
      this.reviewService.findUserSpotReview(spotId).subscribe({
      next: (response: SpotReviewModel) => {
        this.userReview = response;
      },
      error: (response: HttpErrorResponse) => {
        // do something
      },
    });
    }
    
  }

  loadOtherSpotReviews(spotId: number) {
    this.reviewService.findAllSpotReviews(this.reviewPageNumber, this.reviewPageSize, spotId, 'ALPHABETICAL').subscribe({
      next: (response : PageResponseModel<SpotReviewModel>) => {
        const filteredResult = response.content.filter(review => review.userId != this.session.getUserId())
        this.spotReviews = filteredResult
      },
      error: (error : HttpErrorResponse) => {
        // do something
      }
    })
  }

  async openAddModal() {
    const result = await this.modal.openAsync<{ type: string; data?: any }>(AddReviewModal, {
      spotId: this.spotOverview.id,
    });

    if (result?.type === 'cancel') return;
    if (result?.type === 'invalid') {
      this.toastr.info('All fields are required!');
      return;
    }

    if (result.type === 'add') {
      this.handleAddEditReview(result.data, false);
    }
  }

  async openEditModal(){
    const result = await this.modal.openAsync<{type: string; data?: any}>(EditReviewModal, {
      spotId: this.spotOverview.id,
      reviewModel: this.userReview
    })

    if (result?.type === 'cancel') return;
    if (result?.type === 'invalid') {
      this.toastr.info('All fields are required!');
      return;
    }

    if (result.type === 'add') {
      this.handleAddEditReview(result.data, true);
    }
  }

  private handleAddEditReview(formData: any, isEdit: boolean) {
    if(!isEdit){
      const reviewAdd = new SpotReviewCreateModel(
        formData.spotId,
        formData.header,
        formData.body,
        formData.overallRating,
        formData.atmosphere,
        formData.accessibility,
        formData.staffKindness,
        formData.affordability,
        formData.cleanliness,
        formData.localeQuality
      );

      this.spinner.showNavigateSpinner()
      this.reviewService.addSpotReview(reviewAdd).subscribe({
        next: (review: SpotReviewModel) => {
          this.spinner.hideNavigateSpinner()
          this.toastr.success('Review Added!');
          this.ngZone.run(() => {
            this.userReview = review;
          });
          this.cdr.markForCheck()
        },
        error: () => {
          this.toastr.error('There was an error :(');
        },
      });
    } else {
      const reviewEdit = new SpotReviewUpdateModel(
        this.userReview!.id,
        this.userReview!.userId,
        formData.spotId,
        formData.header,
        formData.body,
        formData.overallRating,
        formData.atmosphere,
        formData.accessibility,
        formData.staffKindness,
        formData.affordability,
        formData.cleanliness,
        formData.localeQuality
      )

      this.spinner.showNavigateSpinner()
      this.reviewService.updateSpotReview(reviewEdit).subscribe({
        next: (review: SpotReviewModel) => {
          this.spinner.hideNavigateSpinner()
          this.toastr.success('Review Edited!');
          this.ngZone.run(() => {
            this.userReview = review;
          });
          this.cdr.markForCheck()
        },
        error: () => {
          this.toastr.error('There was an error :(');
        },
      })
    }
    
  }

  async openDeleteReviewModal() {
    const result = await this.modal.openAsync<{ confirmed: boolean }>(DeleteReviewModal, {});

    if (!result.confirmed) return;

    this.spinner.showNavigateSpinner()
    await this.reviewService.deleteSpotReview(this.spotOverview.id, this.userReview!.id).subscribe({
      next: (response: SpotReviewModel) => {
        this.spinner.hideNavigateSpinner()
        this.toastr.success('Review deleted');
        this.ngZone.run(() => {
          this.userReview = null;
        });
        this.cdr.markForCheck()
        
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error('Something went wrong, try again later!');
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login'], {
      queryParams: {
        returnUrl: `/spots/${this.spotOverview.slug}`
      }
    });
  }

  initialiseRadarChart(lang: string, theme: string) {
    console.log(theme);
    let textColor = theme == 'light' ? '#111111' : '#ffffff';
    let gridColor = theme == 'light' ? '#111111AA' : '#ffffff66';
    let labels =
      lang == 'en'
        ? [
            'Affordability 💸',
            'Accessibility 🚗',
            'Atmosphere 🎉',
            'Staff Kindness 😊',
            'Locale Quality 💯',
            'Cleanliness ✨',
          ]
        : [
            'Cjenovna Pristupačnost 💸',
            'Pristupačnost lokacije 🚗',
            'Atmosfera 🎉',
            'Kultura Osoblja 😊',
            'Kvalitet Prostorije 💯',
            'Čistoća ✨',
          ];
    this.barChartData.labels = labels;
    this.barChartData.datasets = [
      {
        label: 'Stats',
        data: [8.0, 9.5, 6.0, 7.0, 8.8, 7.5],
        backgroundColor: ['#056766', '#07777B', '#088891', '#0AA1A0', '#1BB7B5', '#33CDCB'],
        borderColor: '#e7fcfe',
        borderWidth: 0,
        borderRadius: 100,
        barThickness: 40,
      },
    ];

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
      scales: {
        x: {
          min: 0,
          max: 10,
          grid: { 
            display: false,},
          ticks: {
            color: textColor,
            font: { size: 12, family: "Kumbh Sans" },
            stepSize: 2,
          },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: {
              size: 16,
              weight: 'bold',
              family: 'Kumbh Sans',
            },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    };
  }
}
