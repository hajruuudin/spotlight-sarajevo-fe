import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../models/category-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-category-block',
  imports: [NgIf],
  templateUrl: './category-block.component.html',
  styleUrl: './category-block.component.css'
})
export class CategoryBlockComponent {
  @Input() category : CategoryModel | null = null
  @Input() navigateToCategorySearch :  (categoryId: number) => void = () => {}
}
