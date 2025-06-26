export class CommunityReqeustCreate{
    constructor(
        public objectType: string,
        public requestType: string,
        public requestName: string,
        public requestDescription: string
    ){}
}

export interface CommunityReqeustModel{
    id: number,
    userId: number,
    userName: string,
    requestType: string,
    objectType: string,
    requestName: string,
    requestDescription: string
}