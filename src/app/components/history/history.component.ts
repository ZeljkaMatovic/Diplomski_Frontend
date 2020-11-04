import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/entities/users/users';
import { Vehicle } from 'src/app/entities/rentacar/rentacar';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';
import { Flight } from 'src/app/entities/airline/airline';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { Ticket } from 'src/app/entities/ticket/ticket';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user: RegisteredUser;
  carToRate: CarReservation;
  flightToRate: Flight;
  constructor(private rentSer: RentacarService, private regSer: RegistrateService,
    private airSer: AirlineService) { 
    this.user = JSON.parse(localStorage.getItem("user")) as RegisteredUser;
    this.user.reservedCarHistory = new Array<CarReservation>();
  }

  ngOnInit(): void {
    this.rentSer.getMyCarReservationsHistory().subscribe(
      (res) => {
        this.user.reservedCarHistory = res as Array<CarReservation>;
      },
      err => {
        alert(err.error);
      }
    )

    this.airSer.getMyTicketHistory().subscribe(
      (res) => {
        this.user.ticketHistory = res as Array<Ticket>;
      },
      err => {
        alert(err.error)
      }
    )
  }

  rateCar(e: CarReservation)
  {
    this.carToRate = e;
  }

  admitRating(arr: Array<number>)
  {
    this.rentSer.rateRentAndVehicle(arr, this.carToRate.id).subscribe(
      (res) => {
        this.user.reservedCarHistory = res as Array<CarReservation>;
        alert("Success!");
      }
    );
    
  }

  rateFlight(ticket: Ticket)
  {
    this.airSer.findFlight(ticket.flightID).subscribe(
      (res: any) => {
        this.flightToRate = res as Flight;
      }
    );
  }

  admitRating2(arr: Array<number>)
  {
    this.flightToRate.allRatings.push(arr[0]);
    this.flightToRate.updateRating();
    this.airSer.editRatingFlight(this.flightToRate);
    var airline = this.airSer.findAirlineByName(this.flightToRate.nameOfAirline);
    airline.allRatings.push(arr[1]);
    this.airSer.editRatingAirline(airline);
  }

}
