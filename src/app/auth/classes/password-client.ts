export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "Ypk2AGJjEnCsvEy1FM23Q6Gvy3whH2NeuPEzgd0z";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}