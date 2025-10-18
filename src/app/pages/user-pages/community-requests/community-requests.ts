import { Component } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";

@Component({
  selector: 'app-community-requests',
  imports: [PageHeader],
  templateUrl: './community-requests.html',
  styleUrl: './community-requests.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class CommunityRequests {

}
