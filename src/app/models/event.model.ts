import { TagModel } from "./category.model";

export class EventShorthandModel {
    constructor(
        public id: number,
        public slug: string,
        public officialName: string,
        public smallDescriptionBs: string,
        public smallDescriptionEn: string,
        public categoryNameBs: string,
        public categoryNameEn: string,
        public eventTags: TagModel[],
        public startDate: string,
        public thumbnailImage: string
    ) { }
}