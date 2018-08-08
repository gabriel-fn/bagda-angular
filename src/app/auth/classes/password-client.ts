export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "OMUzVWRPOz1YFo02gDmMEdUU7RW1AdWTv7pNcDE4";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}