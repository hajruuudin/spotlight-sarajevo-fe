import { EventShorthand } from "./event-model";
import { SpotShorthand } from "./spot-model";

export interface CollectionModel{
    id: number,
    collectionName: string,
    collectionType: string,
    userId: number
}

export interface CollectionWithItemsModel{
    id: number,
    collectionName: string,
    collectionType: string,
    collectionItems: (SpotShorthand | EventShorthand)[];
}

export class CollectionCreateModel{
    constructor(
        public collectionName: string,
        public collectionType: string
    ) {}
}