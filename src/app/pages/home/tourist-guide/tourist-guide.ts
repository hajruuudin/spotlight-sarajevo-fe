import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-tourist-guide',
  imports: [PageHeader],
  templateUrl: './tourist-guide.html',
  styleUrl: './tourist-guide.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class TouristGuide {

}
