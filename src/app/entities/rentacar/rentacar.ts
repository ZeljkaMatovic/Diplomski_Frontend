import { Location } from 'src/app/entities/location/location';
import { RCSAdmin } from 'src/app/entities/users/users'
import { DiscountGroup } from 'src/app/entities/discounts/discounts'
import { Service } from '../service/service';

export class Rentacar extends Service {
    id:number;
    nameOfService: string;
    location: Location; //moze biti i filija gdje se iznajmljuju vozila, a i ne mora
    descriptionOfService: string;
    listOfVehicles: Array<Vehicle>;
    branches: Array<Branch>;
    //for Admins only:
    averageRatingOfService: number;
    profitList: Array<Profit>;
    image: string;
    discountGroups: Array<DiscountGroup>;
    listOfRatings: Array<number>;
    carTransfers: Array<BranchChange>;
    
    constructor(id:number ,nameOfS: string, addOfS: Location) {
        super();
        this.id = id;
        this.nameOfService = nameOfS;
        this.location = addOfS;
        this.descriptionOfService = "";
        this.listOfVehicles = new Array<Vehicle>();
        this.branches = new Array<Branch>();
        this.carTransfers = new Array<BranchChange>();
        this.listOfRatings = new Array<number>();
        this.image = "";
        this.discountGroups = new Array<DiscountGroup>();
        this.discountGroups.push(new DiscountGroup(0, this.id, "NewUser", 0 , 0));
        this.averageRatingOfService = 0;
    }

    updateRating()
    {
        var sum = 0;
        this.listOfRatings.forEach(v =>  {
            sum += v;
        });

        this.averageRatingOfService = sum / this.listOfRatings.length;
    }
}


//usluga
class Rate{
    
}

class Profit{
    earnedMoney: number;
    dateTransactionWasMade: Date;

    constructor(earnedMoney: number, dateTWM: Date)
    {
        this.earnedMoney = earnedMoney;
        this.dateTransactionWasMade = dateTWM;
    }
}

export class Branch{
    id: number;
    rentacarID: number;
    nameOfBranch: string;
    listOfVehicles: Array<Vehicle>; //moraju se nalaziti i u objektu Rentacar kojem branch 
    locationID: number;
    location: Location;

    constructor(id: number, serviceId: number, name: string, location: Location)
    {
        this.id = id;
        this.rentacarID = serviceId;
        this.nameOfBranch = name;
        this.location = location;
        this.listOfVehicles = [];
    }
}

export class Vehicle{
    id:number;
    branchID: number;
    rentacarID: number;
    name: string;
    markOfVehicle: string;
    modelOfVehicle: string;
    yearMade: number;
    datesTaken: Array<Date>;
    specialOfferDates: Array<Date>;
    specialDiscount: number; //postotak
    numberOfSeats: number;
    //Micro, Sedan, CUV, SUV, Roadster, Pickup, VAN, Camper, Coupe, Minivan, Hatchback, Limousine
    typeOfVehicle: string;
    averageRatingOfVehicle: number;
    pricePerDay: number;
    isRented: boolean;
    canBeRented: boolean;
    listOfRatings: Array<number>;


    constructor(id?:number, branchId?: number, serviceId?: number, name?: string, mov?: string, mdl?:string, ym?:number, nos?: number, tov?: string, ppd?: number, cbr?: boolean)
    {
        this.id = id;
        this.branchID = branchId;
        this.rentacarID = serviceId;
        this.name = name;
        this.markOfVehicle = mov;
        this.modelOfVehicle = mdl;
        this.yearMade = ym;
        this.datesTaken = [];
        this.specialOfferDates = [];
        this.specialDiscount = 0;
        this.averageRatingOfVehicle = 0;
        this.numberOfSeats = nos;
        this.typeOfVehicle = tov;
        this.pricePerDay = ppd;
        this.isRented = false;
        this.canBeRented = cbr;
        this.listOfRatings = new Array<number>();
        
    }

    updateRating()
    {
        var sum = 0;
        this.listOfRatings.forEach(v =>  {
            sum += v;
        });

        this.averageRatingOfVehicle = sum / this.listOfRatings.length;
    }
}

export class CarSearch
{
    cityOT: string;
    cityOR: string;
    dateOT: Date;
    dateOR: Date;
    mPrice: number;
    type: string;
    seats: number;

    constructor(city1: string, city2: string, date1: Date, date2: Date, price: number, type:string, seats: number)
    {
        this.cityOT = city1;
        this.cityOR = city2;
        this.dateOT = date1;
        this.dateOR = date2;
        this.mPrice = price;
        this.type = type;
        this.seats = seats;
    }
}

export class CarSearchRequest 
{
    cityOT: string;
    cityOR: string;
    dateOT: string;
    dateOR: string;
    mPrice: number;
    type: string;
    seats: number;

    constructor(city1: string, city2: string, date1: string, date2: string, price: number, type:string, seats: number)
    {
        this.cityOT = city1;
        this.cityOR = city2;
        this.dateOT = date1;
        this.dateOR = date2;
        this.mPrice = price;
        this.type = type;
        this.seats = seats;
    }
}

export class BranchChange
{
    id: number;
    dateOfTransfer: Date;
    fromBranchId: number;
    toBranchId: number;
    vehicleId: number;

    constructor(dot: Date, fbId: number, tbId: number, vId: number)
    {
        this.dateOfTransfer = dot;
        this.fromBranchId = fbId;
        this.toBranchId = tbId;
        this.vehicleId = vId;
    }
}

export class RentacarSearch 
{
  name: string;
  city: string;
  address: string;
  number: string;
  startDate: string;
  endDate: string;

  constructor(name: string, city: string, address: string, number: string, startDate: string, endDate: string)
  {
    this.name = name;
    this.city = city;
    this.address = address;
    this.number = number;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
