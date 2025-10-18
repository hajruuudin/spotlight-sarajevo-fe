import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-homepage',
  imports: [PageHeader],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Homepage {

}
