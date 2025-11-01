export class EventShorthandModel {
    constructor(
        public eventId: number,
        public eventOfficialName: String,
        public eventSmallDescription: String,
        public eventCategory: String,
        public eventThumbnailImage: String,
        public eventDate: String,
        public eventTags: String[]
    ){}
}