import { Component, Input } from '@angular/core';
import { SpotShorthandModel } from '../../models/spot.model';

@Component({
  selector: 'app-search-spot-card',
  imports: [],
  templateUrl: './search-spot-card.html',
  styleUrl: './search-spot-card.css',
  host: {
    class: 'w-full bg-black h-auto rounded-2xl outline-2 outline-(--primary-200) hover:outline-2 hover:outline-(--primary-500) flex flex-row justify-between items-stretch group'
  }
})
export class SearchSpotCard {
  @Input() classAddons: String = "";
  @Input() spotShorthand!: SpotShorthandModel;
}
