import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-transport',
  imports: [PageHeader],
  templateUrl: './transport.html',
  styleUrl: './transport.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Transport {

}
