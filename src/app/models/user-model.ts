export interface LoggedUserProfile {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    isPremium: boolean;
    isAdmin: boolean;
    imageUrl: string
}