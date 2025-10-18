import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-discover',
  imports: [PageHeader],
  templateUrl: './discover.html',
  styleUrl: './discover.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Discover {

}
