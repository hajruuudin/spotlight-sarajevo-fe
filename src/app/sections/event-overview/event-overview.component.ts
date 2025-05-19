import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../models/event-model';
import { EventService } from '../../services/event.service';
import { EventDataService } from '../../services/event-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { Title } from '@angular/platform-browser';
import { OverviewHeadingComponent } from "../../components/overview-heading/overview-heading.component";
import { ImageGalleryComponent } from "../../components/image-gallery/image-gallery.component";
import { fadeInOutAnimation } from '../../animations/app.animations';
import { SmallTagLabelComponent } from "../../components/small-tag-label/small-tag-label.component";
import { CollectionModalComponent } from '../../components/collection-modal/collection-modal.component';
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";


@Component({
  selector: 'app-event-overview',
  imports: [NgIf, NgFor, OverviewHeadingComponent, ImageGalleryComponent, DatePipe, SmallTagLabelComponent, ButtonPrimaryComponent],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.css',
  animations: [fadeInOutAnimation]
})
export class EventOverviewComponent implements OnInit {
  slug: string = ''
  event: EventModel | null = null;

  constructor(
    private eventService: EventService,
    private eventDataService: EventDataService,
    private titleService: Title,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: HotToastService
  ) { }

  ngOnInit(): void {
    if (this.eventDataService.getCurrentEventOverview()) {
      this.event = this.eventDataService.getCurrentEventOverview()
      this.titleService.setTitle(`${this.event?.officialName} - Overview`)
    } else {
      this.activatedRoute.paramMap.subscribe({
        next: (params: any) => {
          this.slug = params.get('event-slug');
          if (this.slug) {
            this.eventService.getEventOverviewBySlug(this.slug).subscribe({
              next: (response: any) => {
                this.event = response as EventModel
                this.titleService.setTitle(`${this.event?.officialName} - Overview`)
              },
              error: (error: Error) => {
                console.error(error)
              }
            })
          }
        }
      })
    }
  }

  openCollectionDialog(){
    const dialogRef = this.dialog.open(CollectionModalComponent, {
      width: '300px',
      data: {name: this.event?.officialName, objectId: this.event?.id, type: 'EVENT'}
    })
  }
}
