export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "jLXN5meCfulRJ5xbvxK8ZIRpmI5isStwwIKQ1H2n";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}