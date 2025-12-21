import { ResolveFn } from "@angular/router";
import { CollectionItemsModel, CollectionModel } from "../../shared/models/collection.model";
import { inject } from "@angular/core";
import { CollectionService } from "../../services/collection.service";
import { map, of, switchMap } from "rxjs";
import { error } from "console";
import { HttpErrorResponse } from "@angular/common/http";

export interface CollectionPageData {
  userCollections: CollectionModel[];
  selectedCollection: CollectionItemsModel | null;
}

export const collectionsResolver: ResolveFn<CollectionPageData> = (route, state) => {
  const collectionService = inject(CollectionService);

  return collectionService.findUserCollections().pipe(
    switchMap((collections: CollectionModel[]) => {
      if (!collections || collections.length === 0) {
        return of({ userCollections: collections, selectedCollection: null });
      }

      return collectionService.findCollectionItems(collections[0].id).pipe(
        map((selected: CollectionItemsModel) => ({
          userCollections: collections,
          selectedCollection: selected
        }))
      );
    })
  );
};