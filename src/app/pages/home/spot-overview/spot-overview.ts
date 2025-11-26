import { Component, computed, ElementRef, HostListener, OnInit } from '@angular/core';
import { SpotService } from '../../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpotOverviewModel, SpotWorkHoursModel } from '../../../shared/models/spot.model';
import { PageHeader } from '../../../components/page-header/page-header';
import { SessionService } from '../../../core/services/session.service';
import { Subscription } from 'rxjs';
import { Subheading } from '../../../components/subheading/subheading';
import { ImageCarousel } from '../../../components/image-carousel/image-carousel';
import { NgxEchartsDirective } from 'ngx-echarts';
import { size } from '@ngneat/transloco';

@Component({
  selector: 'app-spot-overview',
  imports: [PageHeader, ImageCarousel, Subheading, NgxEchartsDirective],
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

  protected formattedSpotWorkHours: SpotWorkHoursModel[] = []

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
        this.formatSpotWorkHours(this.spotOverview.workHours)
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
  // Days 1 → 7 (or 0 → 6 depending on your system)
  const DAYS = [
    { index: 1, name: "Monday" },
    { index: 2, name: "Tuesday" },
    { index: 3, name: "Wednesday" },
    { index: 4, name: "Thursday" },
    { index: 5, name: "Friday" },
    { index: 6, name: "Saturday" },
    { index: 7, name: "Sunday" }
  ];

  const map = new Map(hours.map(h => [h.dayIndex, h]));

  const result: SpotWorkHoursModel[] = DAYS.map(d => {
    const found = map.get(d.index);
    return found
      ? found
      : new SpotWorkHoursModel(
          d.index,
          d.name,
          "Closed",
          "Closed",
          hours[0]?.spotId ?? 0
        );
  });

  this.formattedSpotWorkHours = result;
}

// CHART SETUP
chartOptions = {
  tooltip: {},
  radar: {
    indicator: [
      { name: 'Cleanliness', max: 100 },
      { name: 'Atmosphere', max: 100 },
      { name: 'Quality', max: 100 },
      { name: 'Affordability', max: 100 },
      { name: 'Staff Kindness', max: 100 },
      { name: 'Accessibility', max: 100 },
    ],
    splitNumber: 5,
    shape: 'polygon',
    axisName: {
      color: '#fff',
      fontSize: 20,
      FontFace: 'Kumbh Sans'
    },
    splitLine: {
      lineStyle: { color: '#999' }
    },
    splitArea: {
      areaStyle: { color: 'rgba(255,255,255,0.04)' }
    }
  },
  series: [{
    type: 'radar',
    areaStyle: { opacity: 0.3 },
    lineStyle: { width: 3 },
    symbol: 'circle',
    symbolSize: 8,
    data: [
      {
        value: [70, 60, 95, 80, 50, 70],
        name: 'Review Score'
      }
    ]
  }]
};

}
