import { EventShorthand } from "./event-model";
import { SpotShorthand } from "./spot-model";

export interface CollectionModel{
    id: number,
    collectionName: string,
    collectionType: string,
    collectionItems: (SpotShorthand | EventShorthand)[];
}