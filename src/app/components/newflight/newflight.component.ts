import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Airline, Destination } from 'src/app/entities/airline/airline';
import { ARSAdmin } from 'src/app/entities/users/users';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Flight } from 'src/app/entities/airline/airline';

@Component({
  selector: 'app-newflight',
  templateUrl: './newflight.component.html',
  styleUrls: ['./newflight.component.css']
})
export class NewflightComponent implements OnInit {
  flightForm: FormGroup;
  airlines: Array<Airline>;
  admin: ARSAdmin;
  airlineFound: Airline;
  flight: Flight;

  constructor(public service: AirlineService ) {
    this.airlines = JSON.parse(localStorage.getItem("airlines"));
    this.admin = JSON.parse(localStorage.getItem('user'));
    console.log(this.admin.serviceId)

    this.airlines.forEach(airline => {
      if(airline.id == this.admin.serviceId) {
        this.airlineFound = airline;
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.service.getAirlineDestinations(this.admin.serviceId).subscribe(
      (res: any) => {
        this.airlineFound.destinations = res as Array<Destination>;
        console.log(this.airlineFound.destinations)
      }
    );

  }

  private initForm() {
    this.flightForm = new FormGroup({
      'departure': new FormControl("", [Validators.required]),
      'landing': new FormControl("", [Validators.required]),
      'duration': new FormControl("", [Validators.required]),
      'length': new FormControl("", [Validators.required]),
      'numberC': new FormControl("", [Validators.required, Validators.pattern('[0-9]*')]),
      'price': new FormControl("", [Validators.required, Validators.pattern('[0-9]*')])
    });

    this.flightForm.addControl('changeoverSelect', new FormControl(null));
    this.flightForm.addControl('destFromSelect', new FormControl(null));
    this.flightForm.addControl('destToSelect', new FormControl(null));
    //this.flightForm.controls["changeoverSelect"].setValue(this.airlineFound.des)
  }

  createNewFlight() {
    this.flight = new Flight(null, this.flightForm.controls['destFromSelect'].value, this.flightForm.controls['destToSelect'].value, this.flightForm.controls['departure'].value, this.flightForm.controls['landing'].value,
    this.flightForm.controls['duration'].value, this.flightForm.controls['length'].value, this.flightForm.controls['numberC'].value,
    this.flightForm.controls['changeoverSelect'].value, this.flightForm.controls['price'].value, null);

    this.flight.nameOfAirline = this.airlineFound.nameOfAirline;
    console.log(this.flight);

    this.service.addNewFlight(this.flight).subscribe(

    )

    this.flightForm.reset();
  }

}
