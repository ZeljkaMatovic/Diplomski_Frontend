export class Regdata {
    email: string;
    password: string;
    rPassword: string;
    name: string;
    lastname: string;
    city: string;
    phone: string;

    constructor(email: string, password: string, rpassword: string, name: string, lastname: string, city: string, phone: string){
        this.email = email;
        this.password = password;
        this.rPassword = rpassword;
        this.name = name;
        this.lastname = lastname;
        this.city = city;
        this.phone = phone;
    }
}
