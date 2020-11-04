export class Location {
    nameOfCity: string;
    nameOfStreet: string;
    numberInStreet: string;
    geoWidth: number;
    geoHeight: number;

    constructor(nameOfC: string, nameOfS: string, number: string, geoW: number, geoH: number)
    {
        this.nameOfCity = nameOfC;
        this.nameOfStreet = nameOfS;
        this.numberInStreet = number;
        this.geoWidth = geoW;
        this.geoHeight = geoH;
    }
}

