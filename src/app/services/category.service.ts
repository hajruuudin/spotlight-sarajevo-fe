import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = "/api/category";

  constructor(private http: HttpClient) {}

  fetchCategories(){
    return this.http.get(this.apiUrl, {
      withCredentials: true
    });
  }
}
