export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "ZzDjo36L4oSwq9V2Xz8lKygB7OBHgEVmeoAhxIqa";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}