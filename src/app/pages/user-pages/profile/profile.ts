import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-profile',
  imports: [PageHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Profile {

}
