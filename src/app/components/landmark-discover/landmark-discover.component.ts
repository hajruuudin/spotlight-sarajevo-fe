import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-landmark-discover',
  imports: [NgIf],
  templateUrl: './landmark-discover.component.html',
  styleUrl: './landmark-discover.component.css'
})
export class LandmarkDiscoverComponent {
  @Input() landmark: SpotShorthand | null = null;
  @Input() navigateToLandmarkOverview: (spotId: number) => void = () => {};
  
  randomTag: string | null = null;

  ngOnInit(): void {
    this.setRandomTag();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['landmark'] && changes['landmark'].currentValue) {
      this.setRandomTag();
    }
  }

  setRandomTag(): void {
    if (this.landmark?.tagNames && this.landmark.tagNames.length > 0) {
      this.randomTag = this.landmark.tagNames[Math.floor(Math.random() * this.landmark.tagNames.length)];
    } else {
      this.randomTag = null; // Or some default value
    }
  }
}
