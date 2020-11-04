import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/entities/airline/airline';
import { Location } from 'src/app/entities/location/location';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { User } from 'src/app/entities/users/users';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  id: number;
  allAirlines: Array<Airline>;
  locationFound: Location;
  user: User;
  airlineFound: Airline;
  city: string;
  street: string;
  number: string;

  constructor(private route: ActivatedRoute, service: AirlineService) { 
    route.params.subscribe(params => {this.id = params['id']; });
    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    this.user = JSON.parse(localStorage.getItem("user"));

    this.allAirlines.forEach(airline => {
      if(airline.id == this.id)
      {
        this.locationFound = airline.location;
        this.airlineFound = airline;
      }
    });

  }

  ngOnInit(): void {
  }

  confirmAddress() {
    this.city = (<HTMLInputElement> document.getElementById("modifyCity")).value;
    this.street = (<HTMLInputElement> document.getElementById("modifyStreet")).value;
    this.number = (<HTMLInputElement> document.getElementById("modifyStreetNum")).value;

    console.log(this.city.length);
    console.log(this.city);

    if(this.city.length != 0 && this.city != this.airlineFound.location.nameOfCity) {
      this.airlineFound.location.nameOfCity = this.city;
    }
    if(this.street.length != 0 && this.street != this.airlineFound.location.nameOfStreet) {
      this.airlineFound.location.nameOfStreet = this.street;
    }
    if(this.number.length != 0 && this.number != this.airlineFound.location.numberInStreet) {
      this.airlineFound.location.numberInStreet = this.number;
    }


  }

}
