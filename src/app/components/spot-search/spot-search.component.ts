import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spot-search',
  imports: [NgIf],
  templateUrl: './spot-search.component.html',
  styleUrl: './spot-search.component.css'
})
export class SpotSearchComponent {
  @Input() spot: SpotShorthand | null = null;
  @Input() navigateToSpotOverview: (spotId: number) => void = () => {};
  
  randomTag: string | null = null;

  ngOnInit(): void {
    this.setRandomTag();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['spot'] && changes['spot'].currentValue) {
      this.setRandomTag();
    }
  }

  setRandomTag(): void {
    if (this.spot?.tagNames && this.spot.tagNames.length > 0) {
      this.randomTag = this.spot.tagNames[Math.floor(Math.random() * this.spot.tagNames.length)];
    } else {
      this.randomTag = null; // Or some default value
    }
  }
}
