import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  imports: [NgFor, NgIf],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent {
  @Input() thumbnailImage!: string;
  @Input() images: string[] = [];

  previewOpen = false;
  currentIndex = 0;

  openPreview(index: number): void {
    this.currentIndex = index;
    this.previewOpen = true;
  }

  closePreview(): void {
    this.previewOpen = false;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }
}
