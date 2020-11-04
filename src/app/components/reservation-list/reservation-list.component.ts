import { Component, OnInit } from '@angular/core';
import { User, RegisteredUser } from 'src/app/entities/users/users';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Flight, Airline } from 'src/app/entities/airline/airline';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  user: RegisteredUser;
  rate1: number;
  rate2: number;
  ticket: Ticket;
  flight: Flight;
  airline: Airline;
  allTickets: Array<Ticket> = new Array<Ticket>();

  constructor(public service: AirlineService) { 
    this.user = JSON.parse(localStorage.getItem("user"));

  }

  ngOnInit(): void {
    this.service.getReservedTickets(this.user.email).subscribe(
      (res: any) => {
        this.allTickets = res as Array<Ticket>;

        this.allTickets.forEach(ticket => {
          if(ticket.dateAndTime > ticket.dateOfReservation) {
            ticket.disabled = false;
          }
          else {
            ticket.disabled = true;
          }
        });
      }
    );
  }

  getTicketId(event, id) {
    this.service.findTicket(Number(id)).subscribe(
      (res: any) => {
        this.ticket = res as Ticket;
      }
    );
    this.service.findFlight(this.ticket.flightID).subscribe(
      (res: any) => {
        this.flight = res as Flight;
      }
    );
    console.log(this.ticket);
    console.log(this.flight);
  }

  cancelTicketID(event, id) {
    this.service.cancelTicket(Number(id)).subscribe(
      (res: any) => {
        window.location.reload();
      }
    );
  }


  radioHandler(event: any) {
    this.rate1 = Number(event.target.value);
    console.log(this.rate1)
  }

  radioHandler2(event: any) {
    this.rate2 = Number(event.target.value);
    console.log(this.rate2)
  }

  rateAll() {
    this.service.rateAll(Number(this.ticket.id), Number(this.rate1), Number(this.rate2)).subscribe(
      (res: any) => {

      }
    );
  }

}
