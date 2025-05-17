import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpotModel } from '../../models/spot-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpotDataService } from '../../services/spot-data.service';
import { OverviewHeadingComponent } from "../../components/overview-heading/overview-heading.component";
import { NgFor, NgIf } from '@angular/common';
import { ImageGalleryComponent } from "../../components/image-gallery/image-gallery.component";
import { fadeInOutAnimation } from '../../animations/app.animations';
import { WorkHoursDB } from '../../models/util-model';
import { SmallTagLabelComponent } from "../../components/small-tag-label/small-tag-label.component";
import {Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


@Component({
  selector: 'app-spot-overview',
  imports: [NgIf, NgFor, OverviewHeadingComponent, ImageGalleryComponent, SmallTagLabelComponent, NotFoundComponent, ButtonRegularComponent],
  templateUrl: './spot-overview.component.html',
  styleUrl: './spot-overview.component.css',
  animations: [fadeInOutAnimation]
})
export class SpotOverviewComponent implements OnInit, AfterViewInit{
  @ViewChild("qualityChartCanvas") qualityChartCanvas! : ElementRef<HTMLCanvasElement>

  slug: string = ''
  spot: SpotModel | null = null;
  formattedWorkHoursKeys : string[] = [];
  formattedWorkHours: {
    "MON" : string[];
    "TUE" : string[];
    "WED" : string[];
    "THU" : string[];
    "FRI" : string[];
    "SAT" : string[];
    "SUN" : string[];
  } = {
    "MON" : [],
    "TUE" : [],
    "WED" : [],
    "THU" : [],
    "FRI" : [],
    "SAT" : [],
    "SUN" : []
  };
  workDays: (keyof typeof this.formattedWorkHours)[] = Object.keys(this.formattedWorkHours) as (keyof typeof this.formattedWorkHours)[];
  qualityChart: Chart | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spotService: SpotService,
    private spotDataService: SpotDataService,
    private spinner: NgxSpinnerService,
    private toastr: HotToastService
  ){}

  ngOnInit(): void {
    if(this.spotDataService.getCurrentSpotOverview()){
      this.spot = this.spotDataService.getCurrentSpotOverview()
      if(this.spot){
        this.formatWorkHours(this.spot.workHours)
      }
      this.formattedWorkHoursKeys = Object.keys(this.formattedWorkHours)
    } else {
      this.activatedRoute.paramMap.subscribe({
        next: (params: any) => {
          this.slug = params.get('spot-slug');
          if(this.slug){
            this.spotService.getSpotOverviewBySlug(this.slug).subscribe({
              next: (response : any) => {
                this.spot = response as SpotModel
                this.formatWorkHours(this.spot.workHours)
                setTimeout(() => {
                  this.loadQualityChart()
                }, 200)
                this.formattedWorkHoursKeys = Object.keys(this.formattedWorkHours)
              },
              error: (error : Error) => {
                this.toastr.error(error.message);
                console.error(error)
              }
            })
          }
        }
      })  
    }
  }

  ngAfterViewInit(): void {
    console.log(this.qualityChartCanvas)
    this.loadQualityChart()
  }

  formatWorkHours(workHours: WorkHoursDB[]) {
    workHours.forEach(day => {
      switch (day.day) {
        case "MON":
          this.formattedWorkHours.MON.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.MON.push(day.endTime.substring(0, 5));
          break;
        case "TUE":
          this.formattedWorkHours.TUE.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.TUE.push(day.endTime.substring(0, 5));
          break;
        case "WED":
          this.formattedWorkHours.WED.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.WED.push(day.endTime.substring(0, 5));
          break;
        case "THU":
          this.formattedWorkHours.THU.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.THU.push(day.endTime.substring(0, 5));
          break;
        case "FRI":
          this.formattedWorkHours.FRI.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.FRI.push(day.endTime.substring(0, 5));
          break;
        case "SAT":
          this.formattedWorkHours.SAT.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.SAT.push(day.endTime.substring(0, 5));
          break;
        case "SUN":
          this.formattedWorkHours.SUN.push(day.startTime.substring(0, 5));
          this.formattedWorkHours.SUN.push(day.endTime.substring(0, 5));
          break;
      }
    });
  }

  loadQualityChart(){
    let ctx = this.qualityChartCanvas.nativeElement;
      this.qualityChart = new Chart(ctx, {
        type: 'radar',
        data: this.getChartData(),
        options: {
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: {
                display: false
              },
              pointLabels: {
                color: '#FFFFFF',
                font: {
                  size: 14,
                  family: 'Kumbh Sans'
                }
              },
              grid: {
                color: '#FFFFFF22',
                circular: true
              },
              angleLines: {
                color: '#FFFFFF55'
              }
            }
          },
          plugins: {
            title: {
              display: false
            },
            legend: {
              display: false,
            }
          },
          elements: {
            line: {
              borderWidth: 5,
              borderColor: '#FFFFFF'
            },
            point: {
              backgroundColor: '#FFFFFF',
              borderColor: '#FFFFFF'
            }
          }
        }
      });
  }

  test(){
    console.log(this.qualityChart)
  }

  getChartData(){
    return {
      labels: [
        'Cleanliness',
        'Affordability',
        'Accessibility',
        'Staff Kindness',
        'Overall Quality',
        'Atmosphere'
        ],
      datasets: [{
        data: [
          this.spot?.cleanliness! * 10,
          this.spot?.affordability! * 10,
          this.spot?.accessibility! * 10,
          this.spot?.staffKindness! * 10,
          this.spot?.quality! * 10,
          this.spot?.atmosphere! * 10
        ],
        fill: true,
        backgroundColor: '#09434255',
        borderColor: '#11aeb6',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    }
  }
}
