import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-spot-search',
  imports: [PageHeader],
  templateUrl: './spot-search.html',
  styleUrl: './spot-search.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class SpotSearch {

}
