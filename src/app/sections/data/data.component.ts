import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { SpotService } from '../../services/spot.service';
import { SpotShorthand } from '../../models/spot-model';
import { EventShorthand } from '../../models/event-model';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SsTableComponent } from "../../components/ss-table/ss-table.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data',
  imports: [HeadingComponent, SsTableComponent, SearchBarComponent, ReactiveFormsModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit{
  protected spotShorthands: SpotShorthand[] = []
  protected eventShorthands: EventShorthand[] = []

  protected spotPageNumber: number = 0
  protected spotPageSize: number = 5
  protected spotMaxPage: number = 99;

  protected eventPageNumber: number = 0;
  protected eventPageSize: number = 5;
  protected eventMaxPage: number = 99;

  protected spotSearchForm: FormGroup;
  protected eventSearchForm: FormGroup;

  constructor(
    private spotService: SpotService,
    private eventService: EventService,
    private fb: FormBuilder
  ){
    this.spotSearchForm = this.fb.group({
      'searchTerm' : ['']
    })

    this.eventSearchForm = this.fb.group({
      'searchTerm' : ['']
    })
  }

  ngOnInit(): void { 
    this.fetchSpots('', this.spotPageNumber)
    this.fetchEvents('', this.eventPageNumber)
  }

  fetchSpots(searchTerm: string, pageNumber: number){
    this.spotService.getSpotShorthands(searchTerm, '', [], pageNumber, this.spotPageSize).subscribe({
      next: (response : any) => {
        this.spotShorthands = response['content'] as SpotShorthand[]
        this.spotMaxPage = response['totalPages'] as number
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    })
  }

  fetchEvents(searchTerm: string, pageNumber: number){
    this.eventService.getEventsShorthand(searchTerm, '', [], pageNumber, this.eventPageSize).subscribe({
      next: (response : any) => {
        this.eventShorthands = response['content'] as EventShorthand[]
        this.eventMaxPage = response['totalPages'] as number
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    })
  }

  handleNextPage(tableType: string){
    if(tableType == "SPOT"){
      this.spotPageNumber++;
      this.fetchSpots(this.spotSearchForm.get('searchTerm')?.value, this.spotPageNumber)
    } else {
      this.eventPageNumber++;
      this.fetchEvents(this.eventSearchForm.get('searchTerm')?.value, this.eventPageNumber)
    }
  }

  handlePreviousPage(tableType: string){
    if(tableType == "SPOT"){
      this.spotPageNumber--;
      this.fetchSpots(this.spotSearchForm.get('searchTerm')?.value, this.spotPageNumber)
    } else {
      this.eventPageNumber--;
      this.fetchEvents(this.eventSearchForm.get('searchTerm')?.value, this.eventPageNumber)
    }
  }

  handleSpotSearchTerm(spotSearchTerm: string){
    this.fetchSpots(spotSearchTerm, this.spotPageNumber)
  }

  handleSpotUpdate(formData: any){
    
  }

  formatSpotUpdateData(){
    //Format the spot for the backend
  }

  updateSpot(){
    // Finnally update the spot
  }

  handleEventSearchTerm(eventSearchTerm: string){
    this.fetchEvents(eventSearchTerm, this.eventPageNumber)
  }

  handleEventUpdate(formData: any){

  }

  formatEventUpdateData(){
    //Format the event for the backend
  }

  updateEvent(){
    // Finnally update the event
  }

  
}
