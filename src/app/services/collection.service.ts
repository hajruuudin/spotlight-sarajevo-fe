import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CollectionAddItemModel, CollectionCreateModel, CollectionItemsModel, CollectionModel, CollectionUpdateModel } from '../shared/models/collection.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  /* ============================================================= */
  /* =================== COLLECTION MANAGEMENT =================== */
  /* ============================================================= */

  findUserCollections() {
    return this.http.get<CollectionModel[]>(
      this.apiUrl + `/collection/all`, 
      {
        withCredentials: true,
      }
    );
  }

  addCollection(collectionCreate: CollectionCreateModel) {
    return this.http.post<CollectionModel>(
      this.apiUrl + `/collection`, 
      collectionCreate, 
      {
        withCredentials: true,
      }
    );
  }

  updateCollection(collectionUpdate: CollectionUpdateModel) {
    return this.http.put<CollectionModel>(
      this.apiUrl + `/collection`, 
      collectionUpdate, 
      {
        withCredentials: true,
      }
    );
  }

  deleteCollection(collectionId: number) {
    return this.http.delete<CollectionModel>(
      this.apiUrl + `/collection/delete/${collectionId}`, 
      {
        withCredentials: true,
      }
    );
  }

  /* ============================================================= */
  /* ====================== ITEM MANAGEMENT ====================== */
  /* ============================================================= */

  findCollectionItems(collectionId: number) {
    return this.http.get<CollectionItemsModel>(
      this.apiUrl + `/collection/${collectionId}/items`,
      {
        withCredentials: true,
      }
    );
  }

  addItemToCollection(itemAdd: CollectionAddItemModel) {
    return this.http.post<CollectionItemsModel>(
      this.apiUrl + `/collection/add-item`, 
      itemAdd, 
      {
        withCredentials: true,
      }
    );
  }

  removeItemFromCollection(collectionId: number, itemId: number, collectionType: string) {
    return this.http.delete<CollectionItemsModel>(
      this.apiUrl + `/collection/remove-item?collectionId=${collectionId}&itemId=${itemId}&collectionType=${collectionType}`,
      {
        withCredentials: true,
      }
    );
  }
}