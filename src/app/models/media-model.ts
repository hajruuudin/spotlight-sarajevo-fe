export class MediaCreate{
    constructor(
        public itemCategory: string,
        public itemId: number,
        public imageUrl: string,
        public isThumbnail: boolean
    ){}
}

export interface MediaModel{
    id: number,
    itemId: number,
    itemCategory: string,
    imageUrl: string,
    isThumbnail: boolean,
    created: string,
    createdBy: string
}