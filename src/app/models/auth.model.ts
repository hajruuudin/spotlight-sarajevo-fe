export class LoginModel {
    constructor(
        public email: String,
        public password: String
    ){}
}

export class SystemUserModel {
    constructor(
        public firstName: String,
        public lastName: String,
        public email: String,
        public password: String
    ){}
}

export class PreferencesModel {
    constructor(
        public favouriteSpotCategories: number[],
        public favouriteEventCategories: number[],
        public questionOne: Boolean,
        public questionTwo: Boolean,
        public questionThree: Boolean,
        public questionFour: Boolean,
    ) {}
}