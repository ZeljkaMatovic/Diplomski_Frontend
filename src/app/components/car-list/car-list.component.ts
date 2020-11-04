import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from 'src/app/entities/users/users';
import { CarReservation } from 'src/app/entities/car-reservation/car-reservation';
import { RegistrateService } from 'src/app/services/registrate/registrate.service';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  user: RegisteredUser;
  carToRate: CarReservation;
  constructor(private rentSer: RentacarService) { 
    this.user = JSON.parse(localStorage.getItem("user")) as RegisteredUser;
    this.user.reservedCars = new Array<CarReservation>();
  }

  ngOnInit(): void {
    this.rentSer.getReservedCars().subscribe(
      (res) => {
        console.log(res);
        this.user.reservedCars = res as Array<CarReservation>;
      },
      err => 
      {
        alert(err.error);
      }
    )
  }

  cantBeSeen(car: CarReservation) : boolean
  {
    var start = new Date(car.startDate);
    var date = new Date();
    var toCompare = new Date(start.setDate(start.getDate() + 2));
    if(toCompare <= date)
    {
      return true;
    }

    return false;
  }

  rateCar(e: CarReservation)
  {
    this.carToRate = e;
  }

  canRate(car: CarReservation)
  {
    var end = new Date(car.endDate);
    var date = new Date();

    if(end < date)
    {
      return true;
    }

    return false;
  }

  cancel(car: CarReservation)
  {
    this.rentSer.cancelCarReservation(car.id).subscribe(
      (res) => {
        this.user.reservedCars = res as Array<CarReservation>;
        alert("Success");
      },
      err => {
        alert(err.error);
      }
    );
  }

  admitRating(arr: Array<number>)
  {
    this.rentSer.rateRentAndVehicle(arr, this.carToRate.id).subscribe(
      (res) => {
        this.user.reservedCars = res as Array<CarReservation>;
        alert("Success!");
      }
    );
    
  }

}
