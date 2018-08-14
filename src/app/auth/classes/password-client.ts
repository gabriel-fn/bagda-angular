export class PasswordClient {
    grant_type: string = "password";
    client_id: number = 2;
    client_secret: string = "96bewKOOfo1L0lx3AIs03DNuFVWzKrTfllLOrMTO";

    username: string;
    password: string;
    scope: string = "";

    constructor(username: string, password: string) {
        this.username = username;
        this.password =  password;
    }
}