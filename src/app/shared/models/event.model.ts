/*====== EVENT MODELS ======*/
/* Includes all DTO class models from the Event API on the backend */

import { TagModel } from "./category.model";

export class EventShorthandModel {
    constructor(
        public id: number,
        public slug: string,
        public officialNameBs: string,
        public officialNameEn: string,
        public smallDescriptionBs: string,
        public smallDescriptionEn: string,
        public categoryNameBs: string,
        public categoryNameEn: string,
        public eventTags: TagModel[],
        public startDate: string,
        public thumbnailImage: string
    ) { }
}