import { Component, computed, ElementRef, HostListener, OnInit } from '@angular/core';
import { SpotService } from '../../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotOverviewModel, SpotWorkHoursModel } from '../../../shared/models/spot.model';
import { PageHeader } from '../../../components/page-header/page-header';
import { SessionService } from '../../../core/services/session.service';
import { Subscription } from 'rxjs';
import { Subheading } from '../../../components/subheading/subheading';
import { ImageCarousel } from '../../../components/image-carousel/image-carousel';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-spot-overview',
  imports: [PageHeader, ImageCarousel, Subheading, BaseChartDirective],
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

  initialiseRadarChart(lang: string, theme: string) {
    console.log(theme);
    let textColor = theme == 'light' ? '#000000' : '#ffffff';
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
    this.barChartData.labels = labels
    this.barChartData.datasets = [
      {
        label: 'Stats',
        data: [8.0, 9.5, 6.0, 7.0, 8.8, 7.5],
        backgroundColor: ['#088891', '#00BFA6', '#F5A623', '#FF6B6B', '#9B59B6', '#3498DB'],
        borderColor: '#e7fcfe',
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 20,
      },
    ];

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          min: 0,
          max: 10,
          grid: { color: '#EEEEEE' },
          ticks: {
            color: textColor,
            font: { size: 14 },
            stepSize: 2,
          },
        },
        y: {
          grid: { display: false },
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
        tooltip: { enabled: true },
      },
    };
  }
}
