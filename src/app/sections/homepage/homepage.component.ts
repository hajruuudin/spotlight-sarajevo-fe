import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { HttpClient } from '@angular/common/http';
import { TagService } from '../../services/tag.service';
import { SpotHeadlineComponent } from "../../components/spot-headline/spot-headline.component";
import { SpotShorthand } from '../../models/spot-model';
import { SpotService } from '../../services/spot.service';

@Component({
  selector: 'app-homepage',
  imports: [HeadingComponent, SpotHeadlineComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  headlineSpot : SpotShorthand | null = null;
  navigateToSpotOverview: (spotId: number) => void = () => {console.log("Clicked")};

  constructor(
    private tagService : TagService,
    private spotService : SpotService
  ) {}

  ngOnInit(): void {
    this.spotService.getHeadlineSpot().subscribe({
      next: (response : any) => {
        this.headlineSpot = response
      },
      error: (error : Error) => {
        console.error()
      }
    })
  }


}
