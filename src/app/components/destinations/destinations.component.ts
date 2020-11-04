import { Component, OnInit } from '@angular/core';
import { Airline, Destination } from 'src/app/entities/airline/airline';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { User } from 'src/app/entities/users/users';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  id: number;
  allAirlines: Array<Airline>;
  destinationsFound: Array<Destination>;
  user: User;
  newDestination: Destination;
  removeDestination: Destination;
  found: boolean = false;
  airline: Airline;

  constructor(private route: ActivatedRoute, service: AirlineService) { 
    route.params.subscribe(params => {this.id = params['id']; });
    this.allAirlines = JSON.parse(localStorage.getItem("airlines"));
    this.user = JSON.parse(localStorage.getItem("user"));

    this.allAirlines.forEach(airline => {
      if(airline.id == this.id)
      {
        this.destinationsFound = airline.destinations;
        this.airline = airline;
      }
    });

    // this.airline = service.findAirline(this.id);
    console.log(this.airline)

  }

  ngOnInit(): void {
  }

  checkDestinations() {
    this.newDestination.destinationName = (<HTMLInputElement> document.getElementById("newDestination")).value;
    this.removeDestination.destinationName = (<HTMLInputElement> document.getElementById("selectDest")).value;

    console.log(this.newDestination);
    console.log(this.removeDestination);

    if(this.newDestination.destinationName.length != 0) {
      this.destinationsFound.forEach(destination => {
        if(destination == this.newDestination) {
          this.found = true;
        }
      });
      if(!this.found) {
        this.airline.destinations.push(this.newDestination);
      }
    }

    if(this.removeDestination.destinationName != "None") {
      this.airline.destinations = this.airline.destinations.filter(item => item != this.removeDestination);
      //this.destinationsFound = this.destinationsFound.filter(item => item != this.removeDestination);
    }

    this.found = false;
  }

}
