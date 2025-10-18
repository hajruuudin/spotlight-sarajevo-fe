import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-event-search',
  imports: [PageHeader],
  templateUrl: './event-search.html',
  styleUrl: './event-search.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class EventSearch {

}
