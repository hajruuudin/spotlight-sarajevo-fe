import { WorkHoursDB } from "./util-model";

export interface SpotShorthand{
    id: number;
    slug: string;
    officialName: string,
    smallDescription: string,
    categoryName: string,
    tagNames: string[],
    rating: DoubleRange,
    imageUrl: string;
}

export class SpotModel {
    constructor(
        public id: number,
        public slug: string,
        public officialName: string,
        public smallDescription: string,
        public fullDescription: string,
        public rating: number,
        public latitude: number,
        public longitude: number,
        public categoryName: string,
        public address: string,
        public tagNames: string[],
        public cleanliness: number,
        public affordability: number,
        public accessibility: number,
        public staffKindness: number,
        public quality: number,
        public atmosphere: number,
        public workHours: WorkHoursDB[],
        public reviews: object[],
        public created: Date,
        public createdBy: string,
        public modified: Date,
        public modifiedBy: string,
        public imageUrl: string,
    ) { }
}