import {DiscountGroup} from '../discounts/discounts';
import { Ticket } from '../ticket/ticket';
import { ThrowStmt } from '@angular/compiler';
import { CarReservation } from '../car-reservation/car-reservation';
export class User 
{
    userName: string;
    password: string;
    name: string;
    lastname: string;
    email: string;
    city: string;
    phoneNumber: string;
    image: string;
    role: string;
    src;

    constructor(username: string,password: string, name: string, lastname: string, email: string, city: string, phone: string) 
    {
        this.userName = username;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.city = city;
        this.phoneNumber = phone;
        this.image = "userAvatar.png";
    }
}

export class RegisteredUser extends User
{
    friends: Array<RegisteredUser>;
    friendRequests: Array<RegisteredUser>;
    discountPoints: Array<DiscountPoints>;
    passportNumber: string;
    reservedTickets: Array<Ticket>;
    ticketHistory: Array<Ticket>;
    reservedCars: Array<CarReservation>;
    reservedCarHistory: Array<CarReservation>;
    constructor(username: string,password: string, name: string, lastname: string, email: string, city: string, phone: string)
    {
        super(username, password, name, lastname, email, city, phone);
        this.friends = new Array<RegisteredUser>();
        this.friendRequests = new Array<RegisteredUser>();
        this.discountPoints = new Array<DiscountPoints>();
        this.role = "ru";
        this.reservedTickets = new Array<Ticket>();
        this.ticketHistory = new Array<Ticket>();
        this.reservedCars = new Array<CarReservation>();
        this.reservedCarHistory = new Array<CarReservation>();
    }
}

export class SystemAdmin extends User
{
    constructor(username: string,password: string, name: string, lastname: string, email: string, city: string, phone: string)
    {
        super(username, password, name, lastname, email, city, phone);
        this.role = "sys";
    }
}

export class RCSAdmin extends User
{
    serviceId: number;

    constructor(username: string,password: string, name: string, lastname: string, email: string, city: string, phone: string, serviceId: number)
    {
        super(username, password, name, lastname, email, city, phone);
        this.serviceId = serviceId;
        this.role = "rcsa";
    }
}

export class ARSAdmin extends User
{
    serviceId: number;

    constructor(username: string,password: string, name: string, lastname: string, email: string, city: string, phone: string, serviceId: number)
    {
        super(username, password, name, lastname, email, city, phone);
        this.serviceId = serviceId;
        this.role = "arsa";
    }
}

export class DiscountPoints 
{
    serviceId: number;
    serviceType: string;
    points: number;

    constructor(id: number, type: string, points: number)
    {
        this.serviceId = id;
        this.serviceType = type;
        this.points = points;
    }
}