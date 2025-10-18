import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
  host: {
    class: 'w-full flex flex-col jusitfy-center items-center space-y-2'
  }
})
export class PageHeader {
  @Input() public title : string = "DEFAULT"
  @Input() public subtitle : string = "DEFAULT_SUBTITLE"
}
