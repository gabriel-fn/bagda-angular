export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "YjKuooLRRWdLwURy3a4wBOf5D12RAXjCoNNP9Sk4";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}