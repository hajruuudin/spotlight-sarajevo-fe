export class SpotShorthandModel {
    constructor(
        public spotId: number,
        public spotOfficialName: String,
        public spotSmallDescription: String,
        public spotCategory: String,
        public spotThumbnailImage: String,
        public spotRating: String,
        public spotTags: String[]
    ){}
}