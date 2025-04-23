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
