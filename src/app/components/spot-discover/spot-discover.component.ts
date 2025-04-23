import { Component, Input, SimpleChanges } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spot-discover',
  imports: [NgIf],
  templateUrl: './spot-discover.component.html',
  styleUrl: './spot-discover.component.css'
})
export class SpotDiscoverComponent {
  @Input() spot : SpotShorthand | null = null;

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
