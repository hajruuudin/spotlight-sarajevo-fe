import { Component } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { HotToastService } from '@ngxpert/hot-toast';
import { ButtonRegularComponent } from "../../components/button-regular/button-regular.component";
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { CommunityReqeustCreate, CommunityReqeustModel } from '../../models/community-request-model';
import { CommunityReqeustService } from '../../services/community-reqeust.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-community-request-add',
  imports: [HeadingComponent, ReactiveFormsModule, ButtonPrimaryComponent, NgxSpinnerComponent],
  templateUrl: './community-request-add.component.html',
  styleUrl: './community-request-add.component.css'
})
export class CommunityRequestAddComponent {
  protected requestForm: FormGroup

  constructor(
    private communityService: CommunityReqeustService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: HotToastService
  ){
    this.requestForm = this.fb.group({
      'requestType' : ['', Validators.required],
      'objectType' : ['', Validators.required],
      'requestName' : ['', Validators.required],
      'requestDescription' : ['', Validators.required],
    })
  }

  makeRequest(){
    if(!this.requestForm.valid){
      this.toastr.warning('Please fill in all the fields!')
    } else {
      this.spinner.show()
      const formValues = this.requestForm.value

      let request = new CommunityReqeustCreate(
        formValues.objectType,
        formValues.requestType,
        formValues.requestName,
        formValues.requestDescription
      )

      this.communityService.addRequest(request).subscribe({
        next: (request: CommunityReqeustModel) => {
          this.spinner.hide()
          this.toastr.success(`Community request added: ${request.requestName}`)
        },
        error: (error: HttpErrorResponse) => {
          this.spinner.hide()
          this.toastr.error(error.message)
        }
      })
    }
  }
}
