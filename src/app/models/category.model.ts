export class SpotCategoryModel{
    constructor(
        private id: number,
        private spotCategoryNameBs: string,
        private spotCategoryNameEn: string,
        private spotCategoryDescriptionBs: string,
        private spotCategoryDescriptionEn: string,
    ){}
}

export class EventCategoryModel{
    constructor(
        private id: number,
        private eventCategoryNameBs: string,
        private eventCategoryNameEn: string,
        private eventCategoryDescriptionBs: string,
        private eventCategoryDescriptionEn: string,
    ){}
}