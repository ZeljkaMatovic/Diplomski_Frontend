import { Injectable } from '@angular/core';
import { Rentacar, Vehicle, Branch, BranchChange, RentacarSearch, CarSearch } from 'src/app/entities/rentacar/rentacar';
import { Location } from 'src/app/entities/location/location';
import { DiscountGroup } from 'src/app/entities/discounts/discounts'
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RentacarService {
  mockedC: Array<Rentacar>;
  constructor(private http: HttpClient) { 
    this.mockedC = this.mockedCars();
  }
  readonly BaseURI = 'http://localhost:40000/api';

  loadAllCars() {
    return this.http.get(this.BaseURI + "/Rentacar/GetAllRentacars");
  }

  loadAllCarsWithDiscountGroups(){
    return this.http.get(this.BaseURI + "/Rentacar/GetAllRentacarsDiscGroups");
  }

  searchRentacars(data: RentacarSearch)
  {
    return this.http.post(this.BaseURI + "/Rentacar/GetSearchedRentacars", data);
  }

  searchCars(data: CarSearch)
  {
    return this.http.post(this.BaseURI + "/Rentacar/GetSearchedCars", data);
  }

  mockedCars(): Array<Rentacar> {
    let listOfCars = new Array<Rentacar>();
    
    

    return listOfCars;

  }

  giveMeDates(startDate: Date, endDate: Date) : Array<Date>
  {
    var dates = new Array<Date>();
    var enddate = new Date(endDate);
    for(var d = new Date(startDate); d <= enddate; d.setDate(d.getDate() + 1))
    {
      dates.push(new Date(d));
    }

    return dates;
  }

  findRentacar(id: number) : Rentacar
  {
    var rentacar;
    /*this.http.get(this.BaseURI + "/Rentacar/GetRentacar/?id=" + id).subscribe(
      (res) => {
        rentacar =  res as Rentacar;
      },
      err => {
        alert(err);
      }
    );*/

    
    (JSON.parse(localStorage.getItem("rentacars")) as Array<Rentacar>).forEach(r => {
      if(r.id == id)
        {
          rentacar = r;
          return;
        }
    });
    return rentacar;
  }

  findRentacarInBase(id: number)
  {
    return this.http.get(this.BaseURI + "/Rentacar/GetRentacar/?id=" + id);
  }


  findBranch(serviceId: number, branchId: number)
  {
    return this.http.get(this.BaseURI + "/Rentacar/GetBranch/?bid=" + branchId + "&rid=" + serviceId);
  }

  reserveCar(carRes: CarReservation)
  {
    var startDate = new Date(carRes.startDate).toDateString();
    var endDate = new Date(carRes.endDate).toDateString();
    var data = {
      Id: carRes.id,
      User: carRes.user,
      VehicleID: carRes.vehicle.id,
      StartDate: startDate,
      ENdDate: endDate,
      PricePerDay: carRes.pricePerDay,
      TotalPrice: carRes.totalPrice,
      SpecialOffer: carRes.specialOffer,
      Rated: carRes.rated
    }
    return this.http.post(this.BaseURI + "/User/ReserveCar", data);
  }

  addNewVehicle(vehicle: Vehicle)
  {
    var formData = {
      ID : vehicle.id,
      RentacarID: vehicle.rentacarID,
      BranchID: vehicle.branchID,
      Name: vehicle.name, 
      MarkOfVehicle: vehicle.markOfVehicle,
      ModelOfVehicle: vehicle.modelOfVehicle,
      YearMade: vehicle.yearMade,
      NumberOfSeats: vehicle.numberOfSeats,
      TypeOfVehicle: vehicle.typeOfVehicle,
      PricePerDay: vehicle.pricePerDay,
      CanBeRented: vehicle.canBeRented
    }
    var passed = true;
    return this.http.post(this.BaseURI + "/Rentacar/AddNewVehicle", formData)
  }

  getDiscountGroups(id: number)
  {
    return this.findRentacar(id).discountGroups;
  }

  getDiscountGroupsByName(id: number, serviceType: string, name: string)
  {
    return this.http.get(this.BaseURI + "/SystemAdmin/FindDiscountGroupsByName/?sid=" + id + "&ser=" + serviceType + "&name=" + name);
  }

  addNewBranch(branch:Branch, serviceId:number)
  {
    var newBranchInfo = {
      BranchId : -1,
      RentacarId : serviceId,
      BranchName: branch.nameOfBranch,
      City: branch.location.nameOfCity,
      Address: branch.location.nameOfStreet,
      Number: branch.location.numberInStreet,
      Vehicles : {
      }
    }

    
    var passed = true;
    var id = 0;
    this.http.post(this.BaseURI + "/Rentacar/AddNewBranch", newBranchInfo).subscribe(
      (res: any) =>
      {
        console.log(res)
        branch.listOfVehicles.forEach((v,i) => {
          var formData = {
            RentacarID : serviceId,
            BranchID : res.br.id,
            Name: v.name,
            MarkOfVehicle: v.markOfVehicle,
            ModelOfVehicle: v.modelOfVehicle,
            YearMade: v.yearMade,
            NumberOfSeats: v.numberOfSeats,
            TypeOfVehicle: v.typeOfVehicle,
            PricePerDay: v.pricePerDay,
            CanBeRented: v.canBeRented
            }
            console.log(formData);
            this.http.post(this.BaseURI + "/Rentacar/AddNewVehicle", formData).subscribe(
              (res) => {
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
          });

          //return true;
        
      },
      err => {
        alert(err.message);
        //return false;
      }
    )

    this.loadAllCars();
  }

  deleteBranch(branch: Branch)
  {
    return this.http.delete(this.BaseURI + "/Rentacar/DeleteBranch/?bid=" +  branch.id + "&rid=" + branch.rentacarID);
  }

  getBranches(serviceId: number)
  {
    return this.http.get(this.BaseURI + "/Rentacar/GetRentacarBranches/?rid=" + serviceId);
  }

  searchBranches(serviceId: number, bname: string, bcity: string)
  {
    return this.http.get(this.BaseURI + "/Rentacar/SearchBranches/?rid="
                          + serviceId + "&bname=" + bname + "&city=" + bcity);
  }

  getReservedCars()
  {
    return this.http.get(this.BaseURI + "/User/GetMyCarReservations")
  }

  addDiscountGroup(id: number, group: DiscountGroup)
  {
    var data = {
      Id: group.id,
      GroupName: group.groupName,
      MinPoints: group.minPoints,
      DiscountPercentage: group.discountPercentage,
      ServiceId: id as Number
    }
    console.log(data);
    return this.http.post(this.BaseURI + "/Rentacar/AddNewDiscountGroup", data);
  }

  removeDiscountGroup(id: number, group: DiscountGroup)
  {
    return this.http.delete(this.BaseURI + "/Rentacar/DeleteDiscountGroup/?rid=" + id + "&did=" + group.id);
  }

  getServicesByName(name: string)
  {
    return this.http.get(this.BaseURI + "/SystemAdmin/FindServiceByName/?name=" + name);
  }

  updateDiscountGroup(id: number, group: DiscountGroup)
  {
    var data = {
      Id : group.id,
      GroupName: group.groupName,
      MinPoints: group.minPoints,
      DiscountPercentage: group.discountPercentage,
      ServiceId: id as Number
    }
    return this.http.post(this.BaseURI + "/Rentacar/ModifyDiscountGroup", data);
  }

  deleteVehicle(vehicle: Vehicle)
  {
    return this.http.delete(this.BaseURI + "/Rentacar/DeleteVehicle/?vid=" + vehicle.id + "&rid=" + vehicle.rentacarID);
  }

  modifyVehicle(v: Vehicle)
  {
    console.log(v);
    var s = Array<String>();
    v.specialOfferDates.forEach(d => {
      s.push(d.toDateString());
    })
    var formData = {
      ID: v.id,
      RentacarID : v.rentacarID,
      BranchID : v.branchID,
      Name: v.name,
      MarkOfVehicle: v.markOfVehicle,
      ModelOfVehicle: v.modelOfVehicle,
      YearMade: v.yearMade,
      NumberOfSeats: v.numberOfSeats,
      TypeOfVehicle: v.typeOfVehicle,
      PricePerDay: v.pricePerDay,
      CanBeRented: v.canBeRented,
      SpecialOffer: v.specialDiscount,
      SpecialOfferDates: s
    }
    console.log(formData);
    return this.http.post(this.BaseURI + "/Rentacar/ModifyVehicle", formData)
  }

  addNewService(rentacar : Rentacar)
  {
    //this.mockedC.push(rentacar);
    //console.log(this.mockedC);
    return this.http.post(this.BaseURI + "/SystemAdmin/NewRentacar", rentacar);
  }

  editInfo(rentacar:Rentacar)
  {
    var formData = {
      Id: rentacar.id,
      NameOfService: rentacar.nameOfService,
      Description: rentacar.descriptionOfService,
      CityName: rentacar.location.nameOfCity,
      StreetName: rentacar.location.nameOfStreet,
      Number: rentacar.location.numberInStreet,
      GeoWidth: rentacar.location.geoWidth,
      GeoHeight: rentacar.location.geoHeight,
      Image: rentacar.image
    }

    this.http.post(this.BaseURI + "/Rentacar/ModifyRentacarInfo", formData).subscribe(
      (res: any) =>
      {
        console.log("usao");
        this.loadAllCars();
      },
      err => {
        alert(err.message);
      }
    )
    /*this.mockedC.forEach(r => {
      if(r.id == rentacar.id)
      {
        r.nameOfService = rentacar.nameOfService;
        r.descriptionOfService = rentacar.descriptionOfService;
        r.location = rentacar.location;
        return;
      }
      
    });*/
  }

  editRating(rentacar: Rentacar)
  {
    this.mockedC.forEach(r => {
      if(r.id == rentacar.id)
      {
        r.listOfRatings = rentacar.listOfRatings;
        r.updateRating();
        return;
      }
      
    });
  }

  editBranchInfo(branch: Branch)
  {
    var branchInfo = {
      BranchId : branch.id,
      RentacarId : branch.rentacarID,
      BranchName: branch.nameOfBranch,
      City: branch.location.nameOfCity,
      Address: branch.location.nameOfStreet,
      Number: branch.location.numberInStreet,
      Vehicles : {
      }
    }

    return this.http.post(this.BaseURI + "/Rentacar/ModifyBranch", branchInfo)
  }

  giveMeSpecialOfferCars(serviceId: Number, sd: Date, ed:Date, city: string)
  {
    var startDate = new Date(sd).toDateString();
    var endDate = new Date(ed).toDateString();
    var formData = 
    {
      RentacarID : serviceId,
      StartDate: startDate,
      EndDate: endDate,
      City: city
    }
    return this.http.post(this.BaseURI + "/User/GiveMeSpecialOfferCars/", formData);
  }

  updateTakenDates(vehicle: Vehicle, startDate: string, endDate: string)
  {
    var sd = startDate.split(".");
    var ed = endDate.split(".");

    var dates = this.giveMeDates(new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0])), new Date(parseInt(ed[2]), parseInt(ed[1]), parseInt(ed[0])));
  
    dates.forEach(d => {
      vehicle.datesTaken.push(d);
    });
    
    this.modifyVehicle(vehicle);
  }

  updateSpecialOffer(vehicle: Vehicle, startDate: string, endDate: string)
  {
    var sd = startDate.split(".");
    var ed = endDate.split(".");
    var sDate = new Date(parseInt(sd[2]), parseInt(sd[1]), parseInt(sd[0]));
    var eDate = new Date(parseInt(ed[2]), parseInt(ed[1]), parseInt(ed[0]));

    var startIndex = 0;
    var endIndex = 0;
    vehicle.specialOfferDates.forEach((d,i) => {
      if(d.getDate() == sDate.getDate() && d.getMonth() == sDate.getMonth() && d.getFullYear() == sDate.getFullYear())
      {
        startIndex = i;
        return;
      }
      
    });

    vehicle.specialOfferDates.forEach((v, g) => {
      if(v.getDate() == eDate.getDate() && v.getMonth() == eDate.getMonth() && v.getFullYear() == eDate.getFullYear())
      {
        endIndex = g;
        return;
      }
    });
    //console.log(startIndex);
    //console.log(endIndex);
    vehicle.specialOfferDates.splice(startIndex, endIndex - startIndex + 1);
    vehicle.specialOfferDates.sort();
    console.log(vehicle);
    this.modifyVehicle(vehicle);

  }

  cancelReservation(carRes: CarReservation)
  {
    var sDate = new Date(carRes.startDate);
    var eDate = new Date(carRes.endDate);

    if(carRes.specialOffer)
    {
      for(var s = sDate; s <= eDate; s.setDate(s.getDate() + 1))
      {
        carRes.vehicle.specialOfferDates.push(new Date(s));
      }
      carRes.vehicle.specialOfferDates.sort();
    }

    var startIndex = 0;
    var endIndex = 0;

    carRes.vehicle.datesTaken.forEach((d, i) => {
      if(d == sDate)
      {
        startIndex = i;
        return;
      }
    });

    carRes.vehicle.datesTaken.forEach((v, e) => {
      if(v == eDate)
      {
        endIndex = e;
        return;
      }
    });

    carRes.vehicle.datesTaken.splice(startIndex, endIndex - startIndex + 1);
    carRes.vehicle.datesTaken.sort();

    this.modifyVehicle(carRes.vehicle);
    
  }

  cancelCarReservation(id: number)
  {
    return this.http.delete(this.BaseURI + "/User/CancelCarReservation/?id=" + id);
  }

  getMyCarReservations()
  {
    return this.http.get(this.BaseURI + "/User/GetMyCarReservations");
  }

  getMyCarReservationsHistory()
  {
    return this.http.get(this.BaseURI + "/User/GetMyCarReservationsHistory");
  }

  rateRentAndVehicle(arr: Array<Number>, resId: number)
  {
    var formData = {
      Id: resId,
      Name: null,
      Email: null,
      Rate1: arr[0],
      Rate2: arr[1]
    }

    return this.http.post(this.BaseURI + "/User/RateRentacarAndCar", formData);
  }

  findRoundAWayTrip()
  {
    return this.http.get(this.BaseURI + "/User/FindRoundAwayTrips");
  }

  changeVehicleBranch(id: number, destination: string)
  {
    return this.http.get(this.BaseURI + "/Rentacar/BranchChange/?id=" + id + "&des=" + destination);
  }

  salesGraph(id: number, name: string, date: string, type: string)
  {
    var idModel = {
      Id: id,
      Name: name,
      Date: date,
      Type: type
    };

    return this.http.post(this.BaseURI + "/Rentacar/SalesGraph", idModel);
  }

}


