export class LoginModel {
    constructor(
        public email: String,
        public password: String
    ){}
}

export class SystemUserModel {
    constructor(
        public firstName: String,
        public lasName: String,
        public email: String,
        public password: String
    ){}
}