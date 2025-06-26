import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommunityReqeustModel } from '../../models/community-request-model';
import { ButtonRegularComponent } from "../button-regular/button-regular.component";
import { ButtonPrimaryComponent } from "../button-primary/button-primary.component";

@Component({
  selector: 'app-community-request-card',
  imports: [ButtonPrimaryComponent],
  templateUrl: './community-request-card.component.html',
  styleUrl: './community-request-card.component.css'
})
export class CommunityRequestCardComponent {
  @Input() request!: CommunityReqeustModel;
  @Output() deletePressed: EventEmitter<boolean> = new EventEmitter<boolean>()

  onDeletePressed(itemId: number){
    this.deletePressed.emit();
  }
}
