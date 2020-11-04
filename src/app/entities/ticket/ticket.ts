import { Time } from '@angular/common';
import { RegisteredUser } from '../users/users';

export class Ticket {
    id: number;
    destinationFrom: string;
    destinationTo: string;
    dateAndTime: Date;
    seat: string;
    originalPrice: number;
    sale: number;
    nameOfCompany: string;
    passengers: number;
    totalPrice: number;
    dateOfReservation: Date;
    businessPrice: number;
    flightID: number;
    user: string;
    disabled: boolean;
    type: string;

    constructor(id: number, destFrom: string, destTo: string, date: Date, seat: string, orgPrice: number, 
        sale: number, nameComp: string) {
        this.id = id;
        this.destinationFrom = destFrom;
        this.destinationTo = destTo;
        this.dateAndTime = date;
        this.seat = seat;
        this.originalPrice = orgPrice;
        this.sale = sale;
        this.nameOfCompany = nameComp;
        this.passengers = 0;
        this.businessPrice = this.originalPrice + (this.originalPrice * 80 / 100);
        this.disabled = false;
    }
}
