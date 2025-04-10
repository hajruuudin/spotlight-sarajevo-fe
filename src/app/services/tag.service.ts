import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get("/api/tag").subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
        // Your interceptor should handle the 401 before it reaches here
        // However, you might want to handle other errors here.
      }
    });
  }
}
