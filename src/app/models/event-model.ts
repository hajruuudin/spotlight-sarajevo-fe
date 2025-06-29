export interface EventShorthand{
    id: number;
    slug: string;
    officialName: string,
    smallDescription: string,
    startDateFormatted: string,
    categoryName: string,
    tagNames: string[],
    imageUrl: string,
    created: string,
    modified: string
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

export class EventUpdateModel {
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
    public openStatus: string,
    public cancelRefund: string,
    public eventLanguage: string,
    public address: string,
    public locationDescription: string
  ) {}
}

export class EventCreateModel {
  constructor(
    public slug: string,
    public officialName: string,
    public smallDescription: string,
    public fullDescription: string,
    public categoryName: string,
    public tags: string[],
    public startDate: string,
    public endDate: string,
    public entryPrice: number,
    public ageLimit: number,
    public reservation: boolean,
    public openStatus: string,
    public cancelRefund: string,
    public eventLanguage: string,
    public address: string,
    public locationDescription: string
  ) {}
}
