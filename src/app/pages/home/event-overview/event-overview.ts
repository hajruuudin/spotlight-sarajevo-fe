import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone } from '@angular/core';
import { EventOgraniserReviewModel, EventOverviewModel } from '../../../shared/models/event.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { ReviewService } from '../../../services/review.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ModalService } from '../../../core/services/modal.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { SessionService } from '../../../core/services/session.service';
import { PageHeader } from '../../../components/page-header/page-header';
import { BnwRatingIcon } from '../../../resources/icons/bnw-rating-icon/bnw-rating-icon';
import { TranslocoPipe } from '@ngneat/transloco';
import { BnwLocationIcon } from '../../../resources/icons/bnw-location-icon/bnw-location-icon';
import { BnwCategoryIcon } from '../../../resources/icons/bnw-category-icon/bnw-category-icon';
import { Subheading } from '../../../components/subheading/subheading';
import { ImageCarousel } from '../../../components/image-carousel/image-carousel';
import { MapRegular } from '../../../components/map-regular/map-regular';
import { DatePipe } from '@angular/common';
import { BnwDateIcon } from "../../../resources/icons/bnw-date-icon/bnw-date-icon";
import { EventInfoCard } from "../../../components/event-info-card/event-info-card";

@Component({
  selector: 'app-event-overview',
  imports: [
    PageHeader,
    TranslocoPipe,
    BnwLocationIcon,
    BnwCategoryIcon,
    Subheading,
    ImageCarousel,
    MapRegular,
    DatePipe,
    BnwDateIcon,
    EventInfoCard
],
  templateUrl: './event-overview.html',
  styleUrl: './event-overview.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class EventOverview {
  protected eventOverview!: EventOverviewModel;
  protected lang: string = 'en';
  protected theme: string = 'light';
  protected langSub!: Subscription;
  protected themeSub!: Subscription;
  protected images: string[] = []; // TEMPORARY FOR DEMONSTRATION

  protected headerContainer!: HTMLElement;

  protected userEventOrganiserReview: EventOgraniserReviewModel | null = null;
  protected eventOrganiserReviews: EventOgraniserReviewModel[] = [];

  protected reviewPageNumber: number = 0;
  protected reviewPageSize: number = 20;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private reviewService: ReviewService,
    private el: ElementRef,
    private toastr: HotToastService,
    private modal: ModalService,
    private spinner: SpinnerService,
    protected session: SessionService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
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
        this.eventOverview = data['0'];

        this.images.push(this.eventOverview.thumbnailImage);
        this.images.push('https://i.ibb.co/QjqzJWm7/SFF-2025-Insta-Post-rz.jpg');
        this.images.push(this.eventOverview.thumbnailImage);
        this.images.push(this.eventOverview.thumbnailImage);
        this.images.push(this.eventOverview.thumbnailImage);
        this.images.push(this.eventOverview.thumbnailImage);
        this.images.push(this.eventOverview.thumbnailImage);
      },
      error: () => {
        this.toastr.error('Failed to load event overview');
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

  // REPLACE WITH ADDING ORGANISER
  // async openAddModal() {
  //   const result = await this.modal.openAsync<{ type: string; data?: any }>(AddReviewModal, {
  //     spotId: this.spotOverview.id,
  //   });

  //   if (result?.type === 'cancel') return;
  //   if (result?.type === 'invalid') {
  //     this.toastr.info('All fields are required!');
  //     return;
  //   }

  //   if (result.type === 'add') {
  //     this.handleAddEditReview(result.data, false);
  //   }
  // }

  // async openEditModal(){
  //   const result = await this.modal.openAsync<{type: string; data?: any}>(EditReviewModal, {
  //     spotId: this.spotOverview.id,
  //     reviewModel: this.userReview
  //   })

  //   if (result?.type === 'cancel') return;
  //   if (result?.type === 'invalid') {
  //     this.toastr.info('All fields are required!');
  //     return;
  //   }

  //   if (result.type === 'add') {
  //     this.handleAddEditReview(result.data, true);
  //   }
  // }

  // private handleAddEditReview(formData: any, isEdit: boolean) {
  //   if(!isEdit){
  //     const reviewAdd = new SpotReviewCreateModel(
  //       formData.spotId,
  //       formData.header,
  //       formData.body,
  //       formData.overallRating,
  //       formData.atmosphere,
  //       formData.accessibility,
  //       formData.staffKindness,
  //       formData.affordability,
  //       formData.cleanliness,
  //       formData.localeQuality
  //     );

  //     this.spinner.showNavigateSpinner()
  //     this.reviewService.addSpotReview(reviewAdd).subscribe({
  //       next: (review: SpotReviewModel) => {
  //         this.spinner.hideNavigateSpinner()
  //         this.toastr.success('Review Added!');
  //         this.ngZone.run(() => {
  //           this.userReview = review;
  //         });
  //         this.cdr.markForCheck()
  //       },
  //       error: () => {
  //         this.toastr.error('There was an error :(');
  //       },
  //     });
  //   } else {
  //     const reviewEdit = new SpotReviewUpdateModel(
  //       this.userReview!.id,
  //       this.userReview!.userId,
  //       formData.spotId,
  //       formData.header,
  //       formData.body,
  //       formData.overallRating,
  //       formData.atmosphere,
  //       formData.accessibility,
  //       formData.staffKindness,
  //       formData.affordability,
  //       formData.cleanliness,
  //       formData.localeQuality
  //     )

  //     this.spinner.showNavigateSpinner()
  //     this.reviewService.updateSpotReview(reviewEdit).subscribe({
  //       next: (review: SpotReviewModel) => {
  //         this.spinner.hideNavigateSpinner()
  //         this.toastr.success('Review Edited!');
  //         this.ngZone.run(() => {
  //           this.userReview = review;
  //         });
  //         this.cdr.markForCheck()
  //       },
  //       error: () => {
  //         this.toastr.error('There was an error :(');
  //       },
  //     })
  //   }
  // }

  // async openDeleteReviewModal() {
  //   const result = await this.modal.openAsync<{ confirmed: boolean }>(DeleteReviewModal, {});

  //   if (!result.confirmed) return;

  //   this.spinner.showNavigateSpinner()
  //   await this.reviewService.deleteSpotReview(this.spotOverview.id, this.userReview!.id).subscribe({
  //     next: (response: SpotReviewModel) => {
  //       this.spinner.hideNavigateSpinner()
  //       this.toastr.success('Review deleted');
  //       this.ngZone.run(() => {
  //         this.userReview = null;
  //       });
  //       this.cdr.markForCheck()

  //     },
  //     error: (response: HttpErrorResponse) => {
  //       this.toastr.error('Something went wrong, try again later!');
  //     },
  //   });
  // }

  redirectToLogin() {
    this.router.navigate(['/auth/login'], {
      queryParams: {
        returnUrl: `/spots/${this.eventOverview.slug}`,
      },
    });
  }
}
