import { Component, OnInit } from '@angular/core';
import { Airline, Flight, Destination, ReservationModel } from 'src/app/entities/airline/airline';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import * as $ from 'jquery';
import { Ticket } from 'src/app/entities/ticket/ticket';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  loggedIn: boolean;
  allAirlines: Array<Airline>;
  destinationsFound: Array<Destination>;
  resModel: ReservationModel;
  destFrom: string;
  destFrom2: string;
  destTo: string;
  destTo2: string;
  departure: string;
  departure2: string;
  return: string;
  flight: Flight;
  flightType: string;
  ticketsList: Array<Flight>;

  constructor(private route: ActivatedRoute, public service: AirlineService) {
    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    this.destinationsFound = new Array<Destination>();
  }

  checkInput(): void {

    if((<HTMLInputElement>document.getElementById("flight-type")).value == "one-way") {
      document.getElementById("return").hidden = true;
      document.getElementById("mcRow").hidden = true;
    }
    else if((<HTMLInputElement>document.getElementById("flight-type")).value == "roundtrip") {
      document.getElementById("return").hidden = false;
      document.getElementById("mcRow").hidden = true;
    }
    else if((<HTMLInputElement>document.getElementById("flight-type")).value == "multiCity") {
      document.getElementById("mcRow").hidden = false;
      document.getElementById("return").hidden = false;
    }
  }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("isloggedin"));
    this.ticketsList = new Array<Flight>();
    this.resModel = new ReservationModel();

    document.getElementById("mcRow").hidden = true;

    this.service.getAllDestinations().subscribe(
      (res: any) => {
        var destinations = res as Array<Destination>;
        destinations.forEach(d => {
          this.destinationsFound.push(d);
        });
      }
    );
  }

  findFlights() {
    console.log((<HTMLInputElement>document.getElementById("flight-type")).value)
    this.resModel.FlightType = (<HTMLInputElement>document.getElementById("flight-type")).value;
    this.resModel.DestinationFrom = (<HTMLInputElement>document.getElementById("destFromTxt")).value;
    this.resModel.DestinationTo = (<HTMLInputElement>document.getElementById("destToTxt")).value;
    this.resModel.DepartureDate = (<HTMLInputElement>document.getElementById("departureTxt")).value;

    if (this.resModel.FlightType == "one-way") {
      
    }
    else if(this.resModel.FlightType == "roundtrip") {
      this.resModel.ReturnDate = (<HTMLInputElement>document.getElementById("returnTxt")).value;

    }
    else if(this.resModel.FlightType == "multiCity") {
      this.resModel.ReturnDate = (<HTMLInputElement>document.getElementById("returnTxt")).value;
      this.resModel.MultiDestinationFrom = (<HTMLInputElement>document.getElementById("destFromTxt2")).value;
      this.resModel.MultiDestinationTo = (<HTMLInputElement>document.getElementById("destToTxt2")).value;

    }
    this.resModel.FlightClass = (<HTMLInputElement>document.getElementById("flight-class")).value;
    console.log(this.resModel)

    localStorage.setItem("resModel", JSON.stringify(this.resModel));
    
  }

}
