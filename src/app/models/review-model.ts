export class ReviewModel{
    constructor(
        public header: string,
        public body: string,
        public rating: number,
        public cleanliness: number,
        public affordability: number,
        public quality: number,
        public staffKindness: number,
        public accessibility: number,
        public atmosphere: number,
        public spotId: number
    ){}
}