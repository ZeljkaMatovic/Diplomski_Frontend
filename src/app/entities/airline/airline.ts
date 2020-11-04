import { Location } from 'src/app/entities/location/location';
import { Time } from '@angular/common';
import { Ticket } from '../ticket/ticket';
import { ARSAdmin } from '../users/users';
import { DiscountGroup } from '../discounts/discounts';
import { Service } from '../service/service';
import { Plane } from '../plane/plane';

export class Airline extends Service {
    id: number;
    nameOfAirline: string;
    location: Location;
    descriptionOfAirline: string;
    destinations: Array<Destination>;
    listOfFlights: Array<Flight>;
    planes: Array<Plane>;
    image: string;
    discountGroups: Array<DiscountGroup>;
    ratingOfService: number;
    allRatings: Array<number>;
    longitude: number;
    latitude: number;

    constructor(id: number, name: string, address: Location) {
        super();
        this.id = id;
        this.nameOfAirline = name;
        this.location = address;
        this.descriptionOfAirline = "";
        this.destinations = [];
        this.listOfFlights = [];
        this.image = "";
        this.discountGroups = [];
        this.discountGroups.push(new DiscountGroup(0, this.id, "NewUser", 0, 0));
        this.allRatings = new Array<number>();
        this.ratingOfService = 0;
    }

    updateRating()
    {
        var sum = 0;
        this.allRatings.forEach(v => {
            sum += v;
        });

        this.ratingOfService = sum / this.allRatings.length;
    }
}


export class Flight {
    id: number;
    destinationFrom: string;
    destinationTo: string;
    departingDateTime: Date;
    returningDateTime: Date;
    timeOfFlight: Date;
    duration: Date;
    numberChangeover: number;
    locationsChangeover: string;
    ticketPrice: number;
    flightClass: string;
    listOfTickets: Array<Ticket>;
    nameOfAirline: string;
    businessPrice: number;
    multiFlights: Array<Flight>;
    allRatings: Array<number>;
    averageRate: number;

    constructor(id: number, destFrom: string, destTo: string, departure: Date, returning: Date,
        time: Date, duration: Date, num: number,
        loc: string, price: number, nameAirline: string) {
        this.id = id;
        this.destinationFrom = destFrom;
        this.destinationTo = destTo;
        this.departingDateTime = departure;
        this.returningDateTime = returning;
        this.timeOfFlight = time;
        this.duration = duration;
        this.numberChangeover = num;
        this.locationsChangeover = loc;
        this.ticketPrice = price;
        this.listOfTickets = new Array<Ticket>();
        this.nameOfAirline = nameAirline;
        this.businessPrice = this.ticketPrice + (this.ticketPrice * 80 / 100);
        this.multiFlights = new Array<Flight>();
        this.allRatings = new Array<number>();
    }

    updateRating()
    {
        var sum = 0;
        this.allRatings.forEach(v => {
            sum += v;
        });

        this.averageRate = sum/this.allRatings.length;
    }
}

export class Destination {
    id: number;
    destinationName: string;
    airlineId: number;
}

export class ReservationModel {
    FlightType: string;
    FlightClass: string;
    DestinationFrom: string;
    DestinationTo: string;
    MultiDestinationFrom: string;
    MultiDestinationTo: string;
    DepartureDate: string;
    ReturnDate: string;
}

export class Passengers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passport: string;
    seat: string;
}

export class ReserveFlightModel {
    idFlight1: number;
    idFlight2: number;
    firstName: string;
    lastName: string;
    passport: string;
    seat1: string;
    seat2: string;
    seatPass: string;
    numberOfPassengers: number;
    listOfPassengers: Array<Passengers>;
    flightClass: string;
    userEmail: string;
    idTicket: number;
    sale: number;

    constructor() {
        this.listOfPassengers = new Array<Passengers>();
    }
}

export class FilterModel {
    nameOfCompany: string;
    priceFrom: number;
    priceTo: number;
    hours: number;
    minutes: number;
    flights: Array<Flight>;
    economyClass: boolean;
}



