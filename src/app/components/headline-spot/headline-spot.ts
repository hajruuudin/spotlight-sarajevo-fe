import { Component, Input } from '@angular/core';
import { SpotShorthandModel } from '../../models/spot.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-headline-spot',
  imports: [NgClass],
  templateUrl: './headline-spot.html',
  styleUrl: './headline-spot.css'
})
export class HeadlineSpot {
  @Input() classAddons: String = '';
  @Input() spotShorthand!: SpotShorthandModel
}
