export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "uPsv0nhZmOw1y1wq0wBCyKAcq8JNmBChAPfYum5R";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}