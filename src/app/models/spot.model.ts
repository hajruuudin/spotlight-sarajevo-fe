// export class SpotShorthandModel {
//     constructor(
//         public spotId: number,
//         public spotOfficialName: String,
//         public spotSmallDescription: String,
//         public spotCategory: String,
//         public spotThumbnailImage: String,
//         public spotRating: String,
//         public spotTags: String[]
//     ){}
// }

export class SpotShorthandModel {
    constructor(
        public id: number,
        public slug: string,
        public officialName: string,
        public smallDescriptionBs: string,
        public smallDescriptionEn: string,
        public categoryNameBs: string,
        public categoryNameEn: string,
        public combinedRating: number,
        public thumbnailImage: string
    ){}
}