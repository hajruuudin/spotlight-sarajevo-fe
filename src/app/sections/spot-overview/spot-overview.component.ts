import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpotModel } from '../../models/spot-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpotDataService } from '../../services/spot-data.service';
import { OverviewHeadingComponent } from "../../components/overview-heading/overview-heading.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
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
import { MatDialog } from '@angular/material/dialog';
import { AddReviewModalComponent } from '../../components/add-review-modal/add-review-modal.component';
import { ReviewModel } from '../../models/review-model';
import { ReviewService } from '../../services/review.service';
import { ReviewCardComponent } from "../../components/review-card/review-card.component";
import { DeleteReviewModalComponent } from '../../components/delete-review-modal/delete-review-modal.component';
import { Title } from '@angular/platform-browser';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { CollectionModalComponent } from '../../components/collection-modal/collection-modal.component';

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
  imports: [NgIf, NgFor, NgClass, OverviewHeadingComponent, ImageGalleryComponent, SmallTagLabelComponent, NotFoundComponent, ButtonRegularComponent, ReviewCardComponent, ButtonPrimaryComponent],
  templateUrl: './spot-overview.component.html',
  styleUrl: './spot-overview.component.css',
  animations: [fadeInOutAnimation]
})
export class SpotOverviewComponent implements OnInit, AfterViewInit{
  @ViewChild("qualityChartCanvas") qualityChartCanvas! : ElementRef<HTMLCanvasElement>

  slug: string = ''
  spot: SpotModel | null = null;
  userSpotReview: ReviewModel | null = null;
  spotReviews: ReviewModel[] = []
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

  reviewPageNumber : number = 0;
  reviewPageSize : number = 5;
  totalElements : number = 100;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private spotService: SpotService,
    private spotDataService: SpotDataService,
    private reviewService: ReviewService,
    private titleServie: Title,
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
      this.getUserSpotReview()
      this.getOtherSpotReviews()
      this.titleServie.setTitle(`${this.spot?.officialName} - Overview`)
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
                this.getUserSpotReview()
                this.getOtherSpotReviews()
              },
              error: (error : Error) => {
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

  openReviewDialog(): void {
      const dialogRef = this.dialog.open(AddReviewModalComponent, {
        width: '600px',
        height: '600px',
        data: {name: this.spot?.officialName, spotId: this.spot?.id}
      });

      dialogRef.afterClosed().subscribe(status => {
      if(status){
        this.getUserSpotReview()
      }
    })
  }

  openDeleteReviewDialog(){
    const dialogRef = this.dialog.open(DeleteReviewModalComponent, {
      width: '600px',
      data: {name: this.spot?.officialName, spotId: this.spot?.id}
    })

    dialogRef.afterClosed().subscribe(status => {
      if(status){
        this.getUserSpotReview()
      }
    })
  }

  openCollectionDialog(){
    const dialogRef = this.dialog.open(CollectionModalComponent, {
      width: '300px',
      data: {name: this.spot?.officialName, objectId: this.spot?.id, type: 'SPOT'}
    })
  }

  getUserSpotReview(){
    this.reviewService.getUserReview(this.spot?.id!).subscribe({
      next: (response : ReviewModel | any) => {
        this.userSpotReview = response
      },
      error: (error: Error) => {
        console.error(error);
      }
    })
  }

  getOtherSpotReviews(){
    this.reviewService.getOtherSpotReviews(this.reviewPageNumber, this.reviewPageSize, this.spot?.id!).subscribe({
      next: (response : any) => {
        this.reviewPageNumber++;
        this.spotReviews = response['content']
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  }
}
