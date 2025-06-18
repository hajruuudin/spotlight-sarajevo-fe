export interface EventShorthand{
    id: number;
    slug: string;
    officialName: string,
    smallDescription: string,
    categoryName: string,
    tagNames: string[],
    startDateFormatted: string,
    imageUrl: string;
    created: Date;
    modified: Date;
}

export class EventModel {
  constructor(
    public id: number,
    public slug: string,
    public officialName: string,
    public smallDescription: string,
    public fullDescription: string,
    public categoryName: string,
    public tagNames: string[],
    public startDate: string,
    public endDate: string,
    public entryPrice: number,
    public ageLimit: number,
    public reservation: boolean,
    public cancelRefund: string,
    public openStatus: string,
    public eventLanguage: string,
    public address: string,
    public locationDescription: string,
    public imageUrl: string,
    public created: string,
    public createdBy: string,
    public modified: string,
    public modifiedBy: string
  ) {}
}
