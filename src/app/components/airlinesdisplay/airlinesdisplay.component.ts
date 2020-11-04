import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/entities/airline/airline';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-airlinesdisplay',
  templateUrl: './airlinesdisplay.component.html',
  styleUrls: ['./airlinesdisplay.component.css']
})
export class AirlinesdisplayComponent implements OnInit {

  loggedIn: boolean;
  allAirlines: Array<Airline>;

  constructor(private airlineService: AirlineService) {
    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    console.log(this.allAirlines)
   }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem("isloggedin"));
  }

}
