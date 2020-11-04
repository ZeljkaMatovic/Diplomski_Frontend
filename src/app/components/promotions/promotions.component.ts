import { Component, OnInit } from '@angular/core';
import { Airline, Flight } from 'src/app/entities/airline/airline';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  loggedIn: boolean;
  allAirlines: Array<Airline>;
  ticketsList: Array<Ticket>;
  
  constructor(public service: AirlineService) { 
    this.ticketsList = new Array<Ticket>();
    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    console.log(this.allAirlines)

  }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("isloggedin"));

    this.allAirlines.forEach(airline => {
      this.service.findAirlineFlights(airline.nameOfAirline).subscribe(
        (res: any) => {
          airline.listOfFlights = res as Array<Flight>;
          airline.listOfFlights.forEach(flight => {
            this.service.findFlightTickets(flight.id).subscribe(
              (res: any) => {
                console.log(res)
                flight.listOfTickets = res as Array<Ticket>;
                flight.listOfTickets.forEach(ticket => {
                  if (ticket.type == "Super") {
                    this.ticketsList.push(ticket);
                  }
                });
                console.log(flight.listOfTickets)
              }
            )
          });
        }
      );

    });
  }

}
