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

export class EventOverviewModel {
    constructor(
            public id: number,
            public slug: string,
            public officialNameBs: string,
            public officialNameEn: string,
            public smallDescriptionBs: string,
            public smallDescriptionEn: string,
            public fullDescriptionBs: string,
            public fullDescriptionEn: string,
            public eventLat: number,
            public eventLon: number,
            public location: string,
            public locationLinkSlug: string,
            public categoryNameEn: String,
            public categoryNameBs: String,
            public eventTags: TagModel[],
            public startDate: string,
            public endDate: string,
            public entryPrice: number,
            public cancelRefund: boolean,
            public eventLanguage: string,
            public ageLimit: number,
            public reservation: boolean,
            public organiser: EventOrganiserModel,
            public thumbnailImage: string,
            public images: string[]
        ){}
}

export class EventOrganiserModel{
    constructor(
        public id: number,
        public organiserName: string,
        public organiserCreationDate: string,
        public organiserCategoryNameBs: string,
        public organiserCategoryNameEn: string,
        public organiserPhone: string,
        public organiserEmail: string,
        public organiserWebsite: string,
        public thumbnailImage: string
    ){}
}

export class EventOrganiserReviewModel{
    constructor(
        public id: number,
        public organiserId: number,
        public userId: number,
        public username: number,
        public created: string,
        public modified: string,
        public header: string,
        public body: string,
        public userOrganiserQuality: number,
        public userOrganiserAtmosphere: number,
        public userOrganiserEnjoyability: number,
    ){}
}

export class EventOrganiserReviewCreateModel{
    constructor(
        public organiserId: number,
        public header: string,
        public body: string,
        public userOrganiserQuality: number,
        public userOrganiserAtmosphere: number,
        public userOrganiserEnjoyability: number,
    ){}
}

export class EventOrganiserReviewUpdateModel{
    constructor(
        public id: number,
        public organiserId: number,
        public userId: number,
        public header: string,
        public body: string,
        public userOrganiserQuality: number,
        public userOrganiserAtmosphere: number,
        public userOrganiserEnjoyability: number,
    ){}
}