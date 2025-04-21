import { Component, Input } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';

@Component({
  selector: 'app-spot-headline',
  imports: [],
  templateUrl: './spot-headline.component.html',
  styleUrl: './spot-headline.component.css'
})
export class SpotHeadlineComponent {
  @Input() spot: SpotShorthand | null = null;
  @Input() navigateToSpotOverview: (spotId: number) => void = () => {};
}
