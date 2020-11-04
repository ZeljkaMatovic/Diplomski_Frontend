import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Airline } from 'src/app/entities/airline/airline';
import * as $ from 'jquery';

@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css']
})
export class AirlineProfileComponent implements OnInit {

  id: number;
  allAirlines: Array<Airline>;
  airlineFound: Airline;
  pathString: string;
  averageRate: number = 0;
  rateSum: number = 0;
  userType: string;

  constructor(private route: ActivatedRoute, service: AirlineService) {
    route.params.subscribe(params => {this.id = params['id']; });
    route.params.subscribe(params => {this.pathString = params['put']; });
    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    this.userType = JSON.parse(localStorage.getItem("userType"));

    this.allAirlines.forEach(airline => {
      if(airline.id == this.id)
      {
        this.airlineFound = airline;
      }
    });
    console.log(localStorage.getItem("airlines"))
    console.log(this.airlineFound)
   }

  ngOnInit(): void {
    if (this.airlineFound.allRatings.length != 0) {
      this.airlineFound.allRatings.forEach(rate => {
        this.rateSum += rate;
      });

      this.averageRate = Math.round(this.rateSum / this.airlineFound.allRatings.length);
    }
  }

}
