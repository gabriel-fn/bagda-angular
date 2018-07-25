export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "hYONDakoDtFCtWvSf8G83q66VVRF58oyX1kNA3N3";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}