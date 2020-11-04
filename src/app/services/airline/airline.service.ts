import { Injectable } from '@angular/core';
import { Airline, Flight, Destination, ReservationModel, ReserveFlightModel, FilterModel } from 'src/app/entities/airline/airline';
import { Location } from 'src/app/entities/location/location';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { DiscountGroup } from 'src/app/entities/discounts/discounts';
import { Plane, BusRow, EcoRow } from 'src/app/entities/plane/plane';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  airlinesList: Array<Airline>;
  ticketsCounter: number;

  readonly BaseURI = 'http://localhost:40001/api';
  constructor(private http: HttpClient) 
  { 
    this.airlinesList = [];
    let flightList1 = new Array<Flight>();
    let flightList2 = new Array<Flight>();
    let ticketsList1 = new Array<Ticket>();
    let ticketsList2 = new Array<Ticket>();
    let ticketsList3 = new Array<Ticket>();
    let ticketsList4 = new Array<Ticket>();
    let ticketsList5 = new Array<Ticket>();

    const loc1 = new Location('Paris', 'Avenue', '12', 111, 111);
    const loc2 = new Location('Belgrade', 'Beogradska', '13', 222, 222);

    const dest1 = new Array<string>();
    dest1.push('Barcelona', 'Madrid', 'Prague', 'Berlin', 'Venice');

    const dest2 = new Array<string>();
    dest2.push('Rome', 'Budapest', 'Prague', 'Istanbul', 'Vienna');

    const flight1 = new Flight(1, 'Madrid', 'Barcelona', new Date(2020, 4, 1, 22, 0, 0, 0),
    null, new Date(0, 0, 0, 23, 20 , 0 , 0), new Date(0, 0, 0, 1, 20, 0, 0), 0, null, 200, 'Air France');
    const flight2 = new Flight(2, 'Prague', 'Rome',  new Date(2020, 12, 2, 12, 0, 0, 0),
    null, null, null, 0, null, 300, 'Air Serbia');
    const flight3 = new Flight(3, 'Berlin', 'Venice', new Date(2020, 12, 2, 12, 0, 0, 0),
    null, null, null, 0, null, 380, 'Air France');
    const flight4 = new Flight(4, 'Budapest', 'Vienna', new Date(2020, 12, 2, 12, 0, 0, 0),
    null, null, null, 0, null, 100, 'Air Serbia');
    const flight5 = new Flight(5, 'Barcelona', 'Madrid', new Date(2022, 5, 10, 12, 0, 0, 0),
    null, null, null, 0, null, 300, 'Air France');
    const flight6 = new Flight(6, 'Madrid', 'Barcelona', new Date(2020, 4, 1, 7, 30, 0, 0),
    null, new Date(0, 0, 0, 8, 50 , 0 , 0), new Date(0, 0, 0, 1, 20, 0, 0), 0, null, 200, 'Air Serbia');

    const ticket1 = new Ticket(1, 'Madrid', 'Barcelona', new Date(2020, 4, 1, 22, 0, 0, 0), "1A", 200, 10, 'Air France');
    const ticket2 = new Ticket(2, 'Prague', 'Rome', new Date(2020, 12, 2, 12, 0, 0, 0), "1A", 300, 10, 'Air Serbia');
    const ticket3 = new Ticket(3, 'Berlin', 'Venice', new Date(2020, 12, 2, 12, 0, 0, 0), "1A", 380, 15, 'Air France');
    const ticket4 = new Ticket(4, 'Budapest', 'Vienna', new Date(2020, 12, 2, 12, 0, 0, 0), "1A", 100, 5, 'Air Serbia');
    const ticket5 = new Ticket(5, 'Barcelona', 'Madrid', new Date(2022, 5, 10, 12, 0, 0, 0), "1A", 300, 15, 'Air France');

    //ticket1.idFlight = 1;
    ticket1.dateOfReservation = new Date(2020, 4, 15, 2, 34, 0, 0);

    ticketsList1.push(ticket1);
    ticketsList2.push(ticket2);
    ticketsList3.push(ticket3);
    ticketsList4.push(ticket4);
    ticketsList5.push(ticket5);

    flight1.listOfTickets = ticketsList1;
    flight2.listOfTickets = ticketsList2;
    flight3.listOfTickets = ticketsList3;
    flight4.listOfTickets = ticketsList4;
    flight5.listOfTickets = ticketsList5;

    flightList1.push(flight1);
    flightList2.push(flight2);
    flightList1.push(flight3);
    flightList2.push(flight4);
    flightList1.push(flight5);
    flightList2.push(flight6);

    flight1.allRatings.push(5, 4);
    flight3.allRatings.push(1);
    flight5.allRatings.push(4, 3, 3);

    let plane1 = new Plane(17, 40);

    for(let i = 1; i <= plane1.countBusRows; i++) {
      let row = new BusRow();
      row.id = i;
      for(let j = 1; j <= plane1.businessSeats; j++) {
        if(j % 4 == 1) {
          row.seat1.class = "seat-white";
        }
        else if(j % 4 == 2) {
          row.seat2.class = "seat-white";
        }
        else if(j % 4 == 3) {
          row.seat6.class = "seat-white";
        }
        else if(j % 4 == 0) {
          row.seat7.class = "seat-white";
          plane1.businessRows.push(row);
          j = plane1.businessSeats + 1;
          plane1.businessSeats -= 4;
        }
        if(j == plane1.businessSeats) {
          plane1.businessRows.push(row);
        }
      }
    }

    for(let i = 1; i <= plane1.countEcoRows; i++) {
      let row = new EcoRow();
      row.id = i + plane1.countBusRows;
      for(let j = 1; j <= plane1.economySeats; j++) {
        if(j % 6 == 1) {
          row.seat1.class = "seat-white";
        }
        else if(j % 6 == 2) {
          row.seat2.class = "seat-white";
        }
        else if(j % 6 == 3) {
          row.seat3.class = "seat-white";
        }
        else if(j % 6 == 4) {
          row.seat5.class = "seat-white";
        }
        else if(j % 6 == 5) {
          row.seat6.class = "seat-white";
        }
        else if(j % 6 == 0) {
          row.seat7.class = "seat-white";
          plane1.economyRows.push(row);
          j = plane1.economySeats + 1;
          plane1.economySeats -= 6;
        }
        if(j == plane1.economySeats) {
          plane1.economyRows.push(row);
        }
      }
    }

    let planeList1 = new Array<Plane>();
    planeList1.push(plane1);

    const airline1 = new Airline(1, 'Air France', loc1);
    const airline2 = new Airline(2, 'Air Serbia', loc2);
    airline1.descriptionOfAirline = "Company from France";
    //airline1.destinations = dest1;
    airline1.listOfFlights = flightList1;
    airline1.image = "Paris.jpg";
    airline1.latitude = 48.864716;
    airline1.longitude = 2.349014;

    airline2.descriptionOfAirline = "Company from Serbia";
    //airline2.destinations = dest2;
    airline2.listOfFlights = flightList2;
    airline2.image = "Belgrade.jpg";
    airline2.latitude = 44.787197;
    airline2.longitude = 20.457273;

    airline1.planes = planeList1;
    airline2.planes = planeList1;

    airline1.allRatings.push(5, 4, 4);

    this.airlinesList.push(airline1);
    this.airlinesList.push(airline2);

  }

  loadAllAirlines() {
    //return this.airlinesList;
    return this.http.get(this.BaseURI + "/Airline/GetAllAirlines").subscribe(
      (res: any) => {
        var airs = res as Array<Airline>
        localStorage.setItem("airlines", JSON.stringify(airs));
      }
    );
  }

  loadAllAirlinesSub()
  {
    return this.http.get(this.BaseURI + "/Airline/GetAllArilinesDiscGroups");
  }

  findAirline(id: number)
  {
    var IdModel = {
      Id: id
    };
     return this.http.post(this.BaseURI + "/Airline/FindAirline", IdModel);
  }

  findAirlineFlights(name: string){
    var IdModel = {
      Name: name
    }
    return this.http.post(this.BaseURI + "/Airline/FindAirlineFlights", IdModel);
  }

  findFlightTickets(id: number){
    var IdModel = {
      Id: id
    }
    return this.http.post(this.BaseURI + "/Airline/FindFlightTickets", IdModel);
  }

  getAirlineDestinations(id: number){
    var IdModel = {
      Id: id
    }
    return this.http.post(this.BaseURI + "/Airline/GetAirlineDestinations", IdModel);
  }

  getAllDestinations(){
    return this.http.get(this.BaseURI + "/Airline/GetAllDestinations");
  }

  addNewFlight(flight: Flight) {
    var model = {
      DestinationFrom: flight.destinationFrom,
      DestinationTo: flight.destinationTo,
      DepartureDate: flight.departingDateTime,
      LandingDate: flight.returningDateTime,
      Duration: flight.timeOfFlight,
      Length: flight.duration,
      NumberOfChangeover: flight.numberChangeover,
      Changeovers: flight.locationsChangeover,
      TicketPrice: flight.ticketPrice,
      NameOfAirline: flight.nameOfAirline
    }

    return this.http.post(this.BaseURI + "/Airline/AddNewFlight", model);
  }

  searchFlights(model: ReservationModel)
  {
    return this.http.post(this.BaseURI + "/Airline/SearchFlights", model);
  }

  findFlight(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/FindFlight", idModel);
  }

  findPlane(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/FindPlane", idModel);
  }

  getBusRows(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/GetBusRows", idModel);
  }

  getEcoRows(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/GetEcoRows", idModel);
  }

  getSeats(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/GetSeats", idModel);
  }

  countTickets() {
    return this.http.get(this.BaseURI + "/Airline/CountTickets");
  }

  reserveTicket(model: ReserveFlightModel) {
    return this.http.post(this.BaseURI + "/Airline/ReserveTicket", model);
  }

  findTicket(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/FindTicket", idModel);
  }

  reserveSuperTicket(model: ReserveFlightModel) {
    return this.http.post(this.BaseURI + "/Airline/ReserveSuperTicket", model);
  }

  getReservedTickets(email: string) {
    var idModel = {
      Email: email
    };
    return this.http.post(this.BaseURI + "/Airline/GetReservedTickets", idModel);
  }

  rateAll(id: number, rate1: number, rate2: number) {
    var idModel = {
      Id: id,
      Rate1: rate1,
      Rate2: rate2
    };
    return this.http.post(this.BaseURI + "/Airline/RateAll", idModel);
  }

  getAirlineAverageRate(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/GetAirlineAverageRate", idModel);
  }

  getFlightAverageRate(id: number) {
    var idModel = {
      Id: id
    };
    return this.http.post(this.BaseURI + "/Airline/GetFlightAverageRate", idModel);
  }

  addDiscountGroup(id: number, group: DiscountGroup)
  {
    var data = {
      Id : group.id,
      GroupName: group.groupName,
      MinPoints: group.minPoints,
      DiscountPercentage: group.discountPercentage,
      ServiceId: id
    }
    return this.http.post(this.BaseURI + "/Airline/AddNewDiscountGroup", data);
  }

  removeDiscountGroup(id: number, group: DiscountGroup)
  {
    return this.http.delete(this.BaseURI + "/Airline/DeleteDiscountGroup/?rid=" + id + "&did=" + group.id);
  }

  updateDiscountGroup(id: number, group: DiscountGroup)
  {
    var data = {
      Id : group.id,
      GroupName: group.groupName,
      MinPoints: group.minPoints,
      DiscountPercentage: group.discountPercentage,
      ServiceId: id
    }
    return this.http.post(this.BaseURI + "/Airline/ModifyDiscountGroup", data);
  }
  getTicketsByAirline(id: number, name: string, date: string, type: string) {
    var idModel = {
      Id: id,
      Name: name,
      Date: date,
      Type: type
    };
    return this.http.post(this.BaseURI + "/Airline/GetTicketsByAirline", idModel);
  }

  cancelTicket(id: number) {
    var idModel = {
      Id: id
    };

    return this.http.post(this.BaseURI + "/Airline/CancelTicket", idModel);
  }

  deleteSeat(name: string) {
    var idModel = {
      Name: name
    };

    return this.http.post(this.BaseURI + "/Airline/DeleteSeat", idModel);
  }

  addNewSeats(planeId: number, ecoNum: number, busNum: number) {
    var idModel = {
      Id: planeId,
      EcoNumber: ecoNum,
      BusNumber: busNum
    };

    return this.http.post(this.BaseURI + "/Airline/AddNewSeats", idModel);
  }

  getMyTicketHistory()
  {
    return this.http.get(this.BaseURI + "/User/GetMyTicketHistory");
  }

  filterAirlines(model: FilterModel)
  {
    return this.http.post(this.BaseURI + "/Airline/FilterAirlines", model);
  }

  addNewSuperTicket(model: ReserveFlightModel) {
    return this.http.post(this.BaseURI + "/Airline/AddNewSuperTicket", model);
  }




  editRatingAirline(airline: Airline)
  {
    this.airlinesList.forEach(r => {
      if(r.id == airline.id)
      {
        r.allRatings = airline.allRatings;
        r.updateRating();
        return;
      }
      
    });
  }

  editRatingFlight(flight: Flight)
  {
    this.airlinesList.forEach(a => {
      if(flight.nameOfAirline == a.nameOfAirline)
      {
        a.listOfFlights.forEach(f => {
          if(f.id == flight.id)
          {
            f.allRatings = flight.allRatings;
            f.updateRating();
            return;
          }
        });
        return;
      }
    })
  }

  findAirlineByName(name: string) : Airline
  {
    var IdModel = {
      Name: name
    };
    var airline;
    this.http.post(this.BaseURI + "/Airline/FindAirlineByName", IdModel).subscribe(
      (res: any) => {
        console.log(res)
        airline = res;
      }
    );

    return airline;
  }


  findNextIdDG(serviceId: number)
  {
    var counter = 0;
    var contains = false;
    var numberFound;

    this.airlinesList.forEach(r => {
      if(r.id == serviceId)
      {
        while(true)
        {
          r.discountGroups.forEach(d => {
            if(d.id == counter)
            {
              contains = true;
              return;
            }
          });

          if(contains)
          {
            ++counter;
            contains = false;
          }
          else
          {
            numberFound = counter;
            break;
          }
        }
      }
    });

    return numberFound;
  }

  // getDiscountGroups(id: number)
  // {
  //   return this.findAirline(id).discountGroups;
  // }

  // removeDiscountGroup(id: number, group: DiscountGroup)
  // {
  //   var airline = this.findAirline(id);
  //   var index;
  //   airline.discountGroups.forEach((d, i) => {
  //     if(d.groupName == group.groupName)
  //     {
  //       index = i;
  //       return;
  //     }
  //   });

  //   airline.discountGroups.splice(index, 1);

  //   this.updateDiscountGroups(airline);
  // }

  

  // listOfAllAirlines(): Array<Airline> {
  //   return this.airlinesList;

  // }

  // countTickets(): number {
  //   this.ticketsCounter = 0;
  //   this.airlinesList.forEach(airline => {
  //     airline.listOfFlights.forEach(flight => {
  //       flight.listOfTickets.forEach(ticket => {
  //         this.ticketsCounter++;
  //       });
  //     });
  //   });

  //   return this.ticketsCounter;
  // }

  // findFlight(id: number)
  // {
  //   var flightFound;

  //   this.airlinesList.forEach(airline => {
  //     airline.listOfFlights.forEach(flight => {
  //       if(flight.id == id) {
  //         flightFound = flight;
  //       }
  //     });
  //   });
  //   return flightFound;
  // }

  // findTicket(id: number)
  // {
  //   var ticketFound;

  //   this.airlinesList.forEach(airline => {
  //     airline.listOfFlights.forEach(flight => {
  //       flight.listOfTickets.forEach(ticket => {
  //         if(ticket.id == id) {
  //           ticketFound = ticket;
  //         }
  //       });
  //     });
  //   });
  //   return ticketFound;
  // }

  addNewService(airline: Airline)
  {
    return this.http.post(this.BaseURI + "/SystemAdmin/NewAirline", airline);
    //this.airlinesList.push(airline);
  }

  editInfo(airline: Airline)
  {
    var formData = {
      Id: airline.id,
      NameOfService: airline.nameOfAirline,
      Description: airline.descriptionOfAirline,
      CityName: airline.location.nameOfCity,
      StreetName: airline.location.nameOfStreet,
      Number: airline.location.numberInStreet,
      Image: airline.image
    }

    this.http.post(this.BaseURI + "/Airline/ModifyAirlineInfo", formData).subscribe(
      (res: any) =>
      {
      },
      err => {
        alert(err.message);
      }
    )
  }
}
