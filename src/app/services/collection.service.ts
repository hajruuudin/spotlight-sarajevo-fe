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

  getAllCustomCollections(){
    // returns the custom collections of a user
  }

  addCustomCollection(request: CollectionCreateModel){
    return this.http.post(`/api/collection/custom`, request, {
      withCredentials: true
    })
  } // DOdati da se provjerava ime

  getCollectionsWithItemStatus(objectId: number, objectType: string){
    return this.http.get(`/api/collection/all?objectId=${objectId}&objectType=${objectType}`, {
      withCredentials: true
    })
  }

  addItemToCollection(collectionName: string, objectId: number){
    return this.http.post(`/api/collection/addObject?collectionName=${collectionName}&objectId=${objectId}`, {}, {
      withCredentials: true
    })
  }

  removeItemFromCollection(collectionName: string, objectId: number){
    return this.http.delete(`/api/collection/removeObject?collectionName=${collectionName}&objectId=${objectId}`, {
      withCredentials: true
    })
  }
}
