import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  AddCollectionItemsModel,
  CollectionAddItemModel,
  CollectionCreateModel,
  CollectionItems,
  CollectionItemsModel,
  CollectionModel,
  CollectionUpdateModel,
  EventInCollectionModel,
  SpotInCollectionsModel,
} from '../shared/models/collection.model';

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
    return this.http.get<CollectionModel[]>(this.apiUrl + `/collection/all`, {
      withCredentials: true,
    });
  }

  addCollection(collectionCreate: CollectionCreateModel) {
    return this.http.post<CollectionModel>(this.apiUrl + `/collection`, collectionCreate, {
      withCredentials: true,
    });
  }

  updateCollection(collectionUpdate: CollectionUpdateModel) {
    return this.http.put<CollectionModel>(this.apiUrl + `/collection`, collectionUpdate, {
      withCredentials: true,
    });
  }

  deleteCollection(collectionId: number) {
    return this.http.delete<CollectionModel>(this.apiUrl + `/collection/delete/${collectionId}`, {
      withCredentials: true,
    });
  }

  /* ============================================================= */
  /* ====================== ITEM MANAGEMENT ====================== */
  /* ============================================================= */

  findCollectionItems(collectionId: number) {
    return this.http.get<CollectionItemsModel>(this.apiUrl + `/collection/${collectionId}/items`, {
      withCredentials: true,
    });
  }

  findAllSpotsCollection(){
    return this.http.get<CollectionItemsModel>(this.apiUrl + `/collection/all-spots`, {
      withCredentials: true
    })
  }

  findAllEventsCollection(){
    return this.http.get<CollectionItemsModel>(this.apiUrl + `/collection/all-events`, {
      withCredentials: true
    })
  }

  addItemToCollection(itemAdd: CollectionAddItemModel) {
    return this.http.post<CollectionItemsModel>(this.apiUrl + `/collection/add-item`, itemAdd, {
      withCredentials: true,
    });
  }

  removeItemFromCollection(collectionId: number, itemId: number, collectionType: string) {
    return this.http.delete<CollectionItemsModel>(
      this.apiUrl +
        `/collection/remove-item?collectionId=${collectionId}&itemId=${itemId}&collectionType=${collectionType}`,
      {
        withCredentials: true,
      }
    );
  }

  findSpotInCollections(spotId: number) {
    return this.http.get<SpotInCollectionsModel>(
      this.apiUrl + `/collection/find-spot-in-collections?spotId=${spotId}`,
      {
        withCredentials: true,
      }
    );
  }

  findEventInCollections(eventId: number) {
    return this.http.get<EventInCollectionModel>(
      this.apiUrl + `/collection/find-event-in-collections?eventId=${eventId}`,
      {
        withCredentials: true,
      }
    );
  }

  addItemToCollectionBulk(request: AddCollectionItemsModel) {
    return this.http.post(this.apiUrl + `/collection/add-items-bulk`, request, {
      withCredentials: true,
    });
  }

  removeItemFromCollectionBulk(collectionIds: number[], objectId: number, objectType: string) {
    const idsParam = collectionIds.join(',');

    return this.http.delete(this.apiUrl + `/collection/remove-items-bulk`, {
      params: {
        collectionIds: idsParam,
        objectId: objectId,
        objectType: objectType,
      },
      withCredentials: true,
    });
  }
}
