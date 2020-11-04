import { Component, OnInit } from '@angular/core';
import { RCSAdmin } from 'src/app/entities/users/users';
import { Rentacar } from 'src/app/entities/rentacar/rentacar';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { Location } from 'src/app/entities/location/location';

@Component({
  selector: 'app-rentacar-ratings',
  templateUrl: './rentacar-ratings.component.html',
  styleUrls: ['./rentacar-ratings.component.css']
})
export class RentacarRatingsComponent implements OnInit {

  admin: RCSAdmin;
  rentacar: Rentacar;
  averageRate: number = 0;
  rateSum: number = 0;
  rateSumFlight: number = 0;

  constructor(public rentServ: RentacarService) {
    this.rentacar = new Rentacar(-1, "", new Location("", "", "", 0, 0));
    this.admin = JSON.parse(localStorage.getItem("user"));
    
  }

  ngOnInit(): void {
    this.rentServ.findRentacarInBase(this.admin.serviceId).subscribe( 
      (res) => {
        this.rentacar = res as Rentacar;
        this.rentacar.listOfVehicles.forEach(r => {
          r.averageRatingOfVehicle = Math.floor(r.averageRatingOfVehicle);
        });
        this.rentacar.averageRatingOfService = Math.floor(this.rentacar.averageRatingOfService);
        }
      );
    }
}


