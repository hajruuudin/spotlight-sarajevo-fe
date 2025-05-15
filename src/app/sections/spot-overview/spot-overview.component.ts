import { Component, OnInit } from '@angular/core';
import { SpotModel, SpotShorthand } from '../../models/spot-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpotDataService } from '../../services/spot-data.service';
import { OverviewHeadingComponent } from "../../components/overview-heading/overview-heading.component";
import { NgIf } from '@angular/common';
import { ImageGalleryComponent } from "../../components/image-gallery/image-gallery.component";
import { fadeInOutAnimation } from '../../animations/app.animations';

@Component({
  selector: 'app-spot-overview',
  imports: [NgIf, OverviewHeadingComponent, ImageGalleryComponent],
  templateUrl: './spot-overview.component.html',
  styleUrl: './spot-overview.component.css',
  animations: [
    fadeInOutAnimation
  ]
})
export class SpotOverviewComponent implements OnInit{
  slug: string = ''
  spot: SpotModel | null = null;

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
    } else {
      this.activatedRoute.paramMap.subscribe({
        next: (params: any) => {
          this.slug = params.get('spot-slug');
          if(this.slug){
            this.spotService.getSpotOverviewBySlug(this.slug).subscribe({
              next: (response : any) => {
                this.spot = response as SpotModel
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
}
