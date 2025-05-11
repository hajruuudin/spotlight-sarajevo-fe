import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient
  ) {}

  getCollection(collectionName: string){
    return this.http.get(`/api/collection/collection-by-name?collectionName=${collectionName}`, {
      withCredentials: true
    })
  }

  addCustomCollection(collectionName: string, collectionType: string){
    return this.http.post(`/api/collection/custom`, {collectionName, collectionType}, {
      withCredentials: true
    })
  }

}
