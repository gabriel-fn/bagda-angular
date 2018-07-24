export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "ueWvEMXa1aOBJYT4DHsFdSnyLCDbemuA9elKSe5t";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}