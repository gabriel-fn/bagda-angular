export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "AJG1ySIK1WQbWQZ6nVzmP0MMmI3DMUBIBTWYg6YB";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}