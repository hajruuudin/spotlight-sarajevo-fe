import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-map-popup',
  imports: [],
  templateUrl: './map-popup.component.html',
  styleUrl: './map-popup.component.css'
})
export class MapPopupComponent {
  @Input() spotName!: String
  @Input() spotSlug!: String
  @Input() spotImageUrl!: String
  @Input() spotCategory!: String
  @Output() navigateClicked = new EventEmitter<String>();

  onNavigateClicked(){
    this.navigateClicked.emit(this.spotSlug)
  }
}
