import { Component, HostListener, Input } from '@angular/core';
import { EventCategoryModel, SpotCategoryModel } from '../../models/category.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [NgClass],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css'
})
export class CategoryCard {
  protected isDescriptionShown: Boolean = false

  @Input() spotCategoryModel: SpotCategoryModel | null = null
  @Input() eventCategoryModel: EventCategoryModel | null = null

  @HostListener('mouseenter')
  onEnter(){
    this.isDescriptionShown = true
  }

  @HostListener('mouseleave')
  onLeave(){
    this.isDescriptionShown = false
  }
}
