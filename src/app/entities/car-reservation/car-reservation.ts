import { Vehicle } from '../rentacar/rentacar';

export class CarReservation {
    id: number;
    user: string;
    vehicle: Vehicle;
    startDate: Date;
    endDate: Date;
    pricePerDay: number;
    totalPrice: number; 
    specialOffer: boolean;
    rated: boolean;

    constructor(id: number, user: string, veh: Vehicle, sd: Date, ed: Date, ppd: number, ttp: number, spco: boolean)
    {
        this.id = id;
        this.user = user;
        this.vehicle = veh;
        this.startDate = sd;
        this.endDate = ed;
        this.pricePerDay = ppd;
        this.totalPrice = ttp;
        this.specialOffer = spco;
        this.rated = false;
    }
}
