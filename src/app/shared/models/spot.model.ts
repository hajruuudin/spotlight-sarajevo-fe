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
        public categoryNameEn: String,
        public categoryNameBs: String,
        public spotTags: TagModel[],
        public latitude: number,
        public longitude: number,
        public combinedRating: number,
        public combinedAtmosphere: number,
        public combinedAccessibility: number,
        public combinedStaffKindness: number,
        public combinedAffordability: number,
        public combinedCleanliness: number,
        public combinedLocaleQuality: number,
        public reviews: SpotReviewModel[],
        public workHours: SpotWorkHoursModel[],
        public thumbnailImage: string,
        public images: string[]
    ){}
}

export class SpotReviewModel{
    constructor(
        public id: number,
        public userId: number,
        public username: string,
        public spotId: number,
        public header: string,
        public body: string,
        public userOverallRating: number,
        public userAtmosphere: number,
        public userAccessibility: number,
        public userStaffKindness: number,
        public userAffordability: number,
        public userCleanliness: number,
        public userLocaleQuality: number,
        public modified: string
    ){}
}

export class SpotReviewCreateModel{
    constructor(
        public spotId: number,
        public header: string,
        public body: string,
        public userOverallRating: number,
        public userAtmosphere: number,
        public userAccessibility: number,
        public userStaffKindness: number,
        public userAffordability: number,
        public userCleanliness: number,
        public userLocaleQuality: number
    ){}
}

export class SpotReviewUpdateModel{
    constructor(
        public id: number,
        public userId: number,
        public spotId: number,
        public header: string,
        public body: string,
        public userOverallRating: number,
        public userAtmosphere: number,
        public userAccessibility: number,
        public userStaffKindness: number,
        public userAffordability: number,
        public userCleanliness: number,
        public userLocaleQuality: number
    ){}
}

export class SpotReviewDeleteModel{
    constructor(
        public id: number,
        public userId: number,
        public spotId: number
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