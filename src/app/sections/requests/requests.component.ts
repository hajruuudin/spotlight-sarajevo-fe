import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { CommunityReqeustModel } from '../../models/community-request-model';
import { CommunityReqeustService } from '../../services/community-reqeust.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunityRequestCardComponent } from "../../components/community-request-card/community-request-card.component";
import { NgFor, NgIf } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-requests',
  imports: [NgFor, NgIf, HeadingComponent, CommunityRequestCardComponent, NotFoundComponent, NgxSpinnerComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit{
  protected allRequests: CommunityReqeustModel[] = []

  constructor(
    private communityService: CommunityReqeustService,
    private toastr: HotToastService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    this.fetchItems()
  }

  fetchItems(){
    this.communityService.getAllRequests().subscribe({
      next: (request: any) => {
        this.allRequests = request as CommunityReqeustModel[]
        console.log(this.allRequests)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error)
      }
    })
  }
  
  deleteItem(itemId: number){
    this.spinner.show()
    this.communityService.deleteRequest(itemId).subscribe({
      next: (response : any) => {
        this.spinner.hide()
        this.toastr.success('Item deleted!')
        this.fetchItems()
      }
    })
  }
}
