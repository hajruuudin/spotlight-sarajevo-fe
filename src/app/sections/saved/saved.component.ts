import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { MatDialog } from '@angular/material/dialog';
import { AddListModalComponent } from '../../components/add-list-modal/add-list-modal.component';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";
import { SessionService } from '../../services/session.service';
import { NgFor, NgIf } from '@angular/common';
import { CollectionService } from '../../services/collection.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollectionModel, CollectionWithItemsModel } from '../../models/collection-model';
import { SpotSearchComponent } from "../../components/spot-search/spot-search.component";
import { SpotShorthand } from '../../models/spot-model';
import { EventShorthand } from '../../models/event-model';
import { EventSearchComponent } from "../../components/event-search/event-search.component";
import { fadeInOutAnimation } from '../../animations/app.animations';
import { Title } from '@angular/platform-browser';
import { KebabCasePipe } from '../../pipes/kebab-case.pipe';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";

@Component({
  selector: 'app-saved',
  imports: [NgIf, NgFor, KebabCasePipe, ReactiveFormsModule, HeadingComponent, ButtonRegularComponent, SpotSearchComponent, EventSearchComponent, NotFoundComponent, ButtonPrimaryComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css',
  animations: [fadeInOutAnimation]
})
export class SavedComponent implements OnInit{
  dialogResult = '';
  displayedCollection : CollectionWithItemsModel | null = null
  customCollections : CollectionModel[] | null = null;

  collectionsForm: FormGroup

  constructor(
    public dialog: MatDialog,
    private collectionService: CollectionService,
    private titleService: Title,
    public session: SessionService,
    private fb: FormBuilder
  ) {
    this.collectionsForm = this.fb.group({
      "collection-option" : ['All Spots']
    })
  }
  
  ngOnInit(): void {
    this.session.currentUser$.subscribe({})
    this.titleService.setTitle("Saved Spots/Events")

    this.collectionService.getCollection("All Spots").subscribe({
      next: (response : any) => {
        console.log(response)
        this.displayedCollection = response
        
      },
      error: (error : Error) => {
        console.error(error)
      }
    })

    this.fetchCustomCollections()

    this.collectionsForm.get('collection-option')!.valueChanges.subscribe(value => {
      this.collectionService.getCollection(value).subscribe({
        next: (response : any) => {
          this.displayedCollection = response
        },
        error: (error : Error) => {
          console.error(error)
        }
      })
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListModalComponent, {
      width: '500px',
  
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.fetchCustomCollections()
      }
    });
  }

  fetchCustomCollections(){
    this.collectionService.getAllCustomCollections().subscribe({
      next: (response : any) => {
        this.customCollections = response as CollectionModel[]
      },
      error: (error: Error) => {
        console.error(error)
      }
    })
  }

  get spotItems(): SpotShorthand[] {
    return (this.displayedCollection?.collectionItems ?? []).filter(
      (item): item is SpotShorthand => this.isSpotShorthand(item)
    );
  }
  
  private isSpotShorthand(item: SpotShorthand | EventShorthand): item is SpotShorthand {
    return 'rating' in item;
  }

  get eventItems(): EventShorthand[] {
    return (this.displayedCollection?.collectionItems ?? []).filter(
      (item): item is EventShorthand => this.isEventShorthand(item)
    );
  }
  
  private isEventShorthand(item: SpotShorthand | EventShorthand): item is SpotShorthand {
    return 'startDateFormatted' in item;
  }
  
}
