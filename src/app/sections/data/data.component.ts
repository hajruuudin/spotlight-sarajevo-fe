import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { SpotService } from '../../services/spot.service';
import { SpotShorthand } from '../../models/spot-model';
import { EventShorthand } from '../../models/event-model';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SsTableComponent } from "../../components/ss-table/ss-table.component";

@Component({
  selector: 'app-data',
  imports: [HeadingComponent, SsTableComponent],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit{
  protected spotShorthands: SpotShorthand[] = []
  protected eventShorthands: EventShorthand[] = []

  protected spotPageNumber: number = 0
  protected spotPageSize: number = 20

  constructor(
    private spotService: SpotService,
    private eventService: EventService
  ){}

  ngOnInit(): void { 
    this.spotService.getSpotShorthands('', '', [], this.spotPageNumber, this.spotPageSize).subscribe({
      next: (response : any) => {
        this.spotShorthands = response['content'] as SpotShorthand[]
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    })
  }
}
