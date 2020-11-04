import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisteredUser } from 'src/app/entities/users/users';
import { Airline, Flight, ReserveFlightModel, ReservationModel, Passengers } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserve-flight',
  templateUrl: './reserve-flight.component.html',
  styleUrls: ['./reserve-flight.component.css'],
  host: {
    '(window:storage)': 'onStorageChange($event)'
  }
})
export class ReserveFlightComponent implements OnInit {

  anotherPassenger: boolean;
  user: RegisteredUser;
  allAirlines: Array<Airline>;
  flight: Flight;
  flight2: Flight;
  multiflight: boolean;
  multibool: Array<boolean>;
  pass: number;
  tickets: Array<Ticket>;
  ticket1: Ticket;
  ticket2: Ticket;
  ticketsCounter: number;
  passportForm: FormGroup;
  passengerForm: FormGroup;
  resFlightModel: ReserveFlightModel;
  resModel: ReservationModel;
  passenger: Passengers;
  seats: Array<string> = new Array<string>();


  constructor(private route: ActivatedRoute, public service: AirlineService) {
    this.resFlightModel = new ReserveFlightModel();
    this.resFlightModel.listOfPassengers = new Array<Passengers>();
    route.params.subscribe(params => { this.resFlightModel.idFlight1 = Number(params['id']); });
    route.params.subscribe(params => { this.resFlightModel.idFlight2 = Number(params['id2']); });
    if (Number.isNaN(this.resFlightModel.idFlight2)) {
      this.resFlightModel.idFlight2 = 0;
    }

    console.log(this.resFlightModel.idFlight2)
    this.resFlightModel.seat1 = JSON.parse(localStorage.getItem("seatId-1"));
    this.resFlightModel.seat2 = JSON.parse(localStorage.getItem("seatId-2"));
    this.resFlightModel.seatPass = JSON.parse(localStorage.getItem("seatId1"));
    console.log(this.resFlightModel.seatPass)

    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    this.resModel = JSON.parse(localStorage.getItem("resModel"));
    this.resFlightModel.flightClass = this.resModel.FlightClass;
  }

  onStorageChange(ev: StorageEvent) {
    this.resFlightModel.seatPass = localStorage.getItem("seatId1").substring(1, localStorage.getItem("seatId1").length - 1);
  }

  ngOnInit(): void {

    this.service.findFlight(Number(this.resFlightModel.idFlight1)).subscribe(
      (res: any) => {
        this.flight = res as Flight;

        if (this.resFlightModel.idFlight2 > 0) {
          this.service.findFlight(Number(this.resFlightModel.idFlight2)).subscribe(
            (res: any) => {
              this.flight2 = res as Flight;
            }
          );
        }
        this.service.countTickets().subscribe(
          (res: any) => {
            this.ticketsCounter = res;
            console.log(this.ticketsCounter)
          }
        );
      }
    );

    this.initForm();
    this.anotherPassenger = false;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.resFlightModel.firstName = this.user.name;
    this.resFlightModel.lastName = this.user.lastname;
    this.resFlightModel.userEmail = this.user.email;

    this.multiflight = false;
    this.multibool = new Array<boolean>();
    this.tickets = new Array<Ticket>();

    if (this.resFlightModel.idFlight2 > 0) {
      this.multiflight = true;
    }
    else {
      this.flight2 = new Flight(0, null, null, null, null, null, null, null, null, null, null);
    }

    console.log(this.multiflight);
  }

  private initForm() {
    this.passportForm = new FormGroup({
      'passport': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    });

    this.passengerForm = new FormGroup({
      'passportPass': new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'namePass': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(20)]),
      'lastnamePass': new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z][a-z A-Z]*'), Validators.maxLength(20)]),
      'emailPass': new FormControl("", [Validators.required, Validators.email]),
    });

    console.log(this.passportForm.valid)
  }

  anotherPass() {


    this.pass = Number.parseInt((<HTMLInputElement>document.getElementById("passTxt")).value);

    if (this.pass > 0) {
      for (let i = 1; i <= this.pass; i++) {
        this.multibool.push(true);
        this.anotherPassenger = true;
      }

      for (let i = 0; i < this.pass; i++) {
        this.seats.push(JSON.parse(localStorage.getItem("seatId" + i)));
        console.log(this.seats)
      }
    }
  }

  hidePass() {
    for (let i = 0; i < this.pass; i++) {
      (<HTMLInputElement>document.getElementById("namePass" + i)).value = "";
      (<HTMLInputElement>document.getElementById("lastnamePass" + i)).value = "";
      (<HTMLInputElement>document.getElementById("emailPass" + i)).value = "";
      (<HTMLInputElement>document.getElementById("passportPass" + i)).value = "";
    }
    this.passportForm.reset()
    this.anotherPassenger = false;
    this.multibool = this.multibool.filter(item => item == false);
  }

  reserveTicket() {
    this.resFlightModel.passport = (<HTMLInputElement>document.getElementById("passport")).value;
    this.resFlightModel.seat1 = (<HTMLInputElement>document.getElementById("seat1")).value;
    console.log(this.resFlightModel.listOfPassengers);

    console.log(this.resFlightModel)

    this.service.reserveTicket(this.resFlightModel).subscribe(
      (res: any) => {
        alert("Reservation is successfull!")
        window.location.reload()
      },
      (err: any) => {
        alert(err.message)
      }
    );

    localStorage.setItem("user", JSON.stringify(this.user));
    //window.location.reload();

  }

  addPassenger() {
    console.log(this.passportForm.valid)
    this.passenger = new Passengers();
    this.passenger.firstName = (<HTMLInputElement>document.getElementById("namePass")).value;
    this.passenger.lastName = (<HTMLInputElement>document.getElementById("lastnamePass")).value;
    this.passenger.email = (<HTMLInputElement>document.getElementById("emailPass")).value;
    this.passenger.passport = (<HTMLInputElement>document.getElementById("passportPass")).value;
    this.passenger.seat = (<HTMLInputElement>document.getElementById("seatPass")).value;

    this.resFlightModel.listOfPassengers.push(this.passenger)

    this.passengerForm.reset();
    console.log(this.resFlightModel.listOfPassengers)
  }

  openSeats() {
    window.open("http://localhost:4200/6/chooseseat/1", "_blank");
  }

  deletePassenger(event, passenger) {
    this.resFlightModel.listOfPassengers = this.resFlightModel.listOfPassengers.filter(pass => pass != passenger);

    console.log(this.resFlightModel.listOfPassengers);
  }

}
