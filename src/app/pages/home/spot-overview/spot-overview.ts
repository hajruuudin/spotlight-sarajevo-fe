import { Component, computed, ElementRef, HostListener, OnInit } from '@angular/core';
import { SpotService } from '../../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpotOverviewModel } from '../../../shared/models/spot.model';
import { PageHeader } from '../../../components/page-header/page-header';
import { SessionService } from '../../../core/services/session.service';
import { Subscription } from 'rxjs';
import { ImageCarousel } from '../../../components/image-carousel/image-carousel';

@Component({
  selector: 'app-spot-overview',
  imports: [PageHeader, ImageCarousel],
  templateUrl: './spot-overview.html',
  styleUrl: './spot-overview.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class SpotOverview implements OnInit {
  protected spotOverview!: SpotOverviewModel;
  protected lang: String = 'en';
  protected sub!: Subscription;
  protected images: string[] = [];

  protected headerContainer!: HTMLElement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotService: SpotService,
    private el: ElementRef,
    private toastr: HotToastService,
    private spinner: SpinnerService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.headerContainer = this.el.nativeElement.querySelector('#headerContainer');

    this.sub = this.session.language.subscribe((lang) => {
      this.lang = lang;
    });

    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.spotOverview = data['0'];
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
}
