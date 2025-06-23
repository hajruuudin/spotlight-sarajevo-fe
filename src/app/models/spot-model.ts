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
    created: Date;
    modified: Date;
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

export class SpotUpdateModel {
  constructor(
    public id: number,
    public officialName: string,
    public slug: string,
    public categoryName: string,
    public address: string,
    public lat: number,
    public lon: number,
    public fullDescription: string,
    public smallDescription: string,
    public mondayStartTime: string,
    public mondayEndTime: string,
    public tuesdayStartTime: string,
    public tuesdayEndTime: string,
    public wednesdayStartTime: string,
    public wednesdayEndTime: string,
    public thursdayStartTime: string,
    public thursdayEndTime: string,
    public fridayStartTime: string,
    public fridayEndTime: string,
    public saturdayStartTime: string,
    public saturdayEndTime: string,
    public sundayStartTime: string,
    public sundayEndTime: string,
    public affordability: number,
    public atmosphere: number,
    public overallQuality: number,
    public cleanliness: number,
    public staffKindness: number,
    public accessibility: number,
    public tag: string[]
  ) {}
}
