export class SpotCategoryModel{
    constructor(
        public id: number,
        public spotCategoryNameBs: string,
        public spotCategoryNameEn: string,
        public spotCategoryDescriptionBs: string,
        public spotCategoryDescriptionEn: string,
        public spotCategoryColorCode: string
    ){}
}

export class EventCategoryModel{
    constructor(
        public id: number,
        public eventCategoryNameBs: string,
        public eventCategoryNameEn: string,
        public eventCategoryDescriptionBs: string,
        public eventCategoryDescriptionEn: string,
        public eventCategoryColorCode: string
    ){}
}