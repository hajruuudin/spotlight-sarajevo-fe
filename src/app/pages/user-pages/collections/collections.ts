import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-collections',
  imports: [PageHeader],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Collections {

}
