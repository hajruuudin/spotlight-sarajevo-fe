import { Component } from '@angular/core';
import { HeadingComponent } from "../../components/heading/heading.component";
import { HttpClient } from '@angular/common/http';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-homepage',
  imports: [HeadingComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private tagService : TagService) {}

  fetchData(){
    this.tagService.fetchData()
  }
}
