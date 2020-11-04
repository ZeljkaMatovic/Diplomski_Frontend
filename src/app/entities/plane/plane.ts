export class Plane {
    id: number;
    businessSeats: number;
    businessRows: Array<BusRow>;
    economySeats: number;
    economyRows: Array<EcoRow>;
    countBusRows: number;
    countEcoRows: number;

    constructor(busSeats: number, ecoSeats: number) {
        this.businessSeats = busSeats;
        this.economySeats = ecoSeats;
        this.businessRows = new Array<BusRow>();
        this.economyRows = new Array<EcoRow>();
        this.countBusRows = Math.ceil(this.businessSeats / 4);
        this.countEcoRows = Math.ceil(this.economySeats / 6);
    }
}

export class BusRow {
    id: number;
    seat1: Seat;
    seat2: Seat;
    seat3: Seat;
    seat4: Seat;
    seat5: Seat;
    seat6: Seat; 
    seat7: Seat;
    planeId: number;
    idRow: number;

    constructor() {
        this.seat1 = new Seat();
        this.seat2 = new Seat();
        this.seat3 = new Seat();
        this.seat4 = new Seat();
        this.seat5 = new Seat();
        this.seat6 = new Seat();
        this.seat7 = new Seat();
        this.seat1.idCol = "A";
        this.seat2.idCol = "C";
        this.seat6.idCol = "D";
        this.seat7.idCol = "F";
    }
}

export class EcoRow {
    id: number;
    seat1: Seat;
    seat2: Seat;
    seat3: Seat;
    seat4: Seat;
    seat5: Seat;
    seat6: Seat; 
    seat7: Seat;
    planeId: number;
    idRow: number;

    constructor() {
        this.seat1 = new Seat();
        this.seat2 = new Seat();
        this.seat3 = new Seat();
        this.seat4 = new Seat();
        this.seat5 = new Seat();
        this.seat6 = new Seat();
        this.seat7 = new Seat();
        this.seat1.idCol = "A";
        this.seat2.idCol = "B";
        this.seat3.idCol = "C";
        this.seat5.idCol = "D";
        this.seat6.idCol = "E";
        this.seat7.idCol = "F";
    }
}

export class Seat {
    id: number;
    idCol: string;
    class: string;

    constructor() {
        this.class = "seat-noseat";
    }
}