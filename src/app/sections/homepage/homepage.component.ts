import { Component } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { HttpClient } from '@angular/common/http';
import { TagServiceService } from '../../controller/services/tag-service.service';

@Component({
  selector: 'app-homepage',
  imports: [HeadingComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private tagService : TagServiceService) {}

  fetchData(){
    this.tagService.fetchData()
  }
}
