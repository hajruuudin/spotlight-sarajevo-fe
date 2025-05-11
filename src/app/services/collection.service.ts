import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionCreateModel } from '../models/collection-model';

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

  getAllCustomCollections(){}

  addCustomCollection(request: CollectionCreateModel){
    return this.http.post(`/api/collection/custom`, request, {
      withCredentials: true
    })
  } // DOdati da se provjerava ime
}
