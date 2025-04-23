import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spot-headline',
  imports: [NgIf],
  templateUrl: './spot-headline.component.html',
  styleUrl: './spot-headline.component.css'
})
export class SpotHeadlineComponent {
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
