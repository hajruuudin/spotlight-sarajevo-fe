import { Component, Input } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';

@Component({
  selector: 'app-spot-discover',
  imports: [],
  templateUrl: './spot-discover.component.html',
  styleUrl: './spot-discover.component.css'
})
export class SpotDiscoverComponent {
  @Input() spot : SpotShorthand | null = null;
}
