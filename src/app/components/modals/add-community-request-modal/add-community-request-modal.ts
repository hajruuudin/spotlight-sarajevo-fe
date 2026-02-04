import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { SessionService } from '../../../core/services/session.service';
import { CommunityRequestService } from '../../../services/community.request.service';

@Component({
  selector: 'app-add-community-request-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-community-request-modal.html',
  styleUrl: './add-community-request-modal.css'
})
export class AddCommunityRequestModal implements OnInit{
  protected spotForm: FormGroup
  protected eventForm: FormGroup
  protected close!: (result?: any) => void

  // Space for standard form values that will be used to mimic creating a spot or event

  constructor(
    private toastr: HotToastService,
    private session: SessionService,
    private crService: CommunityRequestService,
    private fb: FormBuilder
  ){
    this.spotForm = this.fb.group({
      'somevalue' : [Validators.required, 'default']
    })

    this.eventForm = this.fb.group({
      'somevalue' : [Validators.required, 'default']
    })
  }

  ngOnInit(): void {
    
  }

  // Once the user
  onSpotFormSubmit(){
    if (!this.spotForm.valid){ /* TODO: in case some values are deemed to be required */
      this.toastr.info(this.session.getLanguage() == "en" ? 'Please fill in all the values' : "Molim vas unesite sve potreben informacije")
    } else {
      // Form logic which depends on if the thing is an event or a spot
    }
  }

  onEventFormSubmit(){
    if (!this.eventForm.valid){ /* TODO: in case some values are deemed to be required */
      this.toastr.info(this.session.getLanguage() == "en" ? 'Please fill in all the values' : "Molim vas unesite sve potreben informacije")
    } else {
      // Form logic which depends on if the thing is an event or a spot
    }
  }

  onClose(){
    this.close({ type: 'cancel' });
  }

}
