/*====== SPOT MODELS ======*/
/* Includes all DTO class models from the Spot API on the backend */

import { TagModel } from "./category.model";

export class SpotShorthandModel {
    constructor(
        public id: number,
        public slug: string,
        public officialName: string,
        public smallDescriptionBs: string,
        public smallDescriptionEn: string,
        public categoryNameBs: string,
        public categoryNameEn: string,
        public spotTags: TagModel[],
        public combinedRating: number,
        public thumbnailImage: string
    ){}
}