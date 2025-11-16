import { Component, Input } from '@angular/core';
import { SpotShorthandModel } from '../../models/spot.model';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-search-spot-card',
  imports: [],
  templateUrl: './search-spot-card.html',
  styleUrl: './search-spot-card.css',
  host: {
    class: 'w-full dark:bg-black bg-(--primary-200) h-auto rounded-2xl outline-2 dark:outline-(--primary-200) outline-(--primary-700) hover:outline-2 hover:dark:outline-(--primary-500) hover:outline-(--primary-100) flex flex-row justify-between items-stretch group'
  }
})
export class SearchSpotCard {
  @Input() lang: String = 'en'
  @Input() classAddons: String = "";
  @Input() spotShorthand!: SpotShorthandModel;
}
