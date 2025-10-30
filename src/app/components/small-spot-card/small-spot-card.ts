import { Component, Input } from '@angular/core';
import { SpotShorthandModel } from '../../models/spot.model';

@Component({
  selector: 'app-small-spot-card',
  imports: [],
  templateUrl: './small-spot-card.html',
  styleUrl: './small-spot-card.css'
})
export class SmallSpotCard {
  @Input() classAddons: String = '';
  @Input() spotShorthand!: SpotShorthandModel;
}
