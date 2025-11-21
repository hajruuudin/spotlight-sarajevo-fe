/*====== SPOT MODELS ======*/
/* Includes all DTO class models from the Spot API on the backend */

import { TagModel } from "./category.model";

export class SpotShorthandModel {
    constructor(
        public id: number,
        public slug: string,
        public officialNameBs: string,
        public officialNameEn: string,
        public smallDescriptionBs: string,
        public smallDescriptionEn: string,
        public categoryNameBs: string,
        public categoryNameEn: string,
        public spotTags: TagModel[],
        public combinedRating: number,
        public thumbnailImage: string
    ){}
}

export class SpotOverviewModel {
    constructor(
        public id: number,
        public slug: string,
        public officialNameBs: string,
        public officialNameEn: string,
        public smallDescriptionBs: string,
        public smallDescriptionEn: string,
        public fullDescriptionBs: string,
        public fullDescriptionEn: string,
        public address: string,
        public categoryName: String,
        public spotTags: TagModel[],
        public latitude: number,
        public longitude: number,
        public combinedOverallRating: number,
        public combinedAtmosphere: number,
        public combinedAccessibility: number,
        public combinedStaffKindness: number,
        public combinedAffordability: number,
        public combinedCleanliness: number,
        public combinedLocaleQuality: number,
        public reviews: SpotReviewModel[],
        public workHours: SpotWorkHoursModel[]
    ){}
}

export class SpotReviewModel{
    constructor(
        public id: number,
        public userId: number,
        public header: string,
        public body: string,
        public reviewRating: number,
        public reviewAtmosphere: number,
        public reviewAccessibility: number,
        public reviewStaffKindness: number,
        public reviewAffordability: number,
        public reviewCleanliness: number,
        public reviewQuality: number
    ){}
}

export class SpotWorkHoursModel{
    constructor(
        public dayIndex: number,
        public day: string,
        public startTime: string,
        public endTime: string,
        public spotId: number
    ){}
}