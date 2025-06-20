import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get("/api/tag", {
      withCredentials: true
    })
  }
}
