import { GuideType } from "../constants/ObjectTypes";

export class TouristGuideShorthandModel {
  constructor(
    public id: number,
    public slug: string,
    public guideTitleBs: string,
    public guideTitleEn: string,
    public guideSmallDescriptionBs: string,
    public guideSmallDescriptionEn: string,
    public thumbnailImage: string,
    public categoryNameBs: string,
    public categoryNameEn: string
  ) {}
}

export class TouristGuideSectionModel {
  constructor(
    public id: number,
    public guideId: number,
    public sectionTitleBs: string,
    public sectionTitleEn: string,
    public sectionBodyBs: string,
    public sectionBodyEn: string,
    public thumbnailImage: string
  ) {}
}

export class TouristGuideOverviewModel {
  constructor(
    public id: number,
    public slug: string,
    public guideTitleBs: string,
    public guideTitleEn: string,
    public guideSmallDescriptionBs: string,
    public guideSmallDescriptionEn: string,
    public guideFullDescriptionBs: string,
    public guideFullDescriptionEn: string,
    public categoryNameBs: string,
    public categoryNameEn: string,
    public sections: TouristGuideSectionModel[],
    public guideType: GuideType,
    public contactInfo: { [key: string]: string },
    public thumbnailImage: string
  ) {}
}

export class TouristGuideSectionCreateModel {
  constructor(
    public sectionTitleBs: string,
    public sectionTitleEn: string,
    public sectionBodyBs: string,
    public sectionBodyEn: string,
    public thumbnailImage: string,
    public orderIdx: number
  ) {}
}

export class TouristGuideCreateModel {
  constructor(
    public guideTitleBs: string,
    public guideTitleEn: string,
    public guideSmallDescriptionBs: string,
    public guideSmallDescriptionEn: string,
    public guideFullDescriptionBs: string,
    public guideFullDescriptionEn: string,
    public sections: TouristGuideSectionCreateModel[],
    public guideType: GuideType,
    public contactInfo: { [key: string]: string },
    public thumbnailImage: string,
    public categoryId: number
  ) {}
}