import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { Airline, ReserveFlightModel } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { RegisteredUser } from 'src/app/entities/users/users';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserve-ticket',
  templateUrl: './reserve-ticket.component.html',
  styleUrls: ['./reserve-ticket.component.css']
})
export class ReserveTicketComponent implements OnInit {

  id: number;
  ticket: Ticket;
  user: RegisteredUser;
  passportForm: FormGroup;
  resFlightModel: ReserveFlightModel;

  constructor(private route: ActivatedRoute, public service: AirlineService) {
    route.params.subscribe(params => { this.id = params['id']; });
    this.resFlightModel = new ReserveFlightModel();
    this.resFlightModel.idTicket = Number(this.id);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.resFlightModel.userEmail = this.user.email;

    service.findTicket(Number(this.id)).subscribe(
      (res: any) => {
        this.ticket = res as Ticket;
      }
    );
  }


  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.passportForm = new FormGroup({
      'passport': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    });
  }

  reserveTicket() {
    //ticket1.passengers = ????
    //this.ticket.dateOfReservation = new Date(Date.now());
    //this.ticket.user = this.user.username;
    //this.user.passportNumber = (<HTMLInputElement>document.getElementById("passport")).value;

    //this.user.reservedTickets.push(this.ticket);

    this.resFlightModel.passport = (<HTMLInputElement>document.getElementById("passport")).value;

    this.service.reserveSuperTicket(this.resFlightModel).subscribe(
      (res: any) => {

      }
    );

    localStorage.setItem("user", JSON.stringify(this.user));
    console.log(this.user.reservedTickets);
    window.location.reload();
  }

}
