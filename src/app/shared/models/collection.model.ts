export class CollectionModel {
  constructor(
    public id: number,
    public collectionName: string,
    public collectionDescription: string,
    public collectionType: 'SPOT' | 'EVENT' | string,
    public created: string,
    public createdBy: string,
    public userId: number
  ) {}
}

export class CollectionItemsModel {
  constructor(
    public collectionId: number,
    public collectionType: string,
    public collectionItems: CollectionItem[]
  ) {}
}

export class CollectionCreateModel {
  constructor(
    public collectionName: string,
    public collectionDescription: string,
    public collectionType: 'SPOT' | 'EVENT' | string
  ) {}
}

export class CollectionUpdateModel {
  constructor(
    public id: number,
    public collectionName: string,
    public collectionDescription: string
  ) {}
}

export class CollectionAddItemModel {
  constructor(
    public objectId: number,
    public objectType: string,
    public collectionId: number
  ) {}
}

export class CollectionSpotModel implements CollectionItem {
  constructor(
    public id: number,
    public collectionId: number,
    public spotId: number
  ) {}
}

export class CollectionEventModel implements CollectionItem{
  constructor(
    public id: number,
    public collectionId: number,
    public eventId: number
  ) {}
}

export interface CollectionItem{}