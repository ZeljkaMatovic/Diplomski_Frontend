import { Component, OnInit } from '@angular/core';
import { Airline, Flight, ReserveFlightModel } from 'src/app/entities/airline/airline';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { User } from 'src/app/entities/users/users';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  host: {
    '(window:storage)': 'onStorageChange($event)'
  }
})
export class TicketsComponent implements OnInit {

  loggedIn: boolean;
  id: number;
  airline: Airline;
  ticketsList: Array<Ticket>;
  user: User;
  superTicketForm: FormGroup;
  seat: string;
  resModel: ReserveFlightModel;

  public selectedFlight;

  constructor(private route: ActivatedRoute, public service: AirlineService) { 
    route.params.subscribe(params => {this.id = params['id']; });
    this.user = JSON.parse(localStorage.getItem("user"));
    this.ticketsList = new Array<Ticket>();
  }

  onStorageChange(ev: StorageEvent) {
    this.seat= localStorage.getItem("seatId1").substring(1, localStorage.getItem("seatId1").length - 1);
  }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("isloggedin"));
    console.log(this.loggedIn);
    this.initForm();
    this.resModel = new ReserveFlightModel();

    this.service.findAirline(Number(this.id)).subscribe(
      (res: any) => {
        console.log(res)
        this.airline = res as Airline;

        this.service.findAirlineFlights(this.airline.nameOfAirline).subscribe(
          (res: any) => {
            console.log(res)
            this.airline.listOfFlights = res as Array<Flight>;
            this.airline.listOfFlights.forEach(flight => {
              this.service.findFlightTickets(flight.id).subscribe(
                (res: any) => {
                  console.log(res)
                  flight.listOfTickets = res as Array<Ticket>;
                  flight.listOfTickets.forEach(ticket => {
                    if(ticket.type == "Super") {
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

  initForm() {
    this.superTicketForm = new FormGroup({
      'flights': new FormControl("", [Validators.required]),
      'sale': new FormControl("", [Validators.required]),
    });
  }

  addNewSuperTicket() {
    this.resModel.seat1 = (<HTMLInputElement>document.getElementById("seat")).value;
    this.resModel.sale = Number((<HTMLInputElement>document.getElementById("sale")).value);

    console.log(this.resModel);

    this.service.addNewSuperTicket(this.resModel).subscribe(
      (res: any) => {
        alert("New super ticket is created");
        window.location.reload();
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  openSeats() {
    window.open("http://localhost:4200/6/chooseseat/1", "_blank");
  }

  getFlightId(event) {
    this.resModel.idFlight1 = Number(event.target.value);
  }

}
