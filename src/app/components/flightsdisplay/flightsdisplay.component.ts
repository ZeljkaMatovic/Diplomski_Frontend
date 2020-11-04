import { Component, OnInit } from '@angular/core';
import { Flight, Airline, ReservationModel, FilterModel } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flightsdisplay',
  templateUrl: './flightsdisplay.component.html',
  styleUrls: ['./flightsdisplay.component.css']
})
export class FlightsdisplayComponent implements OnInit {

  flightSearch: Flight;
  allAirlines: Array<Airline>;
  flights: Array<Flight> = new Array<Flight>();
  filterFlights: Array<Flight>;
  departureDate: Date;
  returnDate: Date;
  flightType: string;
  ticketsSearch: Array<Flight>;
  totalPrice: number;
  totalPricePass: number;
  passengers: number;
  economyClass: boolean;
  multiselect: boolean;
  invalidSelect: boolean;
  listIds: Array<number>;
  destFrom: string;
  id1: number;
  id2: number;
  filterBool: boolean = false;
  resModel: ReservationModel;
  filterModel: FilterModel;
  bookIds: Array<boolean>;

  constructor(public service: AirlineService, private route: ActivatedRoute) {
    this.flightType = JSON.parse(localStorage.getItem("flightType"));
    this.ticketsSearch = JSON.parse(localStorage.getItem("ticketsSearch"));
    this.passengers = JSON.parse(localStorage.getItem("passengers"));

    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));

    this.resModel = JSON.parse(localStorage.getItem("resModel"));
    this.filterModel = new FilterModel();
    this.filterFlights = new Array<Flight>();
  }

  ngOnInit(): void {
    this.service.searchFlights(this.resModel).subscribe(
      (res: any) => {
        res.forEach(f => {
          this.flights.push(f);
          this.filterFlights.push(f);
        });

        this.bookIds = new Array<boolean>(this.flights.length);

        this.flights.forEach(flight => {
          let newDate = JSON.stringify(flight.departingDateTime);
          newDate = newDate.slice(1, 11);
          console.log(newDate)
          let nowDateFull = new Date(Date.now());
          let nowDate = JSON.stringify(nowDateFull);
          nowDate = nowDate.slice(1, 11);
          console.log(nowDate)
          if(newDate < nowDate) {
            this.bookIds[flight.id] = true;
            console.log(this.bookIds[1])
          }
        });
      }
    );

    this.listIds = new Array<number>();
    this.invalidSelect = true;

    if (this.resModel.FlightClass == "Economy") {
      this.economyClass = true;
    }
    else {
      this.economyClass = false;
    }

    if (this.resModel.FlightType == "one-way") {
      this.multiselect = false;
    }
    else if (this.resModel.FlightType == "roundtrip") {
      this.multiselect = true;

    }
    else if (this.resModel.FlightType == "multiCity") {
      this.multiselect = true;
    }
  }

  selectedFlight(event, flight) {
    (<HTMLInputElement>document.getElementById(flight.id)).disabled = true;
    
    if(this.id1 > 0) {
      this.id2 = flight.id;
    }
    else {
      this.id1 = flight.id;
    }

    this.listIds.push(flight.id);
    if(this.listIds.length == 2 && flight.destinationFrom != this.destFrom) {
      this.invalidSelect = false;
    }
    else {
      this.invalidSelect = true;
    }
    this.destFrom = flight.destinationFrom;
  }

  filter() {
    this.filterModel.nameOfCompany = (<HTMLInputElement>document.getElementById("searchCompany")).value;
    this.filterModel.priceFrom = (Number)((<HTMLInputElement>document.getElementById("priceFrom")).value);
    this.filterModel.priceTo = (Number)((<HTMLInputElement>document.getElementById("priceTo")).value);
    this.filterModel.hours = (Number)((<HTMLInputElement>document.getElementById("durationH")).value);
    this.filterModel.minutes = (Number)((<HTMLInputElement>document.getElementById("durationM")).value);
    this.filterModel.flights = this.filterFlights;
    this.filterModel.economyClass = this.economyClass;

    this.service.filterAirlines(this.filterModel).subscribe(
      (res: any) => {
        this.flights = res as Array<Flight>;
      });
  }

}
